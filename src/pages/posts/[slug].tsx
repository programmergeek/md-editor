import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  InputBase,
  Switch,
  Typography,
} from "@mui/material";
import { Layout } from "Components";
import { addPost } from "lib/firebase/firestore/addPost";
import { MarkdownComponents } from "lib/markdown/MarkdownComponents";
import Head from "next/head";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { IoCameraOutline } from "react-icons/io5";

//
// - This is where posts will be display
// - The user should be able to:
//      - toggle between and edit mode, where they can change the content of their post, and a preview mode,
//        where the raw markdown is rendered. ✅
//      - Save their posts
//      - Share their posts
// - Page structure:
//      - Hero Image
//      - Post Title
//      - Content (Body)
//      - Footer
// - Edit Mode:
//      - Content will only be shown as raw markdown
// - Preview Mode:
//      - Content will be rendered using react components
//

const Post: React.FC = () => {
  const [title, updateTitle] = useState("");
  const [content, updateContent] = useState("");
  const [previewMode, togglePreviewMode] = useState(false);

  const handleTitleChange = (event: any) => {
    updateTitle(event.currentTarget.value);
  };
  const handleContentChange = (event: any) => {
    updateContent(event.currentTarget.value);
  };
  return (
    <Layout>
      <Head>
        <title>{title}</title>
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
              />
            </Grid>
            <Grid item>
              <Box
                sx={{
                  width: "100%",
                  height: "50vh",
                  backgroundColor: `#f3e5f5`,
                  borderRadius: 3,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {/** Insert Hero Image here */}
                {/**
                 * The User should be able to:
                 *    - select an image file from local storage:
                 *      - manual selection or
                 *      - drag and drop
                 *    - Or enter a link to an image somwhere on the internet
                 * Only accept .png or .jpeg files
                 */}
                <Box
                  sx={{
                    border: "5px dashed #9c27b0",
                    width: "93%",
                    height: "45vh",
                    borderRadius: 3,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyCenter: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ display: "grid", placeItems: "center" }}>
                      <IoCameraOutline fontSize={100} color="#9c27b0" />
                    </Box>
                    <Typography
                      textAlign={"center"}
                      sx={{ paddingLeft: 2, paddingRight: 1 }}
                    >
                      Drag and drop an image or{" "}
                      <Button
                        sx={{
                          color: "#9c27b0",
                          backgroundColor: "transparent",
                        }}
                      >
                        Enter a link
                      </Button>{" "}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              {/** Insert Body here */}
              <FormControlLabel
                control={<Switch />}
                onChange={() => togglePreviewMode(!previewMode)}
                label="Preview"
                sx={{
                  color: previewMode ? "black" : "#a3a3a3",
                }}
              />
              {previewMode ? (
                <Box sx={{ marginTop: 2 }}>
                  <ReactMarkdown
                    remarkPlugins={[[remarkGfm]]}
                    components={MarkdownComponents}
                  >
                    {content}
                  </ReactMarkdown>
                </Box>
              ) : (
                <InputBase
                  placeholder="Your content goes here."
                  multiline
                  fullWidth
                  sx={{ marginTop: 2 }}
                  onChange={(e) => {
                    handleContentChange(e);
                    console.log(content);
                  }}
                  value={content}
                />
              )}
              <Button
                onClick={() =>
                  addPost(title, { content: JSON.stringify(content) }, "")
                }
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Post;
