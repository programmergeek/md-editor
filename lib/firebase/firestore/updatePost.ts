import { app } from "../Initialize";

// This method is only executed when you are saving changes to a pre-existing post
/**
 *
 * @param postId
 * @param title
 * @param body
 * @param hero_image
 * @param author
 */
export const updatePost = (
  postId: string,
  title: string,
  body: string,
  hero_image: string,
  author = "guest"
) => {};
