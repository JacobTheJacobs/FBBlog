import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/home";
import Contact from "./components/contact";
import Login from "./components/login";
import ToastsComponent from "./utils/toasts";
import { connect } from "react-redux";
import { autoSignIn, logout } from "./store/actions/index";
import Dashboard from "./components/dashboard/index";
import AuthHOC from "./components/HOC/authHOC";
import Reviews from "./components/dashboard/reviews";
import Profile from "./components/dashboard/profile";
import AddEditPost from "./components/dashboard/reviews/add_edit";
import Review from "./components/posts";

class Routes extends Component {
  componentDidMount() {
    this.props.dispatch(autoSignIn());
  }

  handleLogout = () => {
    this.props.dispatch(logout());
  };

  app = (auth) => (
    <BrowserRouter>
      <Header auth={auth} logout={this.handleLogout} />
      <Switch>
      
      <Route path="/dashboard/posts/edit/:id" component={AuthHOC(AddEditPost,true)} />
        <Route path="/dashboard/posts/add" component={AuthHOC(AddEditPost,true)} />
        <Route path="/dashboard/profile" component={AuthHOC(Profile)} />
        <Route path="/dashboard/posts" component={AuthHOC(Reviews, true)} />
        <Route path="/dashboard" component={AuthHOC(Dashboard)} />
        <Route path="/login" component={Login} />
        <Route path="/contact" component={Contact} />
        <Route path="/reviews/:id" component={Review} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
      <ToastsComponent />
    </BrowserRouter>
  );

  render() {
    const { auth } = this.props;
    return auth.checkingAuth ? this.app(auth) : "...loading";
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Routes);
