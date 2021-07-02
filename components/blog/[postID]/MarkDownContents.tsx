import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { NormalComponents, SpecialComponents } from 'react-markdown/src/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface Props {
  contents: string;
}

const MarkDownContents = ({ contents }: Props) => {
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

export default MarkDownContents;

const components: Partial<NormalComponents & SpecialComponents> = {
  h1({ children }) {
    let str = '';
    children.map((item) => {
      if (typeof item === 'string') {
        str += item;
      } else {
        if (item && typeof item !== 'number' && typeof item !== 'boolean' && 'props' in item) {
          str += item?.props?.children[0];
        }
      }
    });
    return <h1 id={`${str}`}>{children}</h1>;
  },
  h2({ children }) {
    let str = '';
    children.map((item) => {
      if (typeof item === 'string') {
        str += item;
      } else {
        if (item && typeof item !== 'number' && typeof item !== 'boolean' && 'props' in item) {
          str += item?.props?.children[0];
        }
      }
    });
    return <h2 id={`${str}`}>{children}</h2>;
  },
  h3({ children }) {
    let str = '';
    children.map((item) => {
      if (typeof item === 'string') {
        str += item;
      } else {
        if (item && typeof item !== 'number' && typeof item !== 'boolean' && 'props' in item) {
          str += item?.props?.children[0];
        }
      }
    });
    return <h3 id={`${str}`}>{children}</h3>;
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
