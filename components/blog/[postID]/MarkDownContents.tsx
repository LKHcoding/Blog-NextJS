import React, { FC, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { NormalComponents, SpecialComponents } from 'react-markdown/src/ast-to-react';

// import prism from 'react-syntax-highlighter/dist/cjs/styles/prism/prism';
// import materialDark from 'react-syntax-highlighter/dist/cjs/styles/prism/nord';

import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';

// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import prism from 'react-syntax-highlighter/dist/cjs/styles/prism/prism';

// import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';

// import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
// import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
// import ts from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
// import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
// import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
// import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
// import html from 'react-syntax-highlighter/dist/cjs/languages/prism/markup';
// import java from 'react-syntax-highlighter/dist/cjs/languages/prism/java';

import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';
// import CodeBlock from './CodeBlock';

// SyntaxHighlighter.registerLanguage('javascript', js);
// SyntaxHighlighter.registerLanguage('jsx', jsx);
// SyntaxHighlighter.registerLanguage('typescript', ts);
// SyntaxHighlighter.registerLanguage('tsx', tsx);
// SyntaxHighlighter.registerLanguage('bash', bash);
// SyntaxHighlighter.registerLanguage('css', css);
// SyntaxHighlighter.registerLanguage('html', html);
// SyntaxHighlighter.registerLanguage('java', java);

interface Props {
  contents: string;
}

const MarkDownContents: FC<Props> = ({ contents }) => {
  return (
    <>
      <ReactMarkdown
        className="markdown-body"
        components={components}
        remarkPlugins={[gfm]}
        rehypePlugins={[rehypeRaw]}>
        {contents}
      </ReactMarkdown>
    </>
  );
};

export default memo(MarkDownContents);

const components: Partial<NormalComponents & SpecialComponents> = {
  a({ children }) {
    return (
      <a href={`${children}`} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  },
  h1({ children }) {
    let str = '';
    children?.map((item) => {
      if (typeof item === 'string') {
        str += item;
      } else {
        if (item && typeof item !== 'number' && typeof item !== 'boolean' && 'props' in item) {
          str += item?.props?.children[0];
        }
      }
    });
    return <h1 id={`${str !== '' ? str : children}`}>{children}</h1>;
  },
  h2({ children }) {
    let str = '';
    children?.map((item) => {
      if (typeof item === 'string') {
        str += item;
      } else {
        if (item && typeof item !== 'number' && typeof item !== 'boolean' && 'props' in item) {
          str += item?.props?.children[0];
        }
      }
    });
    return <h2 id={`${str !== '' ? str : children}`}>{children}</h2>;
  },
  h3({ children }) {
    let str = '';
    children?.map((item) => {
      if (typeof item === 'string') {
        str += item;
      } else {
        if (item && typeof item !== 'number' && typeof item !== 'boolean' && 'props' in item) {
          str += item?.props?.children[0];
        }
      }
    });
    return <h3 id={`${str !== '' ? str : children}`}>{children}</h3>;
  },
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
