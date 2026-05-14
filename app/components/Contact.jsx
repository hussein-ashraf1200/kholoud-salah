"use client";
import { Mail, MessageCircleCode, Phone } from "lucide-react";
import React, { useRef } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs

      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        toast.success("Successfully toasted!");
        e.target.reset(); // Reset form after successful submission
      })
      .catch((error) => {
        console.error("Failed to send:", error);
        toast.error("Something went wrong. Please try again.");
      });
    console.log("KEY:", process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
  };

  return (
    <div
      id="contact"
      className="bg-[#134E4A] flex sm:flex-row flex-col gap-10 justify-center items-center p-8 rounded-lg mx-auto my-12"
    >
      {/* right side */}
      <div className="sm:w-1/3 w-full flex flex-col text-[#F5FEFF] p-2">
        <h1 className="text-3xl font-bold mb-4">Let s Discuss Your Future</h1>
        <p>
          Ready to find your next investment or dream home? Reach out today for
          a confidential consultation.
        </p>

        <form ref={form} onSubmit={sendEmail}>
          <div className="mt-2">
            <p>Full name</p>
            <input
              name="from_name"
              className="border-2 p-2 rounded-md w-full"
              placeholder="Khaloud Salah"
              type="text"
              required
            />
          </div>
          <div className="mt-4">
            <p>Email</p>
            <input
              name="from_email"
              placeholder="khaloud.salah@example.com"
              className="border-2 p-2 rounded-md w-full"
              type="email"
              required
            />
          </div>
          <div className="mt-4">
            <p>Message</p>
            <textarea
              name="message"
              placeholder="Your message here..."
              className="border-2 p-2 rounded-md w-full"
              rows="4"
              required
            />
          </div>
          <button
            aria-label="Send inquiry"
            type="submit"
            className="bg-[#F5FEFF] cursor-pointer text-[#134E4A] hover:bg-[#cad8d8] hover:text-[#090b0b] font-bold py-2 px-4 rounded-md mt-4"
          >
            Send inquiry
          </button>
        </form>
      </div>

      {/* left side - مفيش تغيير */}
      <div className="sm:w-1/4 w-full flex flex-col text-[#d6e9eb] p-2 gap-4">
        <h1 className="border-b-[.05rem] p-3">Contact Details</h1>
        <div className="flex gap-4">
          <Phone />
          <p>01128192366</p>
        </div>
        <div className="flex gap-4 items-center">
          <Mail />

          <a
            href="mailto:Kholoud2000.salah@gmail.com"
            className="hover:text-blue-600 transition"
            aria-label="Send an email to Kholoud Salah"
          >
            Kholoud2000.salah@gmail.com
          </a>
        </div>
        <div className="flex gap-4">
          <MessageCircleCode />
          <p>WhatsApp Chat Available</p>
        </div>
        <p className="border-b-[.05rem] p-3">Follow My Journey</p>
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/share/1N4vg2BavC/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Facebook page"
          >
            <Image
              width={20}
              height={20}
              src="/icons/facebook.svg"
              alt="facebook"
              className="w-8 h-8 hover:scale-110 transition"
              loading="lazy"
            />
          </a>
          <a
            href="https://wa.me/201128192366"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our WhatsApp page"
          >
            <Image
              width={20}
              height={20}
              src="/icons/whatsapp.svg"
              alt="whatsapp"
              className="w-8 h-8 hover:scale-110 transition"
              loading="lazy"
            />
          </a>
          <a
            href="https://www.instagram.com/kholoud_salah._?igsh=NnQ5eWtnM2ZlbWwx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Instagram page"
          >
            <Image
              width={20}
              height={20}
              src="/icons/instagram.svg"
              alt="instagram"
              className="w-8 h-8 hover:scale-110 transition"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
