import React from "react";
import Image from "next/image";

const MainImages = () => {
  return (
    <div>
      {/*  first countner*/}
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center h-screen">
          <Image
            fill
            alt={item.projectName || "Story"}
            src={item.image || "/placeholder.png"}
            className="object-cover rounded-lg"
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MainImages;
