import React from 'react';
import ReactMarkdown from 'react-markdown';
import { NormalComponents, SpecialComponents } from 'react-markdown/src/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface Props {
  contents: string;
}

export const MarkDownContents = ({ contents }: Props) => {
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

const components: Partial<NormalComponents & SpecialComponents> = {
  h1({ children }) {
    return <h1 id={`${children}`}>{children}</h1>;
  },
  h2({ children }) {
    return <h2 id={`${children}`}>{children}</h2>;
  },
  h3({ children }) {
    return <h3 id={`${children}`}>{children}</h3>;
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
