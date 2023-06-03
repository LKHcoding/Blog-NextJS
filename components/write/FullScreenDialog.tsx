import React, {
  forwardRef,
  ReactElement,
  Ref,
  useCallback,
  useEffect,
  useState,
} from 'react';
import dynamic from 'next/dynamic';

import AppBar from '@material-ui/core/AppBar';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { TransitionProps } from '@material-ui/core/transitions';

import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import html from 'react-syntax-highlighter/dist/cjs/languages/prism/markup';
import java from 'react-syntax-highlighter/dist/cjs/languages/prism/java';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/cjs/styles/prism/prism';
import ts from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';

import {
  NormalComponents,
  SpecialComponents,
} from 'react-markdown/src/ast-to-react';

import { UploadDialog } from './UploadDialog';
import { getAllTagInfoApi } from 'utils/queryAPI';
import 'react-markdown-editor-lite/lib/index.css';
import { useStyles } from './FullScreenDialog.style';
import { useImmerRef } from 'use-immer-ref';

SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', ts);

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialEditorInput = `
# Hi, Develogger!

여러가지 예제를 참고하여 작성해보세요
***

> 👉 우측은 HTML형태의 프리뷰 영역입니다.

> 👈 좌측은 MarkDown을 작성하는 영역입니다.


## Overview

* 링크 [클릭시인덱스로이동](/)
* \`CodeBlock 예제\`


## Table of contents

| 1번 | 2번 | 3번 |
| --- | --- | --- |
| Data1 | Data2 | Data3 |
| Data4 | Data5 | Data6 |


## Syntax highlighting

\`\`\`ts
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { CircularProgress } from '@material-ui/core/CircularProgress';

ReactDOM.render(
  <App>{'# Your markdown here'}</App>,
  document.querySelector('#root')
)
\`\`\`

~~strikethrough~~


> * Wrappers
>    1. [x] React
>    2. [x] Vue
>    3. [ ] Svelte


https://example.com

## HTML in markdown

### ⚠️ HTML Tag Example

<blockquote>
  👆 Use the tag like this stuff
</blockquote>




`;

const FullScreenDialog = () => {
  const classes = useStyles();

  const { data, refetch, isFetching } = useQuery(
    [getAllTagInfoApi.key],
    getAllTagInfoApi.apiCall
  );

  const [state, setState, ref] = useImmerRef({
    // 내용
    contentInput: initialEditorInput,
    // 제목
    inputTitle: '',
    // 모든 태그 리스트
    tagValues: [] as string[],
    //선택된 태그 값
    selectedTagList: [] as string[],
    //태그 관련
    tagListOpen: false,
    //선택된 태그가 있는지 없는지 여부
    selectedTagInfo: false,

    open: false,
  });

  const loading = isFetching;

  const handleClickOpen = () => {
    setState((dr) => {
      dr.open = true;
    });
  };

  const handleClose = () => {
    setState((dr) => {
      dr.open = false;
    });
  };

  const handleSave = useCallback(
    async (file: File[]) => {
      const formData = new FormData();
      formData.append('image', file[0]);

      const imagePath = await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/image`, formData, {
          withCredentials: true,
        })
        .then((res) => res.data);

      if (imagePath) {
        const result = await axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/blog`,
            {
              title: state.inputTitle,
              tags: ref.current.selectedTagList,
              content: state.contentInput,
              thumbnail: imagePath,
            },
            { withCredentials: true }
          )
          .then((res) => res)
          .catch((err) => err);

        if (result.status === 201) {
          setState((dr) => {
            dr.inputTitle = '';
            dr.contentInput = initialEditorInput;
          });
          refetch();
          setState((dr) => {
            dr.open = false;
          });
          return 'success';
        }
      }
    },
    [state.inputTitle, ref.current.selectedTagList, state.contentInput]
  );

  useEffect(() => {
    if (data) {
      setState((dr) => {
        dr.tagValues = data.map((item) => item.tagName);
      });
    }
    return () => {
      setState((dr) => {
        dr.tagValues = [];
        dr.selectedTagInfo = false;
      });
    };
  }, [data, open]);

  return (
    <div>
      <Button
        variant="outlined"
        color="default"
        className={classes.button}
        startIcon={<CreateIcon />}
        onClick={handleClickOpen}
      >
        New Log
      </Button>
      <Dialog
        disableEscapeKeyDown
        fullScreen
        open={state.open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar color="primary" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Editor
            </Typography>
            <div className={classes.exceedLength}>
              {state.contentInput.length > 65535
                ? `글자수 초과(현재:${state.contentInput.length}, 최대:65535) `
                : ''}
            </div>
            <UploadDialog
              handleSave={handleSave}
              conditionSave={
                state.contentInput.length > 65535 ||
                state.contentInput.length === 0 ||
                state.inputTitle.length === 0 ||
                !state.selectedTagInfo
              }
            />
          </Toolbar>
        </AppBar>

        {/* 에디터 시작 */}
        <div className={classes.editorContainer}>
          <TextField
            id="standard-basic"
            label="글 제목"
            value={state.inputTitle}
            onChange={(e) => {
              setState((dr) => {
                dr.inputTitle = e.target.value;
              });
            }}
            className={classes.textField}
          />

          <Autocomplete
            className={classes.autoComplete}
            id="size-small-standard-multi"
            open={state.tagListOpen}
            onOpen={() => {
              setState((dr) => {
                dr.tagListOpen = true;
              });
            }}
            onClose={() => {
              setState((dr) => {
                dr.tagListOpen = false;
              });
            }}
            getOptionLabel={(option) => option}
            options={state.tagValues}
            loading={loading}
            multiple
            size="small"
            onChange={(event, value) => {
              setState((dr) => {
                dr.selectedTagList = value;
              });
              if (value.length > 0) {
                setState((dr) => {
                  dr.selectedTagInfo = true;
                });
              } else {
                setState((dr) => {
                  dr.selectedTagInfo = false;
                });
              }
            }}
            autoComplete
            autoHighlight
            freeSolo
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                placeholder="Tag + Enter"
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </div>

        <MdEditor
          /* FIXME: kunhee.lim
           *  MdEditor 컴포넌트가 className 속성을 줄 수 없음
           *  인라인 스타일 말고 다른 방법을 찾아볼 것 */
          style={{ zIndex: 1101, flex: 1, overflow: 'auto' }}
          value={state.contentInput}
          renderHTML={(text) => (
            <ReactMarkdown
              className="markdown-body"
              components={components}
              remarkPlugins={[gfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {text}
            </ReactMarkdown>
          )}
          onChange={({ html, text }) => {
            setState((dr) => {
              dr.contentInput = text;
            });
          }}
        />
      </Dialog>
    </div>
  );
};

export default FullScreenDialog;

const components: Partial<NormalComponents & SpecialComponents> = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter style={prism} language={match[1]} PreTag="div" {...props}>
        {String(children).replace(/\n$/, '')}{' '}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};
