import { app } from "../Initialize";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
  doc,
} from "firebase/firestore";

/** Adds a new post to firestore */
export const addPost = async (
  title: string, // title of the post
  body: object, // a json representation of the markdown content
  hero_image: string, // a link to the hero image
  author = "guest" // a reference to the user in the user collection
) => {
  // connect to firestore
  const db = getFirestore(app);
  try {
    // add document to Posts collection
    await addDoc(collection(db, "Posts"), {
      publish_date: serverTimestamp(),
      update_date: serverTimestamp(),
      title: title,
      body: body,
      post_id: uuidv4(),
      hero_image: hero_image,
      author: doc(db, `Users/${author}`),
      slug: title.replace(" ", "-").toLowerCase(),
    });
  } catch (e) {
    console.log("There was an issue: ", e);
  }
};
