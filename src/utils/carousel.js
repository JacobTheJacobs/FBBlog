import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

const CarouselWidget = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img className="d-click w-100"
               alt="pic"
               style={{
                   width:'300px',
                   height:'300px'
               }}
               src="https://www.gqrgm.com/wp-content/uploads/2019/09/2.-Blog-Banner-Template.jpg"/>
           <Carousel.Caption>
               <h3>Motivation</h3>
               <p>Learning to write programs stretches your mind, and helps you think better, creates a way of thinking about things that I think is helpful in all domains.</p>
           </Carousel.Caption>
            </Carousel.Item>
           
            <Carousel.Item>
                <img className="d-click w-100"
               alt="pic"
               style={{
                   width:'300px',
                   height:'300px'
               }}
               src="https://shlomi.ort.org.il/wp-content/uploads/2018/10/math.jpg"/>
                       <Carousel.Caption>
               <h3>Keep Going</h3>
               <p>I quickly came to understand that code is a superpower every young woman should be able to access. Understanding that code is the underlying (and invisible) framework of tech means that we do not have to be passive bystanders in our ever-changing digital world.</p>
           </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselWidget;