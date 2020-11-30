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
               src="https://camo.githubusercontent.com/91de473fa3f2f749a56effc3e64f1049d108251f/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f632f63332f507974686f6e2d6c6f676f2d6e6f746578742e7376672f37363870782d507974686f6e2d6c6f676f2d6e6f746578742e7376672e706e67"/>
           <Carousel.Caption>
               <h3>First Slide</h3>
           </Carousel.Caption>
            </Carousel.Item>
           
            <Carousel.Item>
                <img className="d-click w-100"
               alt="pic"
               style={{
                   width:'300px',
                   height:'300px'
               }}
               src="https://miro.medium.com/max/720/1*LjR0UrFB2a__5h1DWqzstA.png"/>
                       <Carousel.Caption>
               <h3>Second Slide</h3>
               <p>Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum </p>
           </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselWidget;