import {
  Backdrop,
  Box,
  Button,
  Container,
  Fade,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  Modal,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { MarkdownComponents } from "lib/markdown/MarkdownComponents";
import Head from "next/head";
import React, { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MdOutlineDelete, MdHelpOutline } from "react-icons/md";
import { help } from "./../../public/static/help";

const Post: React.FC = () => {
  const [title, updateTitle] = useState("");
  const [content, updateContent] = useState("");
  const [previewMode, togglePreviewMode] = useState(false);
  const [isOpen, updateIsOpen] = useState(true);

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

  const renderHelpMarkdown = useMemo(
    () => (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={MarkdownComponents}
      >
        {help}
      </ReactMarkdown>
    ),
    []
  );

  // handles updating the title
  const handleTitleChange = (event: any) => {
    updateTitle(event.currentTarget.value);
  };

  // handles updating the content state
  const handleContentChange = (event: any) => {
    updateContent(event.currentTarget.value);
  };

  // opens help modal
  const openHelp = () => {
    updateIsOpen(true);
  };

  // closes help modal
  const closeHelp = () => {
    updateIsOpen(false);
  };

  const onDelete = () => {
    // Deletes whatever content the user has entered
    updateContent("");
    updateTitle("");
  };

  return (
    <>
      <Modal open={isOpen} onClose={closeHelp} closeAfterTransition>
        <Fade in={isOpen}>
          <Box
            sx={{
              display: "grid",
              height: "100vh",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: 2,
                borderRadius: 1,
                placeSelf: "center",
                maxHeight: 500,
                overflow: "auto",
                width: {
                  xs: "80vw",
                  sm: "70vw",
                  md: "60vw",
                  lg: "50vw",
                  xl: "40vw",
                },
              }}
            >
              <Grid container spacing={2} direction={"column"}>
                <Grid item>
                  <Typography sx={{ fontSize: 40, fontWeight: 600 }}>
                    Markdown Editor Demo
                  </Typography>
                </Grid>
                <Grid item xs={11}>
                  {renderHelpMarkdown}
                </Grid>
                <Grid
                  item
                  display="flex"
                  justifyContent={"end"}
                  sx={{ marginTop: 2 }}
                >
                  <Button
                    onClick={closeHelp}
                    fullWidth
                    sx={{
                      fontWeight: 400,
                      textTransform: "capitalize",
                      fontSize: 16,
                    }}
                  >
                    Done
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>
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
                  <Tooltip title="Help">
                    <IconButton onClick={openHelp}>
                      <MdHelpOutline />
                    </IconButton>
                  </Tooltip>
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
