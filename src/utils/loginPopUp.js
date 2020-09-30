import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import firebase from "firebase/app";

const LoginPopUp = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [error, setError] = useState("");

  const handleReAuth = ({ email, password }) => {
    let getUser = firebase.auth().currentUser;
    let credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    if (getUser) {
      getUser
        .reauthenticateWithCredential(credential)
        .then((user) => {
          props.submitForm(props.modal.formData);
        })
        .catch((error) => {
          setError("sorry try again");
        });
    }
  };

  return (
    <div>
      <Modal show={props.modal.open} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reauthentication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Sorry, we need to make sure you are you</p>
          <form onSubmit={handleSubmit(handleReAuth)}>
            <input
              type="email"
              className="form-control mb-3"
              name="email"
              placeholder="Email"
              ref={register({
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.email && <span className="error"> Email is required</span>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control mb-3"
              ref={register({
                required: true,
              })}
            />
            {errors.password && (
              <span className="error">Password is required</span>
            )}
            <button className="btn btn-primary btn-lg btn-block" type="submit">
              Reauth
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginPopUp;
