import React, { useState } from "react";
//Import arrow icons
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
//Import dot icons
import { RxDotFilled } from "react-icons/rx";
//Import images
import HuyImage from "./Image/Huy.jpeg";
import BaoImage from "./Image/Bao.jpeg";
import SonImage from "./Image/Son.jpeg";

function ImageCarousel() {
  //constant which store image links
  const images = [HuyImage, BaoImage, SonImage];

  const [currentIndex, setCurrentIndex] = useState(0); //default state is 0

  //This function responsible for changing to previous image. Apply to left arrow
  const prevImage = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  //This function responsibles for changing to next image. Apply to right arrow
  const nextImage = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToImage = (imageIndex) => {
    setCurrentIndex(imageIndex);
  };

  return (
    <div className="h-full max-w-fit m-auto py-10 px-10 relative group">
      {/**Insert images */}
      <div
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
        className="w-64 h-96 rounded-2xl bg-center bg-cover duration-500"
      ></div>
      {/**Left arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-10 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevImage} size={30} />
      </div>
      {/**RIght arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-10 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextImage} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {images.map((image, imageIndex) => (
          <div
            key={imageIndex}
            onClick={() => goToImage(imageIndex)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;
