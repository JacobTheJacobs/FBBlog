import React, { useState } from "react";
import Layout from "../../../utils/layout";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import LoginPopUp from "../../../utils/loginPopUp";
import { updateProfile } from "../../../store/actions/index";
import { toast } from "react-toastify";

const Profile = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState({
    open: false,
    formData: "",
  });

  const handleAuthModal = (data) => {
    setShowModal({ open: true, formData: data });
  };

  const handleClose = () => {
    setShowModal({ open: false, formData: "" });
  };

  const submitForm = (data) => {
    const isEmailChanged = auth.user.email === data.email ? false : true;
    setDisabled(true);
    setShowModal({ open: false, formData: "" });

    dispatch(
      updateProfile({ uid: auth.user.uid, ...data }, isEmailChanged)
    ).then(() => {
      toast.success("Congrats Youre profile has been updated", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    });
  };

  return (
    <Layout auth={auth} title="Profile">
      <form onSubmit={handleSubmit(handleAuthModal)}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="name">First name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              ref={register({ required: true })}
              defaultValue={auth.user.name}
            />
            {errors.name && (
              <span className="error">This field is required</span>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="lastname">Last name</label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              ref={register({
                required: true,
              })}
              defaultValue={auth.user.lastname}
            />
            {errors.lastname && (
              <span className="error">This field is required</span>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            ref={register({
              required: true,
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            defaultValue={auth.user.email}
          />
          {errors.email && (
            <span className="error">This field is required</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            ref={register}
            defaultValue={auth.user.address}
          />
        </div>

        <div className="row">
          <div className="col-md-5 mb-3">
            <label htmlFor="gen">What are you ?</label>
            <select
              className="custom-select d-block w-100"
              name="gen"
              ref={register}
              defaultValue={auth.user.gen}
            >
              <option value="" defaultValue>
                Choose...
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="musician">Musician</option>
              <option value="robot">Robot</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="daw">DAW</label>
            <select
              className="custom-select d-block w-100"
              name="daw"
              ref={register}
              defaultValue={auth.user.daw}
            >
              <option value="" defaultValue>
                Choose...
              </option>
              <option value="ableton">Ableton</option>
              <option value="bitwig">Bitwig</option>
              <option value="studio one">Studio one</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              className="form-control"
              name="age"
              ref={register}
              defaultValue={auth.user.age}
            />
          </div>
        </div>

        <hr className="mb-4" />

        <button
          className="btn btn-outline-primary btn-lg btn-block"
          type="submit"
          disabled={disabled}
        >
          Update profile
        </button>
      </form>
      <LoginPopUp
        modal={showModal}
        handleClose={handleClose}
        submitForm={(data) => submitForm(data)}
      />
    </Layout>
  );
};

export default Profile;
