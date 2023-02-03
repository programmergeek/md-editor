import { app } from "../Initialize";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
  doc,
} from "firebase/firestore";

interface Posts {
  title: string;
  content: string;
  user_id?: string;
  heroImage: string;
}

/** Adds a new post to firestore */
export const addPost = async ({
  title,
  user_id = "guest",
  content,
  heroImage,
}: Posts) => {
  // connect to firestore
  const db = getFirestore(app);
  try {
    // add document to Posts collection
    return await addDoc(collection(db, "Posts"), {
      publish_date: serverTimestamp(),
      update_date: serverTimestamp(),
      title: title,
      body: content,
      post_id: uuidv4(),
      hero_image: heroImage,
      author: doc(db, `Users/${user_id}`),
      slug: title.replaceAll(" ", "-").toLowerCase(),
    });
  } catch (e) {
    console.log("There was an issue: ", e);
  }
};
