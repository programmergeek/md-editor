import {
  collection,
  getFirestore,
  query,
  doc,
  where,
  DocumentReference,
  DocumentData,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../Initialize";

/** Delete a users post */
export const deletePost = async (author: string, slug: string) => {
  // connect to firestore
  const db = getFirestore(app);

  // query for the post (assumes that the post exists)
  const postsRef = collection(db, "Posts");
  const q = query(
    postsRef,
    where("author", "==", doc(db, `Users/${author}`)),
    where("slug", "==", slug)
  );

  // get the post reference
  let postRef: DocumentReference<DocumentData>;
  await getDocs(q)
    .then((doc) => {
      postRef = doc.docs[0].ref;
    })
    .then(async () => {
      await deleteDoc(postRef);
    });
};
