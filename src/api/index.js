import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage"

import { usersCollection, postsCollection } from "../utils/firebase";
const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp;
//Register USER
//***** */
export const registerUser = async ({ email, password, name, lastname }) => {
  try {
    //create user for auth
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const { user } = response;

    //create user for db
    const userProfile = {
      uid: user.uid,
      email: email,
      name: name,
      lastname: lastname,
      role: 1,
    };

    await usersCollection.doc(user.uid).set(userProfile);

    firebase.auth().currentUser.sendEmailVerification(null);
    return { isAuth: true, user: userProfile };
  } catch (err) {
    return err.message;
  }
};
//LOGIN
//***** */
export const loginUser = ({ email, password }) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      return usersCollection
        .doc(res.user.uid)
        .get()
        .then((snapshot) => {
          return { isAuth: true, user: snapshot.data() };
        });
    })
    .catch((error) => {
      return { error: error.message };
    });

//CHECK AUTH
//***** */
export const autoSignInUser = () =>
  new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersCollection
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            resolve({ isAuth: true, user: snapshot.data() });
          });
      } else {
        resolve({ isAuth: false, user: null });
      }
    });
  });

export const logoutUser = () => {
  firebase.auth().signOut();
};

export const updateProfileUser = (formData, isEmailChanged) => {
  const collection = usersCollection.doc(formData.uid);
  const updateDocument = () =>
    collection
      .update(formData)
      .then(() =>
        collection
          .get()
          .then((snapshot) => ({ isAuth: true, user: snapshot.data() }))
      );
  if (isEmailChanged) {
    let getUser = firebase.auth().currentUser;
    getUser.updateEmail(formData.email);
    return updateDocument();
  } else {
    return updateDocument();
  }
};

export const addPostUser = (data, user) =>
  postsCollection
    .add({
      ...data,
      createdAt: serverTimeStamp(),
      rating: parseInt(data.rating),
      public: parseInt(data.public),
      ownerData: {
        ownedId: user.uid,
        name: `${user.name} ${user.lastname}`,
      },
    })
    .then((docRef) => {
      return docRef.id;
    });

export const getPostsUser = (limit) => 
  postsCollection
    .orderBy("createdAt")
    .limit(limit)
    .get()
    .then((snapshot) => {
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const reviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(reviews);

      return { posts: reviews, lastVisible: lastVisible };
    });
   

export const loadMoreReviewsUser = (limit, reviews) => {
  let posts = [...reviews.posts];
  let lastVisible = reviews.lastVisible;

  if(lastVisible){
    return postsCollection  
    .orderBy("createdAt")
    //last post
    .startAfter(lastVisible)
    .limit(limit)
    .get()
    .then( snapshot => {
      const lastVisible = snapshot.docs[snapshot.docs.length-1];
      const newReviews =snapshot.docs.map(doc =>({
        id:doc.id, ...doc.data()
      }))
      return { posts: [...posts, ...newReviews], lastVisible: lastVisible };
    })
  }else{
    console.log('no more posts')
    return {posts,lastVisible}
  }

}

export const getReviewByIdUser =async(id) =>{

  try{
    
    const snapshot = await postsCollection.doc(id).get();
    const data = snapshot.data();

 //   const url = await firebase.storage().ref(`posts/${data.img}`).getDownloadURL()

    return {...data/*, getDownloadURL:url*/}

  }catch(error){
    return null
  }
}