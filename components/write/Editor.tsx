import React, { useEffect, useRef, useState } from 'react';

const Editor = () => {
  const editorRef = useRef<any>();

  const [state, setState] = useState<any>({ Editor: null, plugins: [] });

  useEffect(() => {
    loadEditor();
  }, []);

  const loadEditor = async () => {
    const { Editor } = await import('@toast-ui/react-editor');
    state.Editor = Editor;

    // const codeSyntaxHighlight = await import('@toast-ui/editor-plugin-code-syntax-highlight');

    // import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

    // state.plugins.push(codeSyntaxHighlight);

    setState((v: any) => ({ ...v }));

    btnClickListener();
  };

  const btnClickListener = () => {
    const editorInstance = editorRef.current?.getInstance();
    // console.log('마크다운 : ', editorInstance.getMarkdown());
    console.log('HTML : ', editorInstance.getHtml());
  };

  return (
    <>
      <div style={{ width: '50%', height: '50%' }}>
        {state.Editor && (
          <>
            <state.Editor
              initialValue="# Hello Develogger!"
              previewStyle="vertical"
              height="100%"
              initialEditType="markdown"
              useCommandShortcut={true}
              plugins={state.plugins}
              ref={editorRef}
            />
          </>
        )}
      </div>
    </>
  );
};
export default Editor;
