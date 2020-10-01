import React, { Component } from "react";
import Layout from "../../../utils/layout";
import PostForm from "./form";

class AddEditPost extends Component {
  render() {
    const props = this.props;
    return (
      <Layout auth={props.auth} title="Article">
        <PostForm id={props.match.params.id} history={props.history} />
      </Layout>
    );
  }
}

export default AddEditPost;
