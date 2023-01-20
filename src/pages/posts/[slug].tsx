import { Box, Container } from "@mui/material";
import { Layout } from "Components";
import Head from "next/head";
import React from "react";

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
  return (
    <Layout>
      <Head>
        <title>Post</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container>
        <Box
          sx={{ backgroundColor: "#a4a4a4", width: "100%", height: "50vh" }}
        />
      </Container>
    </Layout>
  );
};

export default Post;
