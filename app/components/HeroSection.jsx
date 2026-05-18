import Image from "next/image";
import React from "react";
import TypewriterText from "./TypewriterText";

const HeroSection = () => {
  return (
    <div
      id="home"
      className="mt-10 sm:mt-24 flex sm:flex-row flex-col  justify-center text-[#191C1D] items-center"
    >
      {/* left side */}
      <div className="sm:w-1/2 w-full flex justify-center  items-center  ">
        <div
          className="   rounded-2xl  sm:shadow-blue-400 shadow-2xl 
         transition duration-300   "
        >
          <Image
            src="/profile.webp"
            width={300}
            height={300}
            alt="kholoud image"
            className=" rounded-2xl  object-cover"
            priority
            fetchPriority="high"
          />
        </div>
      </div>
      {/* right side */}
      <div className="sm:w-1/2 w-full ">
        <div>
          <div className="flex items-center">
            <h1 className="sm:text-3xl text-2xl font-bold text-primary">
              Helping you to get
              <div className="w-28 h-8 ">
                <TypewriterText />
              </div>
              Property
            </h1>
          </div>
          <p>
            With over a 5 years of expertise in high-end residential markets,
            Kholoud Salah provides a bespoke advisory service tailored to the
            most discerning clients. Every home tells a story; let us help you
            write your next chapter in luxury.
          </p>
          <div className="flex mt-8 gap-4">
            <a
              aria-label="View available units"
              href="#units"
              className="w-28 inline-block text-center p-2 rounded-2xl text-white bg-[#00666D] cursor-pointer"
            >
              View Units
            </a>
            <a
              aria-label="Consult now"
              href="https://wa.me/201128192366?text=I%20want%20a%20real%20estate%20consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="w-28 inline-block text-center p-2 rounded-2xl text-white bg-[#00666D] cursor-pointer"
            >
              Consult Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
