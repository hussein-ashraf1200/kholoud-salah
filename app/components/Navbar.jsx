"use client";
import Image from "next/image";
import { CircleUserRound, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <nav className="fixed top-0 left-0 w-full z-50">

      {/* desktop */}
      <div className="sm:flex hidden justify-between items-center px-8 shadow-xl text-[#475569] rounded-2xl">

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

          <li className="hover:text-[#115E59] transition">
            <Link href="/#home">Home</Link>
          </li>

          <li className="hover:text-[#115E59] transition">
            <Link href="/#units">Units</Link>
          </li>

          <li className="hover:text-[#115E59] transition">
            <Link href="/#about">About</Link>
          </li>

          <li className="hover:text-[#115E59] transition">
            <Link href="/#contact">Contact</Link>
          </li>

          {/* AUTH */}
          <li className="flex items-center gap-3">

            {isSignedIn ? (
              <>
                <Link href="/dashboard">
                  <CircleUserRound className="text-[#115E59] cursor-pointer" />
                </Link>

                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <SignInButton mode="modal">
                <button className="text-[#115E59] flex items-center">
                  <CircleUserRound />
                </button>
              </SignInButton>
            )}

          </li>

        </ul>
      </div>

      {/* mobile button */}
      <button
        className="sm:hidden fixed right-4 top-2 text-black z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* mobile menu */}
      {isOpen && (
        <div className="sm:hidden fixed top-10 w-full h-screen backdrop-blur-sm shadow-md z-40 flex flex-col items-center gap-6 p-6 bg-white">

          <ul className="flex flex-col items-center gap-6 text-black">

            <li>
              <Link onClick={() => setIsOpen(false)} href="/#home">Home</Link>
            </li>

            <li>
              <Link onClick={() => setIsOpen(false)} href="/#units">Units</Link>
            </li>

            <li>
              <Link onClick={() => setIsOpen(false)} href="/#about">About</Link>
            </li>

            <li>
              <Link onClick={() => setIsOpen(false)} href="/#contact">Contact</Link>
            </li>

            {/* AUTH MOBILE */}
            <li className="flex flex-col items-center gap-3">

              {isSignedIn ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <CircleUserRound className="text-[#115E59]" />
                  </Link>

                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                <SignInButton mode="modal">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-[#115E59]"
                  >
                    Login
                  </button>
                </SignInButton>
              )}

            </li>

          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;