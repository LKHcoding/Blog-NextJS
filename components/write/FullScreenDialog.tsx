import React, { forwardRef, ReactElement, Ref, useRef, useState } from 'react';
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

import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/dist/markdown-editor.css';
import '@uiw/react-markdown-preview/dist/markdown.css';

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
    },
  })
);

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = () => {
  const [value, setValue] = useState<string>(mkdStr);

  const [tagValues, setTagValues] = useState([
    'Nest.js',
    'Next.js',
    'react.js',
    'mysql',
    'react-query',
    'ssr',
  ]);

  //글 제목
  const [inputTitle, onChangeInputTitle] = useInput('');

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar color="primary" className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Editor
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
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
            multiple
            id="size-small-standard-multi"
            size="small"
            onChange={(event, value) => console.log(value)}
            autoComplete={true}
            autoHighlight={true}
            freeSolo={true}
            options={tagValues}
            getOptionLabel={(option) => option}
            // defaultValue={[tagValues[0]]}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Tag" placeholder="Tag" />
            )}
          />
        </div>
        {/* <Editor /> */}
        {/* <CustomEditor /> */}
        <MDEditor
          height={700}
          minHeight={300}
          value={value}
          onChange={(changedValue) => setValue(changedValue || '')}
        />
        {/* <MDEditor height={200} value={value} onChange={(value) => console.log(value)} /> */}
        {/* <div style={{ padding: '50px 0 0 0' }} /> */}
        {/* <MDEditor.Markdown source={value} /> */}
      </Dialog>
    </div>
  );
};

export default FullScreenDialog;

const mkdStr = `![image](https://uicdn.toast.com/toastui/img/tui-editor-bi.png)

# Awesome Editor!

It has been _released as opensource in 2018_ and has ~~continually~~ evolved to **receive 10k GitHub ⭐️ Stars**.

## Create Instance

You can create an instance with the following code and use \`getHtml()\` and \`getMarkdown()\` of the [Editor](https://github.com/nhn/tui.editor).

\`\`\`js
const editor = new Editor(options);
\`\`\`

> See the table below for default options
> > More API information can be found in the document

| name | type | description |
| --- | --- | --- |
| el | \`HTMLElement\` | container element |

## Features

* CommonMark + GFM Specifications
   * Live Preview
   * Scroll Sync
   * Auto Indent
   * Syntax Highlight
        1. Markdown
        2. Preview

## Support Wrappers

> * Wrappers
>    1. [x] React
>    2. [x] Vue
>    3. [ ] Ember
`;
