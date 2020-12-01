import React from 'react';
import {Link } from 'react-router-dom'

const NotFoundPage = () => {
    const goBack=()=>{
        this.props.history.goBack();
    }
    return (
        <div>
            <div id="background"></div>
<div class="top">
  <h1>404</h1>
  <h3>page not found</h3>
</div>
<div class="container">
  <div class="ghost-copy">
    <div class="one"></div>
    <div class="two"></div>
    <div class="three"></div>
    <div class="four"></div>
  </div>
  <div class="ghost">
    <div class="face">
      <div class="eye"></div>
      <div class="eye-right"></div>
      <div class="mouth"></div>
    </div>
  </div>
  <div class="shadow"></div>
</div>
<div class="bottom">

  <div class="buttons">
    <Link onClick={goBack()}>Back</Link>
    <Link to="/">Home</Link>
  </div>
</div>

        </div>
    );
};

export default NotFoundPage;