import React, { useEffect,useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { clearPost, getReviewById } from "../../store/actions";
import {useLocation} from 'react-router-dom'
import Sinner from "../../utils/sinner";

const Review = (props) => {
    const {pathname} =   useLocation();
    const [currentReview,setCurrentReview] = useState(null)
  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  //listeng for url update scroll to top
  useEffect(()=>{
    window.scrollTo(0,0)
  },[pathname])


  useEffect(() => {
    dispatch(getReviewById(props.match.params.id)).then((response) => {
        console.log(response.payload)

        setCurrentReview(response.payload)
      //if item id = null go back
      if (!response.payload) {
        props.history.push("/");
      }
    });
  }, [props, dispatch]);

  //unmount
  useEffect(()=>{
    return ()=>{
        dispatch(clearPost())
    }
  },[dispatch])
  

  return (
    <div>
        {console.log(currentReview)}
      <Container className="page">
        {currentReview? (
          <div>
            <Row className="mt-5">
              <Col xs={12} md={8}>
                <small>Posted By: {currentReview.ownerData.name}</small>
                <h1>{currentReview.title}</h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: currentReview.content,
                  }}
                />
           
              </Col>
              <Col xs={6} md={4}>
            <Card>
                <div className="card_image">
                    <Card.Img variant="top"
                    src={currentReview.downloadURL}/>
                    <div className="card_blur"></div>
                </div>
          
            </Card>
           
              </Col>
            </Row>
          </div>
        ) : <Sinner/>}
      </Container>
    </div>
  );
};

export default Review;
