import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  Snackbar,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Layout } from "Components";
import { addPost } from "lib/firebase/firestore/addPost";
import { MarkdownComponents } from "lib/markdown/MarkdownComponents";
import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { IoCameraOutline } from "react-icons/io5";
import { AiOutlineSave } from "react-icons/ai";
import { useRouter } from "next/router";

//
// - This is where posts will be display
// - The user should be able to:
//      - toggle between and edit mode, where they can change the content of their post, and a preview mode,
//        where the raw markdown is rendered. ✅
//      - Save their posts ✅
//      - read the saved posts
// - Page structure:
//      - Hero Image ✅
//      - Post Title ✅
//      - Content (Body) ✅
// - Edit Mode:
//      - Content will only be shown as raw markdown ✅
// - Preview Mode:
//      - Content will be rendered using react components ✅
//

const Post: React.FC = () => {
  const [title, updateTitle] = useState("");
  const [content, updateContent] = useState("");
  const [previewMode, togglePreviewMode] = useState(false);
  const [openDialog, updateOpenDialog] = useState(false);
  const [imageLink, updateImageLink] = useState<string>();
  const [link, updateLink] = useState<string>();
  const [canSave, updateCanSave] = useState(false);
  const [isLoading, updateIsLoading] = useState(false);
  const [isSaved, updateIsSaved] = useState(false);
  const router = useRouter();

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

  // Disable save buttons when the title and body fields are empty
  useEffect(() => {
    if (!content || !title) {
      updateCanSave(true);
      console.log(canSave);
    } else {
      updateCanSave(false);
    }
  }, [content, title]);

  // handles updating the title
  const handleTitleChange = (event: any) => {
    updateTitle(event.currentTarget.value);
  };

  // handles updating the content state
  const handleContentChange = (event: any) => {
    updateContent(event.currentTarget.value);
  };

  // opens dialog box
  const handleOpenDialog = () => {
    updateOpenDialog(true);
  };

  // closes dialog box
  const handleCloseDialog = () => {
    updateOpenDialog(false);
  };

  // handles saving the post
  const onSave = async () => {
    updateIsLoading(true);
    await addPost({
      title: title,
      content: content,
      heroImage: link ? link : "",
    })
      .then((res) => {
        // if the post has been successfully saved then redirect the user to the posts page
        if (res?.id) {
          updateIsLoading(false);
          updateIsSaved(true);
          router.push({
            pathname: `/posts/[user]/[slug]`,
            query: {
              user: "guest", // TODO: get user id from global state
              slug: title.replaceAll(" ", "-").toLowerCase(), // TODO: replace with slug
            },
          });
        } else {
        }
      })
      .catch(console.log); // display any errors in the console
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        open={isSaved}
        message="Post Saved"
        ContentProps={{ sx: { justifyContent: "center" } }}
      />
      <Layout>
        <Head>
          <title>{title ? title : "Untitled"}</title>
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
              <Grid item sx={{ display: previewMode && !link ? "none" : "" }}>
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: link ? "#fff" : `#f3e5f5`,
                    borderRadius: 3,
                    display: "grid",
                    placeItems: "center",
                    paddingTop: 3,
                    paddingBottom: 3,
                  }}
                >
                  {/** Insert Hero Image here */}
                  {/**
                   * The User should be able to enter a link to an image somwhere on the internet
                   */}
                  <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    fullWidth
                  >
                    <DialogTitle>Enter Image Link</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="imageLink"
                        label="Image Link"
                        type="url"
                        fullWidth
                        onChange={(e) => updateImageLink(e.currentTarget.value)}
                        value={imageLink}
                        variant="standard"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog}>Cancel</Button>
                      <Button
                        onClick={() => {
                          handleCloseDialog();
                          updateLink(imageLink);
                        }}
                      >
                        Done
                      </Button>
                    </DialogActions>
                  </Dialog>
                  {!link ? (
                    <div
                      style={{
                        border: "5px dashed #9c27b0",
                        width: "93%",
                        height: "45vh",
                        borderRadius: 12,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "center",
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
                          <Button
                            onClick={handleOpenDialog}
                            sx={{
                              color: "#9c27b0",
                              backgroundColor: "transparent",
                            }}
                          >
                            Enter a link
                          </Button>
                        </Typography>
                      </Box>
                    </div>
                  ) : (
                    <Box
                      sx={{
                        overflow: "hidden",
                        borderRadius: 3,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <img src={imageLink} style={{ width: "100%" }} />
                    </Box>
                  )}
                </Box>
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
                    <Tooltip title="Change Image">
                      <IconButton onClick={handleOpenDialog}>
                        <IoCameraOutline />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Save Post">
                      <IconButton disabled={canSave} onClick={onSave}>
                        <AiOutlineSave />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
                {previewMode ? (
                  <Box sx={{ marginTop: 2 }}>{renderedMarkdown}</Box>
                ) : (
                  <InputBase
                    placeholder="Your content goes here."
                    multiline
                    fullWidth
                    sx={{ marginBottom: 5 }}
                    minRows={5}
                    onChange={(e) => {
                      handleContentChange(e);
                      console.log(content);
                    }}
                    value={content}
                  />
                )}
                <Button disabled={canSave} onClick={onSave}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default Post;
