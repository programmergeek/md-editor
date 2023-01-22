import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import * as colours from "@mui/material/colors";

export const MarkdownComponents = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, "")}
        style={dracula}
        language={match[1]}
        PreTag="div"
        {...props}
      />
    ) : (
      <code
        className={className}
        style={{
          backgroundColor: colours.purple[50],
          paddingLeft: 5,
          paddingRight: 5,
          borderRadius: 2,
          paddingBottom: 2,
          color: colours.purple[500],
          fontSize: 14,
        }}
        {...props}
      >
        {children}
      </code>
    );
  },
};
