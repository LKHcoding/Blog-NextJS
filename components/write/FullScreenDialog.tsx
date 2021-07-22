import React, {
  forwardRef,
  ReactElement,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useInput from './../../hooks/useInput';

import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { NormalComponents, SpecialComponents } from 'react-markdown/src/ast-to-react';
import rehypeRaw from 'rehype-raw';

import dynamic from 'next/dynamic';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';
import removeMD from 'remove-markdown';
import axios from 'axios';
import { UploadDialog } from './UploadDialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from 'react-query';
import { getAllTagInfoApi } from '../../utils/queryAPI';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    button: {
      margin: theme.spacing(1),
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        margin: theme.spacing(1),
      },
    },
  })
);

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

// 로딩

// function sleep(delay = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }

const FullScreenDialog = () => {
  const { data, refetch, isFetching } = useQuery(getAllTagInfoApi.key, getAllTagInfoApi.apiCall);

  //글 내용
  const [contentInput, setContentInput] = useState<string>(initialEditorInput);

  //글 제목
  const [inputTitle, onChangeInputTitle, setInputTitle] = useInput('');

  //글 태그 전체 리스트
  const [tagValues, setTagValues] = useState<string[]>([]);
  // const [tagValues, setTagValues] = useState([
  //   'Nest.js',
  //   'Next.js',
  //   'react.js',
  //   'mysql',
  //   'react-query',
  //   'ssr',
  // ]);

  //선택된 태그 값
  const selectedTagList = useRef<string[]>();

  //태그 관련
  const [tagListOpen, setTagListOpen] = useState(false);
  // const [options, setOptions] = React.useState([]);
  // const loading = true;
  // const loading = tagListOpen && tagValues.length === 0;
  const loading = isFetching;

  //선택된 태그가 있는지 없는지 여부
  const [selectedTagInfo, setSelectedTagInfo] = useState(false);

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = useCallback(
    async (file: File[]) => {
      //file: file[0],
      const formData = new FormData();
      formData.append('image', file[0]);

      const imagePath = await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/image`, formData, {
          withCredentials: true,
        })
        .then((res) => res.data);

      // console.log(imagePath);
      if (imagePath) {
        const result = await axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/blog`,
            {
              title: inputTitle,
              tags: selectedTagList.current,
              content: contentInput,
              thumbnail: imagePath,
            },
            { withCredentials: true }
          )
          .then((res) => res)
          .catch((err) => err);

        if (result.status === 201) {
          setInputTitle('');
          setContentInput(initialEditorInput);
          refetch();
          setOpen(false);
          return 'success';
        }
        // console.log(result);
      }
    },
    [inputTitle, selectedTagList.current, contentInput]
  );

  useEffect(() => {
    if (data) {
      setTagValues(data.map((item) => item.tagName));
    }
    return () => {
      setTagValues([]);
    };
  }, [data]);

  return (
    <div>
      <Button
        variant="outlined"
        color="default"
        className={classes.button}
        startIcon={<CreateIcon />}
        onClick={handleClickOpen}>
        New Log
      </Button>
      <Dialog
        disableEscapeKeyDown={true}
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <AppBar color="primary" className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Editor
            </Typography>
            <div style={{ marginRight: '5px' }}>
              {contentInput.length > 65535
                ? `글자수 초과(현재:${contentInput.length}, 최대:65535) `
                : ''}
            </div>
            <UploadDialog
              handleSave={handleSave}
              conditionSave={
                contentInput.length > 65535 ||
                contentInput.length === 0 ||
                inputTitle.length === 0 ||
                !selectedTagInfo
              }
            />
            {/* <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>

        {/* 에디터 시작 */}
        <div style={{ display: 'flex', width: '100%' }}>
          <TextField
            id="standard-basic"
            label="글 제목"
            value={inputTitle}
            onChange={onChangeInputTitle}
            style={{
              width: '50%',
              marginBottom: '8px',
              marginTop: '10px',
              marginLeft: '10px',
              marginRight: '10px',
            }}
          />

          {/* <Autocomplete
            style={{
              width: '50%',
              marginTop: '13px',
              marginLeft: '10px',
              marginRight: '10px',
            }}
            multiple
            id="size-small-standard-multi"
            size="small"
            onChange={(event, value) => {
              selectedTagList.current = value;
              if (value.length > 0) {
                setSelectedTagInfo(true);
              } else {
                setSelectedTagInfo(false);
              }
            }}
            autoComplete={true}
            autoHighlight={true}
            freeSolo={true}
            filterSelectedOptions={true}
            options={tagValues}
            getOptionLabel={(option) => option}
            // defaultValue={[tagValues[0]]}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Tags" placeholder="Tag + Enter" />
            )}
          /> */}

          <Autocomplete
            style={{
              width: '50%',
              marginTop: '13px',
              marginLeft: '10px',
              marginRight: '10px',
            }}
            id="size-small-standard-multi"
            open={tagListOpen}
            onOpen={() => {
              setTagListOpen(true);
            }}
            onClose={() => {
              setTagListOpen(false);
            }}
            // getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option}
            options={tagValues}
            loading={loading}
            multiple
            size="small"
            onChange={(event, value) => {
              console.log(value);
              selectedTagList.current = value;
              if (value.length > 0) {
                setSelectedTagInfo(true);
              } else {
                setSelectedTagInfo(false);
              }
            }}
            autoComplete={true}
            autoHighlight={true}
            freeSolo={true}
            filterSelectedOptions={true}
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
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </div>

        <MdEditor
          style={{ height: '100%', zIndex: 1101 }}
          value={contentInput}
          renderHTML={(text) => (
            <ReactMarkdown
              className="markdown-body"
              components={components}
              remarkPlugins={[gfm]}
              rehypePlugins={[rehypeRaw]}>
              {text}
            </ReactMarkdown>
          )}
          onChange={({ html, text }) => {
            // console.log(removeMD(text).replaceAll('\n', ' '));
            setContentInput(text);
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
      <SyntaxHighlighter
        style={prism}
        language={match[1]}
        PreTag="div"
        // children={String(children).replace(/\n$/, '')}
        {...props}>
        {String(children).replace(/\n$/, '')}{' '}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};
