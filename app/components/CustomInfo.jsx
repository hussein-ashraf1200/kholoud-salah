import React from "react";
import Infocard from "./Infocard";

const CustomInfo = () => {
  return (
    <div className="text-gray-700 p-2 ">
      <div className="">
        <h1 className="text-xl border-b-[.05rem] w-fit font-bold">
          Crafting Legacies, Not Just Listings ....
        </h1>
        <p className="mt-4">
          Kholoud Salah is recognized for her impeccable taste and relentless
          commitment to client satisfaction. With a background in architecture
          and finance, she offers a unique perspective that bridges the gap
          between aesthetic value and investment potential.
        </p>
      </div>
      <div className="mt-4">
        <Infocard />
      </div>
    </div>
  );
};

export default CustomInfo;
