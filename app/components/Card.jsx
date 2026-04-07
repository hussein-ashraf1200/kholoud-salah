"use client";
import Image from "next/image";
import React, { useState } from "react";
import { properties } from "../data/propertyData";
import { Eye, MapPinHouse } from "lucide-react";
import Link from "next/link";

const Card = () => {
  const [visible, setVisible] = useState(4);
  return (
    <>
      <div className="grid grid-cols-2   sm:grid-cols-4 gap-6 p-4">
        {properties.slice(0, visible).map((property) => (
          <div
            key={property.id}
            className="rounded-xl overflow-hidden  shadow-lg hover:shadow-3xl hover:scale-105 transition"
          >
            <div className=" relative ">
              <Image
                src={property.images.thumbnail}
                width={800}
                height={800}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <Link
                className="text-[#134E4A] cursor-pointer absolute top-2 right-2 p-2 rounded-full bg-[#F8FAFB] hover:bg-[#E0E0E0] transition"
                href="/selectedUnit"
              >
                <Eye />
              </Link>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-center">
                <p className="text-[#134E4A] font-bold text-2xl mt-2">
                  {property.price}
                </p>
              </div>
              <h3 className="text-lg font-semibold text-[#191C1D]">
                {property.title}
              </h3>
              <h4 className="text-[#3E494A] flex items-center gap-1 mt-1">
                <span className="text-[#134E4A]">
                  <MapPinHouse />
                </span>
                {property.location}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {visible < properties.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisible(visible + 3)}
            className="w-32 p-2 rounded-2xl text-white bg-[#00666D] cursor-pointer hover:opacity-90"
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
};

export default Card;
