import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../../store/actions";
import { Link } from "react-router-dom";
import CarouselWidget from "../../utils/carousel";
class Home extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts(6, null));
  }

  renderFeaturePosts = () =>
    this.props.reviews.posts
      ? this.props.reviews.posts.map((item, i) => (
          <div key={i} className="card col" style={{ width: "28rem",margin:"10px" }}>
            <div className="card-body">
              <h6 className="alert alert-primary">{item.title}</h6>
              <p className="card-text">{item.excerpt}</p>
              <Link to={`/reviews/${item.id}`}>Read More</Link>
            </div>
          </div>
        ))
      : null;

  render() {
    return (
      <>
      <div>
      <CarouselWidget />
      </div>
       
        <div className="container">
   
            <div className="row">{this.renderFeaturePosts()}

          </div> 
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  reviews: state.reviews,
});

export default connect(mapStateToProps)(Home);
