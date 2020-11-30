import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../../utils/layout";
import { Link } from "react-router-dom";
import { getReviews, loadMoreReviews ,deletePost} from "../../../store/actions";

const Reviews = (props) => {
  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
 

  useEffect(() => {
    if(!reviews.adminReviews){
      dispatch(getReviews(2))
    }
    dispatch(getReviews(6));
  }, [dispatch]);

  const deleteThisPost =(postId)=>{
    dispatch(deletePost(postId))
    //window.location.reload();
    setTimeout(
      () => window.location.reload(), 
      2000
    );
  }

  const renderPosts = () =>
    reviews.adminReviews
      ? reviews.adminReviews.posts.map((post, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{post.title}</td>
            <td>{post.rating}</td>
            <td>{post.ownerData.name}</td>
            <td>{post.public === 1 ? "Public" : "Draft"}</td>
            <td>
              <div style={{cursor:'pointer'}} className="table-link-red" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteThisPost(post.id) } }>Delete</div>
            </td>
            <td>
              <Link className="table-link" to={`posts/edit/${post.id}`}>
                Edit
              </Link>
            </td>
          </tr>
        ))
      : null;

  const loadMore = () => {
    dispatch(loadMoreReviews(1, reviews.adminReviews));
    console.log(reviews);
  };
  return (
    <Layout auth={props.auth} title="Posts">
      <div>
        <Link className="btn btn-outline-primary btn-sm" to="posts/add">
          Add new Post
        </Link>
      </div>
      <hr />
      <div className="table-responsive-md">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Rating</th>
              <th scope="col">Owner</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>{renderPosts()}</tbody>
        </table>
      </div>

      <div className="btn btn-primary" onClick={loadMore}>
        Get more
      </div>
    </Layout>
  );
};

export default Reviews;
