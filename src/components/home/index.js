import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../../store/actions";
import { Link } from "react-router-dom";
import CarouselWidget from "../../utils/carousel";
import { Container, Row, Col,Card } from "react-bootstrap";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts(6, null));
  }

  
  renderFeaturePosts = () =>
    this.props.reviews.posts
    
      ? this.props.reviews.posts.map((item, i) => (
          <Col xs={12} sm={4} md={3} lg={2} key={i} className="card col" style={{ width: "38rem",margin:"10px" }}>
           <div>
            <div className="card-body">
              <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
              }}>
<h4 style={{height:'100px'}} className="alert alert-primary"><strong>{item.title}</strong></h4>
              </div>
              
            

              <p style={{height:'70px'}} className="card-text blockquote text-center">{item.excerpt}</p>
              <Link className="blockquote text-right blockquote-footer" to={`/reviews/${item.id}`}>Read More</Link>
            </div>
           </div>
          </Col >
        ))
      : null;

  render() {
    return (
      <>
      <div>
      <CarouselWidget />
      </div>
       
      <Container>
          <Row style={{justifyContent:'center'}}>
           {this.renderFeaturePosts()}
          </Row>
      </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  reviews: state.reviews,
});

export default connect(mapStateToProps)(Home);
