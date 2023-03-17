import React from "react";
import Featured from "./Featured";
import Star from "./Star";

const Book = ({ book }) => {
  const { name, author, thumbnail, price, rating, featured, id } = book;
  return (
    <div className="book-card">
      <img
        className="h-[240px] w-[170px] object-cover"
        src={thumbnail}
        alt="book"
      />
      <div className="flex-1 h-full pr-2 pt-2 flex flex-col">
        <Featured featured={featured} id={id} />

        <div className="space-y-2 mt-4 h-full">
          <h4 className="lws-book-name">{name}</h4>
          <p className="lws-author">{author}</p>
          <div className="lws-stars">
            {Array.from({ length: rating }).map((element, index) => (
              <Star element={element} key={index} />
            ))}
          </div>
          <p className="lws-price">BDT {price}</p>
        </div>
      </div>
    </div>
  );
};

export default Book;
