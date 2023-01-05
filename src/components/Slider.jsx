import React, { useEffect, useState } from "react";

const Slider = ({ image, id, length, alt }) => {
  let temp = 1;
  const [count, setCount] = useState(temp);
  const handleNext = () => {
    temp = id + 1;
    if (temp >= length) {
      temp = 1;
    }
    setCount(temp);
  };

  const handlePrev = () => {
    temp = id - 1;
    if (temp <= 1) {
      temp = length;
    }
    setCount(temp);
  };

  return (
    <div id={id} className="carousel-item relative w-full rounded-sm">
      <img src={`https://image.tmdb.org/t/p/w500${image}`} className="w-full h-96 object-cover rounded-sm" alt={alt} />
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <button onClick={() => handlePrev()}>
          <a href={`#${count}`} className="btn btn-circle bg-transparent border border-glass">
            ❮
          </a>
        </button>
        <button onClick={() => handleNext()}>
          <a href={`#${count}`} className="btn btn-circle bg-transparent">
            ❯
          </a>
        </button>
      </div>
    </div>
  );
};

export default Slider;
