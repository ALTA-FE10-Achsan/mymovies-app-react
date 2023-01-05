import React from "react";

function Card({ image, tombol, title, onNavigate, onClick, labeHtml }) {
  return (
    <label htmlFor={labeHtml} className="m-1 transition lg:hover:scale-110 lg:hover:z-20 ">
      <div className=" cursor-pointer  dark:bg-blackOne card bg-base-100 shadow-xl h-full ">
        <figure className="w-full h-full flex justify-center" onClick={onNavigate}>
          <img className="h-full w-auto" src={image ? `https://image.tmdb.org/t/p/w500${image}` : "https://via.placeholder.com/11"} alt={image} />
        </figure>
        <div>
          <div className="h-14 p-1 w-full flex justify-center items-center" onClick={onNavigate}>
            <h1 className="font-semibold text-center dark:text-white lg:text-base md:text-base text-sm uppercase">{title}</h1>
          </div>
          <div className="card-actions justify-center items-center p-1">
            <button className="btn card w-full lg:text-base md:text-base text-sm" onClick={onClick}>
              {tombol}
            </button>
          </div>
        </div>
      </div>
    </label>
  );
}

export default Card;
