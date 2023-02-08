import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { app } from "../Initialize";

// This method is only executed when you are saving changes to a pre-existing post
/**
 *
 * @param title
 * @param body
 * @param hero_image
 * @param author
 */
export const updatePost = async (
  oldTitle: string,
  title: string,
  body: string,
  hero_image: string,
  author = "guest"
) => {
  // connect to firestore
  const db = getFirestore(app);

  // query for the post (assumes that the post exists)
  const postsRef = collection(db, "Posts");
  const q = query(
    postsRef,
    where("author", "==", doc(db, `Users/${author}`)),
    where("slug", "==", oldTitle.replaceAll(" ", "-"))
  );

  // get the post reference
  let postRef: DocumentReference<DocumentData>;
  await getDocs(q)
    .then((doc) => {
      postRef = doc.docs[0].ref;
    })
    .then(async () => {
      // update the post
      await updateDoc(postRef, {
        title: title,
        body: body,
        hero_image: hero_image,
        update_date: serverTimestamp(),
        slug: title.replaceAll(" ", "-"),
      });
    });
};
