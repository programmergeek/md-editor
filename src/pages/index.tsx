import {
  Box,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  Switch,
  Tooltip,
} from "@mui/material";
import { MarkdownComponents } from "lib/markdown/MarkdownComponents";
import Head from "next/head";
import React, { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MdOutlineDelete } from "react-icons/md";

const Post: React.FC = () => {
  const [title, updateTitle] = useState("");
  const [content, updateContent] = useState("");
  const [previewMode, togglePreviewMode] = useState(false);

  // memorise output to avoid making unneccessary requests when you are switching between preview and edit mode
  const renderedMarkdown = useMemo(
    () => (
      <ReactMarkdown
        remarkPlugins={[[remarkGfm]]}
        components={MarkdownComponents}
      >
        {content}
      </ReactMarkdown>
    ),
    [content]
  );

  // handles updating the title
  const handleTitleChange = (event: any) => {
    updateTitle(event.currentTarget.value);
  };

  // handles updating the content state
  const handleContentChange = (event: any) => {
    updateContent(event.currentTarget.value);
  };

  const onDelete = () => {
    // Deletes whatever content the user has entered
    updateContent("");
    updateTitle("");
  };

  return (
    <>
      <Head>
        <title>Markdown Editor</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container>
        <Grid container justifyContent={"center"}>
          <Grid item container direction={"column"} sm={11} md={7.5} lg={8}>
            <Grid item>
              {/** Insert Title here */}
              <InputBase
                sx={{ fontSize: 40, fontWeight: 700 }}
                placeholder="Title"
                multiline
                fullWidth
                onChange={handleTitleChange}
                value={title}
              />
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              {/** Insert Body here */}
              <Grid
                item
                container
                direction="row"
                sx={{
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Grid item xs={7}>
                  <FormControlLabel
                    control={<Switch />}
                    onChange={() => togglePreviewMode(!previewMode)}
                    label="Preview"
                    sx={{
                      color: previewMode ? "black" : "#a3a3a3",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={5}
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    gap: 2,
                  }}
                >
                  <Tooltip title="Discard">
                    <span>
                      <IconButton
                        disabled={
                          content.length === 0 && title.length === 0
                            ? true
                            : false
                        }
                        onClick={onDelete}
                      >
                        <MdOutlineDelete />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Grid>
              </Grid>
              {previewMode ? (
                <Box sx={{ marginTop: 2 }}>{renderedMarkdown}</Box>
              ) : (
                <InputBase
                  placeholder="What's on your mind?"
                  multiline
                  fullWidth
                  sx={{ marginBottom: 5 }}
                  minRows={5}
                  onChange={handleContentChange}
                  value={content}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Post;
