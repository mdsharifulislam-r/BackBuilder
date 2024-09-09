import React from "react";
import AvarageStar from "../SingleCourseDetails/Reviews/AvarageStar";
import AddToCart from "./AddToCart";
import { Booktype } from "@/lib/Types/Types";

export default function   TextContainer({book}:{book:Booktype}) {

  return (
    <div className="w-full">
      <div className="ratings flex gap-1 place-items-center">
        <AvarageStar ratings={[{ star: "4" }]} />
        <span className="text-slate-600 text-sm">(3)</span>
        <span className="text-slate-600 text-sm">100% Positive Ratings</span>
      </div>
      <h1 className="text-4xl font-bold py-3">{book?.name}</h1>
      <span className="text-slate-500 text-sm font-light">
        By {book?.instructor?.name}
      </span>
      <div className="text-xl font-bold py-3">
        <span className="text-primary"> ${book?.price} </span>
        <span className="text-slate-300 line-through">$23</span>
      </div>
      <p className="text-slate-500 md:text-base text-sm text-justify"> 
{book?.description}
      </p>
    <AddToCart/>
    <div className="div">
      <div>
        <span className="font-bold">Catagories :</span>
        {book?.type}
      </div>
      <div>
        <span className="font-bold">Book For :</span>
        {book?.level}
      </div>
      <div>
        <span className="font-bold">Publish Date :</span>
        {book?.publishDate}
      </div>
    </div>
    </div>
  );
}
