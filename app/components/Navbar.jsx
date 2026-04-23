"use client";
import Image from "next/image";
import { CircleUserRound, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 ">
      {/* desktop */}
      <div className="  sm:flex rounded-2xl hidden justify-between items-center px-8  shadow-xl text-[#475569]">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="logo"
          width={60}
          height={60}
          className="rounded-full"
        />

        {/* Links */}
        <ul className="flex gap-6 items-center">
          <li className="cursor-pointer hover:text-[#115E59] transition">
            <a href="#home">Home</a>
          </li>
          <li className="cursor-pointer hover:text-[#115E59] transition">
            <a href="#units">Units</a>
          </li>
          <li className="cursor-pointer hover:text-[#115E59] transition">
            <a href="#about">About</a>
          </li>
          <li className="cursor-pointer hover:text-[#115E59] transition">
            <a href="#contact">Contact</a>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="cursor-pointer text-[#115E59] hover:scale-110 transition flex items-center"
            >
              <CircleUserRound />
              <span className="ml-1">dashboard</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* small screen */}
      <button
        className="sm:hidden fixed right-4 top-2 text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>
      {isOpen && (
        <div className="sm:hidden flex justify-center  top-10  backdrop-blur-sm shadow-md z-50 fixed w-full items-center flex-col gap-4  p-4 ">
          <div>
            <ul className="flex flex-col  items-center  w-full h-screen text-black gap-4">
              <li className="cursor-pointer hover:text-[#115E59] transition">
                <a onClick={() => setIsOpen(false)} href="#home">
                  Home
                </a>
              </li>
              <li className="cursor-pointer hover:text-[#115E59] transition">
                <a onClick={() => setIsOpen(false)} href="#units">
                  Units
                </a>
              </li>
              <li className="cursor-pointer hover:text-[#115E59] transition">
                <a onClick={() => setIsOpen(false)} href="#about">
                  About
                </a>
              </li>
              <li className="cursor-pointer hover:text-[#115E59] transition">
                <a onClick={() => setIsOpen(false)} href="#contact">
                  Contact
                </a>
              </li>
              <li>
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/dashboard"
                  className="cursor-pointer text-[#115E59] hover:scale-110 transition flex items-center"
                >
                  <CircleUserRound />
                </Link>
              </li>
            </ul>
            <CircleUserRound />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
