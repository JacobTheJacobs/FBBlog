import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addPost, clearPost } from "../../../store/actions/index";
import { toast } from "react-toastify";
import Uploader from "./uploader";

class PostForm extends Component {
  state = {
    editor: "",
    editorError: false,
    disable: false,
    initialValues: {
      title: "",
      excerpt: "",
      rating: "",
      public: "",
    },
    img: "https://via.placeholder.com/400",
    imageName: "",
    imageError: "",
  };

  componentWillUnmount() {
    this.props.dispatch(clearPost);
  }

  handleResetForm = (resetForm) => {
    resetForm({});
    this.setState({
      editor: "",
      img: "https://via.placeholder.com/400",
      imageError: false,
      disable: false,
    });
    toast.success("Yeah youre post were saved", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  handleSubmit = (values, resetForm) => {
    let formData = {
      ...values,
      content: this.state.editor,
      img: this.state.imageName,
    };

    this.props.dispatch(addPost(formData, this.props.auth.user)).then(() => {
      this.handleResetForm(resetForm);
    });
  };

  handleImageName = (name, download) => {
    this.setState({
      img: download,
      imageName: name,
    });
  };

  render() {
    const state = this.state;
    return (
      <Formik
        enableReinitialize
        initialValues={state.initialValues}
        validationSchema={Yup.object({
          title: Yup.string().required("The title is required"),
          excerpt: Yup.string().required("You Must Add an excerpt"),
          rating: Yup.string().required("You must add rating"),
          public: Yup.string().required("Is it public or draft?"),
        })}
        onSubmit={(values, { resetForm }) => {
          if (Object.entries(state.editor).length === 0) {
            return this.setState({ editorError: false });
          } else if (state.imageName === "") {
            return this.setState({
              imageError: true,
              editorError: false,
            });
          } else {
            this.setState({
              editorError: false,
              disable: true,
            });
            this.handleSubmit(values, resetForm);
          }
          console.log(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Col md={8}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                  />
                  {errors.title && touched.title ? (
                    <div className="error">{errors.title}</div>
                  ) : null}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Excerpt</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    name="excerpt"
                    value={values.excerpt}
                    onChange={handleChange}
                  />
                  {errors.excerpt && touched.excerpt ? (
                    <div className="error">{errors.excerpt}</div>
                  ) : null}
                </Form.Group>
                <Form.Group>
                  <CKEditor
                    editor={ClassicEditor}
                    data={state.editor}
                    onChange={(event, editor) => {
                      this.setState({
                        editor: editor.getData(),
                      });
                    }}
                  />
                </Form.Group>
                {state.editorError ? (
                  <div className="error">You need to fill this</div>
                ) : null}

                <Form.Group>
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as="select"
                    name="rating"
                    value={values.rating}
                    onChange={handleChange}
                  >
                    <option value="" defaultValue>
                      Choose...
                    </option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </Form.Control>
                  {errors.rating && touched.rating ? (
                    <div className="error">{errors.rating}</div>
                  ) : null}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Public</Form.Label>
                  <Form.Control
                    as="select"
                    name="public"
                    value={values.public}
                    onChange={handleChange}
                  >
                    <option value="" defaultValue>
                      Choose...
                    </option>
                    <option value="1">Public</option>
                    <option value="0">Draft</option>
                  </Form.Control>
                  {errors.public && touched.public ? (
                    <div className="error">{errors.public}</div>
                  ) : null}
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={state.disable}
                >
                  Submit
                </Button>
              </Col>
              <Col>
                <Uploader
                  img={this.state.img}
                  handleImageName={this.handleImageName}
                />
                {state.imageError ? (
                  <div className="error">Add image please </div>
                ) : null}
              </Col>
            </Form.Row>
          </Form>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reviews: state.reviews,
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(PostForm);
