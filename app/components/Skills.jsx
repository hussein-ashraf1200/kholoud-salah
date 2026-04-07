import React from "react";
import Stories from "./Stories";
import CustomInfo from "./CustomInfo";

const Skills = () => {
  return (
    <div id="about">
      {/* right side */}
      <div className="flex mt-6 shadow-md rounded-2xl border-2 flex-col sm:flex-row ">
        {/* label */}
        <div className="sm:w-1/2 w-full p-2 mt-4">
          <CustomInfo />
        </div>
        <div className=" w-1/2 p-2 ">
          <Stories />
        </div>
      </div>
    </div>
  );
};

export default Skills;
