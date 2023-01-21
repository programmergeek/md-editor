import { Box, Container, Grid, InputBase } from "@mui/material";
import { Layout } from "Components";
import Head from "next/head";
import React, { useState } from "react";

//
// - This is where posts will be display
// - The user should be able to:
//      - toggle between and edit mode, where they can change the content of their post, and a preview mode,
//        where the raw markdown is rendered.
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

  const handleTitleChange = (event: any) => {
    updateTitle(event.currentTarget.value);
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
                  backgroundColor: "#a4a4a4",
                  width: "100%",
                  height: "50vh",
                }}
              >
                {/** Insert Hero Image here */}
              </Box>
            </Grid>
            <Grid item>
              {/** Insert Body here */}
              <InputBase
                placeholder="Your content goes here."
                multiline
                fullWidth
                sx={{ marginTop: 2 }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Post;
