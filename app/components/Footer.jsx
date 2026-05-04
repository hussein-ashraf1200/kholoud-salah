import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className=" p-2 bg-[#F8FAFB]  text-[#475569] gap-3.5  flex-col sm:flex-row flex justify-around items-center">
      <Image src="/logo.png" alt="Logo" width={50} height={50} className="" />
      <div className="flex flex-col sm:flex-row">
        <ul className="flex justify-center gap-4 ">
          <li className=" cursor-pointer hover:text-[#115E59] ">
            Privacy Policy
          </li>
          <li className=" cursor-pointer hover:text-[#115E59] ">
            Terms of Service
          </li>
          <li className=" cursor-pointer hover:text-[#115E59] ">
            Cookie Policy
          </li>
        </ul>
      </div>
      <p>&copy; 2026 Kholoud Salah. All rights reserved.</p>
    </div>
  );
};

export default Footer;
