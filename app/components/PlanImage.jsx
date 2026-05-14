"use client";
import { MessagesSquare, Phone } from "lucide-react";
import Image from "next/image";

const PlanImage = ({ selectedProperty }) => {
  if (!selectedProperty) return null;
  const propertyLink = `${window.location.origin}/selectedUnit/${selectedProperty.id}`;
  const message = `I want more details about this property:${propertyLink}`;
  return (
    <div
      className="  flex sm:flex-row  flex-col justify-center items-start 
    max-w-6xl mx-auto  gap-4 mt-8"
    >
      <div className="sm:w-2/3  flex justify-between items-center   ">
        {selectedProperty.plan ? (
          <div className="w-full h-100 flex justify-center items-center relative overflow-hidden  rounded-lg">
            <Image
              src={selectedProperty.plan}
              alt={selectedProperty.title || "Plan Image"}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <p className="text-black">No plan available</p>
        )}
      </div>
      {/* left side */}
      <div className="sm:w-1/3 w-full h-100 p-4 rounded-lg bg-[#F8FAFB] shadow-2xl  ">
        <div className="p-4">
          <div className="text-gray-700 ">
            <p className="text-xl">Listing Price</p>
            <h1 className="font-bold text-2xl text-[#00666D]">
              {selectedProperty.price
                ? `${Number(selectedProperty.price).toLocaleString()} EGP`
                : ""}
            </h1>
          </div>
          <a
            href="tel:+201234567890"
            className="w-full mt-3 text-white bg-[#00666D] flex justify-center items-center gap-4 p-4 rounded-lg hover:bg-amber-600"
            aria-label="Call the agent"
          >
            <span>
              <Phone />
            </span>
            Contact Agent
          </a>
          <a
            aria-label="Inquire about the property via WhatsApp"
            href={`https://wa.me/201128192366?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-3 text-white bg-[#00666D] flex justify-center items-center gap-4 p-4 rounded-lg hover:bg-amber-600 transform transition"
          >
            <span>
              <MessagesSquare />
            </span>
            WhatsApp Inquiry
          </a>

          <div className="flex gap-2 items-center">
            <div>
              <Image
                src="/profile.webp"
                width={64}
                height={64}
                alt="kholoud image"
                className="rounded-full mt-4 object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex items-start justify-center text-start flex-col">
              <h1 className="text-[#191C1D] font-semibold mt-2">
                Kholoud Salah
              </h1>
              <p className="text-[#64748B]">Senior Portfolio Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanImage;
