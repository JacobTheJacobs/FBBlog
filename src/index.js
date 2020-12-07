import ReactDOM from "react-dom";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { useSelector, useDispatch } from "react-redux";
import ReduxStore from "./store/index";
import { Provider } from "react-redux";
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
import NotFoundPage from "./components/HOC/404";

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

const Routes = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoSignIn());
  }, [auth]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const app = (auth) => (
    <BrowserRouter>
      <Header auth={auth} logout={handleLogout} />
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
      <Switch>
        <Route
          path="/dashboard/posts/edit/:id"
          component={AuthHOC(AddEditPost, true)}
        />
        <Route
          path="/dashboard/posts/add"
          component={AuthHOC(AddEditPost, true)}
        />
        <Route path="/dashboard/profile" component={AuthHOC(Profile)} />
        <Route path="/dashboard/posts" component={AuthHOC(Reviews, true)} />
        <Route path="/dashboard" component={AuthHOC(Dashboard)} />
        <Route path="/login" component={Login} />
        <Route path="/contact" component={Contact} />
        <Route path="/reviews/:id" component={Review} />
        <Route path="/" component={Home} />
        <Route path="**" component={NotFoundPage} />
      </Switch>
      <Footer />
      <ToastsComponent />
    </BrowserRouter>
  );
  return auth.checkingAuth ? app(auth) : "...loading";
};

ReactDOM.render(
  <>
    <Provider store={ReduxStore()}>
      <Routes />
    </Provider>
  </>,
  document.getElementById("root")
);
