import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import { Form, ProgressBar } from "react-bootstrap";

const Uploader = (props) => {
  const [progress, setProgress] = useState(0);

  const handleChange = (event) => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      const time = new Date().getTime();
      const storage = firebase.storage();
      const uploadTask = storage
        .ref(`reviews/${time}-${image.name}`)
        .put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => console.log(error),
        () => {
          setProgress(0);
          uploadTask.snapshot.ref.getDownloadURL().then((downloadedURL) => {
            console.log(downloadedURL);
            props.handleImageName(uploadTask.snapshot.ref.name, downloadedURL);
          });
        }
      );
    }
  };
  return (
    <Form.Group>
      <img src={props.img} width="100%" alt="picture" />
      {progress === 0 ? (
        <Form.File
          id="customfile"
          label="upload image"
          onChange={handleChange}
          custom
        />
      ) : (
        <ProgressBar animated now={progress} />
      )}
    </Form.Group>
  );
};

export default Uploader;
