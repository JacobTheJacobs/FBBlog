import React from "react";
import Carousel from "react-bootstrap/Carousel";

const CarouselWidget = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-click w-100"
          alt="pic"
          style={{
            width: "300px",
            height: "300px",
          }}
          src="https://www.publicdomainpictures.net/pictures/210000/velka/yellow-wood-texture-wallpaper.jpg"
        />
        <Carousel.Caption>
          <h3>Motivation</h3>
          <p>
            Any fool can write code that a computer can understand. Good
            programmers write code that humans can understand.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-click w-100"
          alt="pic"
          style={{
            width: "300px",
            height: "300px",
          }}
          src="https://i.pinimg.com/originals/66/83/35/668335b6676cabfdc23ad9c9428c400a.jpg"
        />
        <Carousel.Caption>
          <h3>Keep Going</h3>
          <p>
            First learn computer science and all the theory. Next develop a
            programming style. Then forget all that and just hack
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselWidget;
