import firebase from "firebase/app";
import "firebase/auth";

import { usersCollection } from "../utils/firebase";

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
