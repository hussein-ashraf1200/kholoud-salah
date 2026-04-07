"use client";
import Image from "next/image";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/201128192366?text=Hi%20I%20want%20more%20details"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 hover:bg-green-400 text-white p-2 rounded-full shadow-lg transition transform hover:scale-110"
    >
      <Image
        width={10}
        height={10}
        src="/icons/whatsapp.svg"
        alt="facebook"
        className="w-6 h-6 hover:scale-110 transition"
      />
    </a>
  );
};

export default WhatsAppButton;
