import React, { FC, memo } from 'react';

import ReactMarkdown from 'react-markdown';
import {
  NormalComponents,
  SpecialComponents,
} from 'react-markdown/src/ast-to-react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';

import prism from 'react-syntax-highlighter/dist/cjs/styles/prism/prism';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';

type MarkDownContentsProps = {
  contents: string;
};

const MarkDownContents: FC<MarkDownContentsProps> = ({ contents }) => {
  return (
    <>
      <ReactMarkdown
        className="markdown-body"
        components={components}
        remarkPlugins={[gfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {contents}
      </ReactMarkdown>
    </>
  );
};

export default memo(MarkDownContents);

const components: Partial<NormalComponents & SpecialComponents> = {
  a(props) {
    const children = props?.children;
    const href = props?.href;
    const target = props?.target;

    if (target) {
      return (
        <a href={`${href}`} target={`${target}`} rel="noreferrer">
          {children}
        </a>
      );
    }

    return (
      <a href={`${href}`} target="_blank" rel="noreferrer">
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
        if (
          item &&
          typeof item !== 'number' &&
          typeof item !== 'boolean' &&
          'props' in item
        ) {
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
        if (
          item &&
          typeof item !== 'number' &&
          typeof item !== 'boolean' &&
          'props' in item
        ) {
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
        if (
          item &&
          typeof item !== 'number' &&
          typeof item !== 'boolean' &&
          'props' in item
        ) {
          str += item?.props?.children[0];
        }
      }
    });
    return <h3 id={`${str !== '' ? str : children}`}>{children}</h3>;
  },
  code({ _node, inline, className, children, ...props }) {
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
