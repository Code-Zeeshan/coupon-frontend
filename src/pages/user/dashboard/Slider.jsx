import React from "react";
import { Carousel } from "@material-tailwind/react";
import image1 from "@/assets/images/1.jpeg";
import image2 from "@/assets/images/2.jpeg";
import image3 from "@/assets/images/3.jpeg";

export function Slider() {
  return (
    <Carousel className="rounded-xl" autoplay={true} autoplayDelay={3000} loop={true}>
      <img src={image1} alt="image 1" className="h-full w-full object-cover" />
      <img src={image2} alt="image 2" className="h-full w-full object-cover" />
      <img src={image3} alt="image 3" className="h-full w-full object-cover" />
    </Carousel>
  );
}
