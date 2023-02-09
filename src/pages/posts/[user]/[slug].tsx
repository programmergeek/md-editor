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
import React, { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { IoCameraOutline } from "react-icons/io5";
import { AiOutlineSave } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getPost } from "lib/firebase/firestore/getPost";
import Error from "next/error";
import { updatePost } from "lib/firebase/firestore/updatePost";
import { deletePost } from "lib/firebase/firestore/deletePost";

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

const Post: React.FC = ({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (error === true) {
    return <Error title="Page Not Found" statusCode={404} />;
  }

  const [title, updateTitle] = useState(data.title as string);
  const [content, updateContent] = useState(data.body as string);
  const [previewMode, togglePreviewMode] = useState(false);
  const [openDialog, updateOpenDialog] = useState(false);
  const [imageLink, updateImageLink] = useState<string>(
    data.hero_image as string
  );
  const [link, updateLink] = useState<string>(data.hero_image as string);
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
    // update post
    await updatePost(
      data.title,
      title,
      content,
      link,
      router.query.user as string
    ).then(() => {
      // replace page with new slug if the title is changed
      updateIsLoading(false);
      updateIsSaved(true);
      if (data.title !== title) {
        router.replace({
          pathname: `/posts/[user]/[slug]`,
          query: {
            user: router.query.user as string,
            slug: title.replaceAll(" ", "-"),
          },
        });
      }
    });
  };

  // handles deleting a post
  const onDelete = async () => {
    updateIsLoading(true);
    await deletePost(
      router.query.user as string,
      data.title.replaceAll(" ", "-")
    ).then(() => {
      // redirect user to home page after deleting post
      router.push("/");
    });
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
        onClose={() => {
          updateIsSaved(false);
        }}
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
                      <img src={link} style={{ width: "100%" }} />
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
                      <IconButton onClick={onSave}>
                        <AiOutlineSave />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Post">
                      <IconButton onClick={onDelete}>
                        <MdOutlineDelete />
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
                <Button onClick={onSave}>Save</Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get the user id and slug from the request
  const { user, slug } = context.query;

  // get post data
  const data = await getPost(user as string, slug as string);

  // return an error if no data is found
  if (data === -1) {
    return {
      props: {
        error: true,
      },
    };
  }

  // return post data
  return {
    props: {
      data,
    },
  };
};
