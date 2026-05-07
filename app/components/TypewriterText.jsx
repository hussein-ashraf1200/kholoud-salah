"use client";
import { Typewriter } from "react-simple-typewriter";

const TypewriterText = () => {
  return (
    <span className="text-[#00666D] font-bold w-full">
      <Typewriter
        words={["Best", "Cheap", "Near", "Perfect"]}
        loop={0}
        cursor
        cursorStyle="|"
        typeSpeed={100}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </span>
  );
};

export default TypewriterText;
