import React, {
  FC,
  forwardRef,
  ReactElement,
  Ref,
  useCallback,
  useEffect,
} from 'react';
import dynamic from 'next/dynamic';

import AppBar from '@material-ui/core/AppBar';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { TransitionProps } from '@material-ui/core/transitions';

import axios from 'axios';
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useQuery } from '@tanstack/react-query';
import { useImmerRef } from 'use-immer-ref';
import {
  NormalComponents,
  SpecialComponents,
} from 'react-markdown/src/ast-to-react';

import 'react-markdown-editor-lite/lib/index.css';

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

import UpdateUploadDialog from './UpdateUploadDialog';
import { getAllTagInfoApi } from 'utils/queryAPI';
import { PostInfo } from 'types/PostInfo';
import { useStyles } from './UpdateDialog.style';

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
# Loading ...



`;

type UpdateDialogProps = {
  updateDialogOpen: boolean;
  setUpdateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postData: PostInfo | undefined;
};

const UpdateDialog: FC<UpdateDialogProps> = ({
  updateDialogOpen: open,
  setUpdateDialogOpen: setOpen,
  postData,
}) => {
  const classes = useStyles();

  const { data, refetch, isFetching } = useQuery([getAllTagInfoApi.key], () =>
    getAllTagInfoApi.apiCall()
  );

  const [state, setState, ref] = useImmerRef({
    // 내용
    contentInput: '',
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
  });

  const loading = isFetching;

  const handleClose = () => {
    setOpen(false);
  };

  //썸네일 변경하면서 글 수정하기
  const handleSave = useCallback(
    async (file: File[]) => {
      const formData = new FormData();
      formData.append('image', file[0]);

      const imagePath = await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/image`, formData, {
          withCredentials: true,
        })
        .then((res) => res.data);

      if (imagePath && postData) {
        const result = await axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/blog/update-post`,
            {
              id: postData.id,
              title: state.inputTitle,
              tags: ref.current.selectedTagList,
              content: state.contentInput,
              thumbnail: imagePath,
              prevThumbnail: postData.thumbnail,
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
          setOpen(false);
          return 'success';
        }
      }
    },
    [state.inputTitle, ref.current.selectedTagList, state.contentInput]
  );

  // 썸네일 변경 없이 글 수정하기
  const handleSaveWithOutThumbnail = async () => {
    if (postData) {
      const result = await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/blog/update-post`,
          {
            id: postData.id,
            title: state.inputTitle,
            tags: ref.current.selectedTagList,
            content: state.contentInput,
            thumbnail: postData.thumbnail,
            prevThumbnail: '',
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
        setOpen(false);
        return 'success';
      }
    }
  };

  useEffect(() => {
    if (data) {
      setState((dr) => {
        dr.tagValues = data.map((item) => item.tagName);
      });
    }
    return () => {
      setState((dr) => {
        dr.inputTitle = '';
        dr.tagValues = [];
      });
    };
  }, [data]);

  useEffect(() => {
    // 글 수정하는곳은 닫았다가 열때마다 다시 원래 데이터를 채워넣어준다.
    if (postData) {
      setState((dr) => {
        dr.inputTitle = postData.title;
        dr.contentInput = postData.content;
        dr.selectedTagList = postData.Tags.map((item) => item.tagName);
      });
    }
    return () => {
      setState((dr) => {
        dr.inputTitle = '';
        dr.contentInput = initialEditorInput;
        dr.selectedTagList = [];
      });
    };
  }, [open, postData]);

  useEffect(() => {
    // 글 수정시에는 바로 데이터가 들어오므로 useEffect에서 save버튼 활성화를 컨트롤해준다.
    if (ref.current.selectedTagList && ref.current.selectedTagList.length > 0) {
      setState((dr) => {
        dr.selectedTagInfo = true;
      });
    } else {
      setState((dr) => {
        dr.selectedTagInfo = false;
      });
    }
    return () => {
      setState((dr) => {
        dr.selectedTagInfo = false;
      });
    };
  }, [ref.current.selectedTagList]);

  return (
    <div>
      <Dialog
        disableEscapeKeyDown
        fullScreen
        open={open}
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
              글 수정
            </Typography>
            <div className={classes.exceedLength}>
              {state.contentInput.length > 65535
                ? `글자수 초과(현재:${state.contentInput.length}, 최대:65535) `
                : ''}
            </div>
            <UpdateUploadDialog
              isUpdate
              handleSave={handleSave}
              handleSaveWithOutThumbnail={handleSaveWithOutThumbnail}
              postId={postData?.id || null}
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
            onChange={(e) =>
              setState((dr) => {
                dr.inputTitle = e.target.value;
              })
            }
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
            defaultValue={postData ? postData.Tags.map((item) => item.tagName) : []}
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
          style={{ height: '100%', zIndex: 1101 }}
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

export default UpdateDialog;

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
