import React, { Component } from "react";
import { register } from "../../store/actions";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    name: "demo",
    lastname: "demo",
    email: "demo@demo.com",
    password: "demodemo",

    register: false,
    loading: false,
  };

  handleFormType = () => {
    this.setState((prevState) => ({
      register: !prevState.register,
    }));
  };

  handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const formData = {
      name: this.state.name,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
    };
    if (this.state.register) {
      this.props
        .dispatch(register(formData))
        .then(({ payload }) => this.handleRedirection(payload));
    } else {
      console.log(formData);
    }
  };

  handleRedirection = (result) => {};

  render() {
    let { register, name, lastname, email, password, loading } = this.state;
    let formTitle = register ? "Register" : "Login";
    return (
      <div className="container login-wrapper">
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">{formTitle}</h1>

          {register ? (
            <>
              <input
                type="text"
                id="name"
                name={name}
                className="form-control mb-3"
                placeholder="Your name"
                value={name}
                onChange={this.handleInput}
              />
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="form-control mb-3"
                placeholder="Your lastname"
                value={lastname}
                onChange={this.handleInput}
              />
            </>
          ) : null}

          <input
            type="email"
            id="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email address"
            value={email}
            onChange={this.handleInput}
          />
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={this.handleInput}
          />
          <br />
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            disabled={loading}
          >
            {formTitle}
          </button>
          <div className="mt-3">
            {register ? "Need to sign in" : "Not registered"} click
            <span
              onClick={() => this.handleFormType()}
              className="login_type_btn"
            >
              {" "}
              here{" "}
            </span>
            to {register ? "Log in" : "Sign up"}.
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Login);
