import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import * as colours from "@mui/material/colors";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  ImageList,
  Link,
  List,
  ListItem,
  ListItemText,
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
import { Box } from "@mui/system";
import Image from "next/image";

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
      <Typography
        variant="h1"
        sx={{ fontSize: 32, fontWeight: 600, marginBottom: 3 }}
      >
        {props.children}
      </Typography>
    );
  },
  h2: ({ node, ...props }: any) => {
    return (
      <Typography
        variant="h2"
        sx={{ fontSize: 27, fontWeight: 600, marginBottom: 2.7 }}
      >
        {props.children}
      </Typography>
    );
  },
  h3: ({ node, ...props }: any) => {
    return (
      <Typography
        variant="h3"
        sx={{ fontSize: 23, fontWeight: 600, marginBottom: 2.4 }}
      >
        {props.children}
      </Typography>
    );
  },
  h4: ({ node, ...props }: any) => {
    return (
      <Typography
        variant="h4"
        sx={{ fontSize: 20, fontWeight: 600, marginBottom: 2.1 }}
      >
        {props.children}
      </Typography>
    );
  },
  h5: ({ node, ...props }: any) => {
    return (
      <Typography
        variant="h5"
        sx={{ fontSize: 16, fontWeight: 600, marginBottom: 1.8 }}
      >
        {props.children}
      </Typography>
    );
  },
  h6: ({ node, ...props }: any) => {
    return (
      <Typography
        variant="h6"
        sx={{ fontSize: 12, fontWeight: 600, marginBottom: 1.5 }}
      >
        {props.children}
      </Typography>
    );
  },
  p: ({ node, ...props }: any) => {
    return (
      <Typography
        sx={{
          fontSize: { xs: 12, lg: 16 },
          wordWrap: "normal",
          marginBottom: 1.5,
        }}
      >
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
      <TableContainer
        component={Paper}
        sx={{ marginBottom: 2.5, marginTop: 2.5 }}
      >
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
  a: ({ ...props }) => {
    return (
      <Link
        href={props.href}
        sx={{
          ":visited": {
            color: colours.blue[800],
          },
          textDecoration: "none",
        }}
      >
        {props.children}
      </Link>
    );
  },
  blockquote: ({ ...props }) => {
    return (
      <Typography
        sx={{
          borderLeft: "5px solid black",
          paddingLeft: 2,
          paddingTop: 1,
          paddingRight: 0.2,
          paddingBottom: 0.2,
          backgroundColor: colours.grey[100],
          marginBottom: 2,
        }}
      >
        {props.children}
      </Typography>
    );
  },
  ul: ({ ...props }) => {
    return <List sx={{ padding: 0, marginBottom: 1.5 }}>{props.children}</List>;
  },
  ol: ({ ...props }) => {
    return <List sx={{ padding: 0, marginBottom: 1.5 }}>{props.children}</List>;
  },
  li: ({ index, ordered, ...props }) => {
    return (
      <ListItem dense disableGutters sx={{ padding: 0 }}>
        <ListItemText>
          {ordered ? index + 1 + "." : "◼"} {props.children}
        </ListItemText>
      </ListItem>
    );
  },
  hr: ({ ...props }) => {
    return <Divider />;
  },
  input: ({ checked, ...props }) => {
    return <Checkbox checked={checked} sx={{ padding: 0, paddingRight: 1 }} />;
  },
  img: ({ ...props }) => {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: {
              xs: "90%",
              sm: "75%",
            },
          }}
        >
          <img
            src={props.src}
            style={{ opacity: 1, width: "100%", borderRadius: 3 }}
          />
        </Box>
      </Box>
    );
  },
};
