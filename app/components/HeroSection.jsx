"use client";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div
      id="home"
      className="mt-10 sm:mt-24 flex sm:flex-row flex-col  justify-center text-[#191C1D] items-center"
    >
      {/* left side */}
      <div className="sm:w-1/2 w-full flex justify-center  items-center  ">
        <div className="  p-4 rounded-2xl rotate-3 sm:shadow-blue-400 shadow-2xl hover:rotate-0 transition duration-300">
          <Image
            src="/profile.png"
            width={300}
            height={300}
            quality={75} // ← بيقلل الحجم من غير ما يأثر على الجودة
            priority
            loading="eager"
            alt="kholoud image"
            className="-rotate-3 rounded-xl"
          />
        </div>
      </div>
      {/* right side */}
      <div className="sm:w-1/2 w-full ">
        <div>
          <div className="flex items-center    ">
            <h1 className="sm:text-3xl text-2xl font-bold text-primary">
              Helping you to get
              <div className="w-28 h-8">
                <span className="text-[#00666D] font-bold w-full ">
                  <Typewriter
                    className=""
                    words={["Best", "Cheap", "Near", "Perfect"]}
                    loop={0} // 0 for infinite
                    cursor
                    cursorStyle="|"
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </div>
              Property
            </h1>
          </div>
          <p>
            With over a decade of expertise in high-end residential markets,
            Kholoud Salah provides a bespoke advisory service tailored to the
            most discerning clients. Every home tells a story; let us help you
            write your next chapter in luxury.
          </p>
          <div className="flex mt-8 gap-4">
            <a
              href="#units"
              className="w-28 inline-block text-center p-2 rounded-2xl text-white bg-[#00666D] cursor-pointer"
            >
              View Units
            </a>
            <a
              href="https://wa.me/201128192366?text=Hi%20I%20want%20more%20details"
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
