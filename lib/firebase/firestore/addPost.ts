import { app } from "../Initialize";
import {
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
  doc,
  query,
  where,
  getDocs,
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
  if (
    !(await titleIsUnique(
      `Users/${user_id}`,
      title.replaceAll(" ", "-").toLowerCase()
    ))
  ) {
    try {
      // add document to Posts collection
      return await addDoc(collection(db, "Posts"), {
        publish_date: serverTimestamp(),
        update_date: serverTimestamp(),
        title: title,
        body: content,
        hero_image: heroImage,
        author: doc(db, `Users/${user_id}`),
        slug: title.replaceAll(" ", "-").toLowerCase(),
      });
    } catch (e) {
      console.log("There was an issue: ", e);
    }
  } else {
    console.log("Title is taken");
  }
};

/** Checks if the user has made a post with the same title before.
 * `false` means the title is available where as `true` means the title is taken. */
const titleIsUnique = (user_id: string, slug: string) => {
  //query firestore if there is a post with a matching user_id and title.
  // if there is one then return false otherise return true.
  const db = getFirestore(app);
  const postsRef = collection(db, "Posts");
  let isTaken = false;

  // query for a post with a matching author and title
  const post = query(
    postsRef,
    where("author", "==", doc(db, user_id)),
    where("title", "==", slug)
  );

  // get all the posts that match the query
  getDocs(post).then((doc) => {
    // if there is one or more post retrieved then the title is taken
    if (doc.size > 0) {
      isTaken = true;
      console.log(isTaken);
    }
  });

  return isTaken;
};
