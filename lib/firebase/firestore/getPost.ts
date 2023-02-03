import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../Initialize";

/** Gets a post from firestore */
export const getPost = async (user_id: string, slug: string) => {
  // because titles are uniqe and slugs are derived from titles, slugs should be unique.
  // This means we should be able to query for a post using the slug

  // connect to firestore
  const db = getFirestore(app);

  // query for the post (assumes `slug` and `author` combination will match with 1 post at most)
  const postsRef = collection(db, "Posts");
  const q = query(
    postsRef,
    where("author", "==", doc(db, `Users/${user_id}`)),
    where("slug", "==", slug)
  );

  // get the post data
  const post = await getDocs(q).then((doc) => doc.docs[0].data());

  //return the post data
  return post;
};
