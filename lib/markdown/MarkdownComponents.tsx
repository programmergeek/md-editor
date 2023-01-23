import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import * as colours from "@mui/material/colors";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { NormalComponents } from "react-markdown/lib/complex-types";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";

export const MarkdownComponents: Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> = {
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
  h1: ({ node, ...props }: any) => {
    return (
      <Typography variant="h1" sx={{ fontSize: 40, fontWeight: 600 }}>
        {props.children}
      </Typography>
    );
  },
  h2: ({ node, ...props }: any) => {
    return (
      <Typography variant="h2" sx={{ fontSize: 35, fontWeight: 600 }}>
        {props.children}
      </Typography>
    );
  },
  h3: ({ node, ...props }: any) => {
    return (
      <Typography variant="h3" sx={{ fontSize: 30, fontWeight: 600 }}>
        {props.children}
      </Typography>
    );
  },
  h4: ({ node, ...props }: any) => {
    return (
      <Typography variant="h4" sx={{ fontSize: 25, fontWeight: 600 }}>
        {props.children}
      </Typography>
    );
  },
  h5: ({ node, ...props }: any) => {
    return (
      <Typography variant="h5" sx={{ fontSize: 20, fontWeight: 600 }}>
        {props.children}
      </Typography>
    );
  },
  h6: ({ node, ...props }: any) => {
    return (
      <Typography variant="h6" sx={{ fontSize: 15, fontWeight: 600 }}>
        {props.children}
      </Typography>
    );
  },
  p: ({ node, ...props }: any) => {
    return (
      <Typography sx={{ fontSize: { xs: 12, lg: 16 }, wordWrap: "normal" }}>
        {" "}
        {props.children}{" "}
      </Typography>
    );
  },
  tr: ({ ...props }) => {
    return <TableRow> {props.children} </TableRow>;
  },
  table: ({ node, ...props }) => {
    return (
      <TableContainer component={Paper}>
        <Table>{props.children}</Table>
      </TableContainer>
    );
  },
  td: ({ node, ...props }) => {
    return <TableCell> {props.children} </TableCell>;
  },
  thead: ({ node, ...props }) => {
    return <TableHead>{props.children}</TableHead>;
  },
  th: ({ node, ...props }) => {
    return <TableCell sx={{ fontWeight: 600 }}> {props.children} </TableCell>;
  },
  tbody: ({ node, ...props }) => {
    return <TableBody> {props.children} </TableBody>;
  },
};
