import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { app } from "../Initialize";

/** Gets a post from firestore
 * @param user_id - `string`
 * @param slug - `string`
 */
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
  const postDoc = await getDocs(q).then((doc) => {
    if (doc.size === 0) {
      // incase no data was found
      return false;
    } else {
      return doc.docs[0].data();
    }
  });

  // Format data for the for the front-end
  if (postDoc !== false) {
    const post = {
      title: postDoc.title as string,
      slug: postDoc.slug as string,
      hero_image: postDoc.hero_image as string,
      body: postDoc.body as string,
      publish_date: new Timestamp(
        postDoc.publish_date.seconds,
        postDoc.publish_date.nanoseconds
      )
        .toDate()
        .toLocaleDateString("en-UK", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      update_date: new Timestamp(
        postDoc.publish_date.seconds,
        postDoc.publish_date.nanoseconds
      )
        .toDate()
        .toLocaleDateString("en-UK", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
    };

    //return the post data
    return post;
  }

  // if no data is found return -1
  return -1;
};
