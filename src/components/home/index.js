import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../../store/actions";
import { Link } from "react-router-dom";
import CarouselWidget from "../../utils/carousel";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroupItem,
  ListGroup,
  Header,
} from "react-bootstrap";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts(6, null));
  }

  renderFeaturePosts = () =>
    this.props.reviews.posts
      ? this.props.reviews.posts.map((item, i) => (
          <Col
            xs={12}
            sm={4}
            md={3}
            lg={2}
            key={i}
            className="card col"
            style={{ margin: "10px", padding: "0px" }}
          >
            <Card>
              <div>
                <div className="card-body">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "80px",
                    }}
                  >
                    <Card.Header as="h4">{item.title}</Card.Header>
                  </div>

                  <p
                    style={{ height: "70px" }}
                    className="card-text blockquote text-center"
                  >
                    {item.excerpt}
                  </p>
                  <Link
                    className="btn btn-outline-danger btn-lg btn-block"
                    to={`/reviews/${item.id}`}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </Card>
          </Col>
        ))
      : null;

  render() {
    return (
      <>
        <br></br>

        <br></br>
        <h1 style={{ textAlign: "center" }}>My Projects</h1>
        <Container>
          <div
            className="card"
            style={{
              backgroundImage:
                'url("https://www.citationmachine.net/wp-content/uploads/2019/07/Top-5-Tips-for-a-Successful-Study-Session-CitationMachine-blog-e1522941843154.jpg")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <Row style={{ justifyContent: "center" }}>
              {this.renderFeaturePosts()}
            </Row>
          </div>
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  reviews: state.reviews,
});

export default connect(mapStateToProps)(Home);
