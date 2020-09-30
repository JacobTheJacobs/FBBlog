import firebase from "firebase/app";
import "firebase/auth";

import { usersCollection } from "../utils/firebase";

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
