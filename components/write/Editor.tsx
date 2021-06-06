import React, { useEffect, useState } from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

const Editor = (props: any) => {
  const [state, setState] = useState<any>({ Editor: null });

  useEffect(() => {
    loadEditor();
  }, []);
  const loadEditor = async () => {
    const { Editor } = await import('@toast-ui/react-editor');
    state.Editor = Editor;
    setState((v: any) => ({ ...v }));
  };
  return (
    <>
      {' '}
      <div style={{ width: '700px', height: '700px' }}>
        {' '}
        {state.Editor && (
          <state.Editor
            initialValue="hello react editor world!"
            previewStyle="vertical"
            height="600px"
            initialEditType="markdown"
            useCommandShortcut={true}
          />
        )}{' '}
      </div>{' '}
    </>
  );
};
export default Editor;
