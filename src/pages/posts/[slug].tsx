import { Box, Container, InputBase } from "@mui/material";
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
        {/** Insert Hero Image here */}
        <Box
          sx={{ backgroundColor: "#a4a4a4", width: "100%", height: "50vh" }}
        />
        <Box>
          {/** Insert Title here */}
          <InputBase
            sx={{ fontSize: 40, fontWeight: 700 }}
            placeholder="Title"
            onChange={handleTitleChange}
          />
        </Box>
        <Box>{/** Insert Body here */}</Box>
      </Container>
    </Layout>
  );
};

export default Post;
