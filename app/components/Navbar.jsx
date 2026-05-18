"use client";
import Image from "next/image";
import { CircleUserRound, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* desktop */}
      <div className="sm:flex hidden justify-between items-center px-8 shadow-xl text-[#475569] rounded-2xl">
        {/* Logo */}

        <Link href="/" aria-label="Kholoud Salah Real Estate - Go to homepage">
          <Image
            src="/logo.webp"
            alt="logo"
            quality={75} // ← بيقلل الحجم من غير ما يأثر على الجودة
            priority
            width={60}
            height={60}
            className="rounded-full"
            aria-hidden="true"
          />
        </Link>

        {/* Links */}
        <ul className="flex gap-6 items-center bg-gray-100 font-bold">
          <li className="hover:text-[#115E59] transition">
            <Link aria-label="go to home" href="/#home">
              Home
            </Link>
          </li>

          <li className="hover:text-[#115E59] transition">
            <Link aria-label="go to units" href="/#units">
              Units
            </Link>
          </li>

          <li className="hover:text-[#115E59] transition">
            <Link aria-label="go to about" href="/#about">
              About
            </Link>
          </li>

          <li className="hover:text-[#115E59] transition">
            <Link aria-label="go to contact" href="/#contact">
              Contact
            </Link>
          </li>

          {/* AUTH */}
          <li className="flex items-center gap-3">
            {isSignedIn ? (
              <>
                {/* بيظهر بس لو admin */}
                {isAdmin && (
                  <Link aria-label="Go to admin dashboard" href="/dashboard">
                    <CircleUserRound
                      aria-hidden="true"
                      className="text-[#115E59] cursor-pointer"
                    />
                  </Link>
                )}
                <UserButton />
              </>
            ) : (
              <SignInButton mode="modal">
                <button
                  aria-label="Sign in to your account"
                  className="text-[#115E59] flex items-center"
                >
                  <CircleUserRound aria-hidden="true" />
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
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {/* mobile menu */}
      {isOpen && (
        <div
          className="sm:hidden fixed top-10 w-full h-screen backdrop-blur-sm 
        shadow-md z-40 flex flex-col items-center gap-6 p-6 
        "
        >
          <ul className="flex flex-col items-center font-bold gap-6 text-black">
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href="/#home"
                aria-label="Go to Home section"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href="/#units"
                aria-label="Go to Units section"
              >
                Units
              </Link>
            </li>

            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href="/#about"
                aria-label="Go to About section"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href="/#contact"
                aria-label="Go to Contact section"
              >
                Contact
              </Link>
            </li>

            {/* AUTH MOBILE */}
            <li className="flex flex-col items-center gap-3">
              {isSignedIn ? (
                <>
                  {/* بيظهر بس لو admin */}
                  {isAdmin && (
                    <Link
                      aria-label="Go to admin dashboard"
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                    >
                      <CircleUserRound className="text-[#115E59]" />
                    </Link>
                  )}
                  <UserButton />
                </>
              ) : (
                <SignInButton mode="modal">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-[#115E59]"
                    aria-label="Sign in"
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
