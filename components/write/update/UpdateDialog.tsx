import AppBar from '@material-ui/core/AppBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import { TransitionProps } from '@material-ui/core/transitions';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, {
  FC,
  forwardRef,
  ReactElement,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactMarkdown from 'react-markdown';
import 'react-markdown-editor-lite/lib/index.css';
import { NormalComponents, SpecialComponents } from 'react-markdown/src/ast-to-react';
import { useQuery } from '@tanstack/react-query';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import prism from 'react-syntax-highlighter/dist/cjs/styles/prism/prism';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import ts from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import html from 'react-syntax-highlighter/dist/cjs/languages/prism/markup';
import java from 'react-syntax-highlighter/dist/cjs/languages/prism/java';

import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';
import useInput from '../../../hooks/useInput';
import { IPostInfoType } from '../../../types/PostInfoType';
import { getAllTagInfoApi } from '../../../utils/queryAPI';
import UpdateUploadDialog from './UpdateUploadDialog';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('java', java);

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
# Loading ...



`;

interface Props {
  updateDialogOpen: boolean;
  setUpdateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postData: IPostInfoType | undefined;
}

const UpdateDialog: FC<Props> = ({
  updateDialogOpen: open,
  setUpdateDialogOpen: setOpen,
  postData,
}) => {
  // Tag data 가져오기
  const { data, refetch, isFetching } = useQuery([getAllTagInfoApi.key], getAllTagInfoApi.apiCall);

  //글 내용
  const [contentInput, setContentInput] = useState<string>('');

  //글 제목
  const [inputTitle, onChangeInputTitle, setInputTitle] = useInput('');

  //모든 태그 리스트
  const [tagValues, setTagValues] = useState<string[]>([]);

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
  // const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

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
              title: inputTitle,
              tags: selectedTagList.current,
              content: contentInput,
              thumbnail: imagePath,
              prevThumbnail: postData.thumbnail,
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
      }
    },
    [inputTitle, selectedTagList.current, contentInput]
  );

  // 썸네일 변경 없이 글 수정하기
  const handleSaveWithOutThumbnail = async () => {
    if (postData) {
      const result = await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/blog/update-post`,
          {
            id: postData.id,
            title: inputTitle,
            tags: selectedTagList.current,
            content: contentInput,
            thumbnail: postData.thumbnail,
            prevThumbnail: '',
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
    }
  };

  useEffect(() => {
    if (data) {
      setTagValues(data.map((item) => item.tagName));
    }
    return () => {
      setTagValues([]);
      setInputTitle('');
    };
  }, [data]);

  useEffect(() => {
    /**
     * 글 수정하는곳은 닫았다가 열때마다 다시 원래 데이터를 채워넣어준다.
     */
    if (postData) {
      setInputTitle(postData.title);
      setContentInput(postData.content);
      selectedTagList.current = postData.Tags.map((item) => item.tagName);
    }
    return () => {
      setInputTitle('');
      setContentInput(initialEditorInput);
      selectedTagList.current = [];
    };
  }, [open, postData]);

  useEffect(() => {
    // 글 수정시에는 바로 데이터가 들어오므로 useEffect에서 save버튼 활성화를 컨트롤해준다.
    if (selectedTagList.current && selectedTagList.current.length > 0) {
      setSelectedTagInfo(true);
    } else {
      setSelectedTagInfo(false);
    }
    return () => {
      setSelectedTagInfo(false);
    };
  }, [selectedTagList.current]);

  return (
    <div>
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
              글 수정
            </Typography>
            <div style={{ marginRight: '5px' }}>
              {contentInput.length > 65535
                ? `글자수 초과(현재:${contentInput.length}, 최대:65535) `
                : ''}
            </div>
            <UpdateUploadDialog
              isUpdate={true}
              handleSave={handleSave}
              handleSaveWithOutThumbnail={handleSaveWithOutThumbnail}
              postId={postData?.id || null}
              conditionSave={
                contentInput.length > 65535 ||
                contentInput.length === 0 ||
                inputTitle.length === 0 ||
                !selectedTagInfo
              }
              // conditionSave={true}
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
            defaultValue={postData ? postData.Tags.map((item) => item.tagName) : []}
            getOptionLabel={(option) => option}
            options={tagValues}
            loading={loading}
            multiple
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
            setContentInput(text);
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
