"use client";
import { BathIcon, Bed, LampFloor, Ruler, TypeOutline } from "lucide-react";
import Image from "next/image";
import React from "react";

const DetailsAndSed_img = ({ property }) => {
  if (!property) return null;

  const extras = property.images || [];
  // ✅ الصورتين الأوليين في MainImages، الباقي هنا
  const remainingImages = extras.slice(2);

  return (
    <div className="flex justify-center items-center p-2">
      <div className="flex  flex-col-reverse sm:flex-row gap-4 w-full max-w-6xl">
        <div
          className="sm:w-2/3 w-full  shadow-xl bg-gray-200
         p-2 text-black  rounded-lg"
        >
          <h1 className="text-2xl ">{property.title}</h1>
          <p className="text-xl text-[#115E59] font-semibold mt-2">
            {property.price
              ? `${Number(property.price).toLocaleString()} EGP`
              : ""}
          </p>
          <p className="text-xl text-gray-400 underline mt-8">Description :</p>
          <p>{property.description}</p>

          <div className="flex justify-around mt-20">
            <div className="flex justify-center bg-white p-1 rounded-2xl items-center flex-col">
              <span className="text-[#115E59]">
                <Bed />
              </span>
              <p className="hidden sm:flex">BedRooms</p>
              <p className="font-bold">{property.bedroom || "—"}</p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <span className="text-[#115E59]">
                <BathIcon />
              </span>
              <p className="hidden sm:flex">BathRooms</p>
              <p className="font-bold">{property.bathroom || "—"}</p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <span className="text-[#115E59]">
                <Ruler />
              </span>
              <p className="hidden sm:flex">SQM</p>
              <p className="font-bold">{property.sqm || "—"}</p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <span className="text-[#115E59]">
                <LampFloor />
              </span>
              <p className="hidden sm:flex">Floors</p>
              <p className="font-bold">{property.floors || "—"}</p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <span className="text-[#115E59]">
                <TypeOutline />
              </span>
              <p className="hidden sm:flex">Type</p>
              <p className="font-bold">{property.type || "—"}</p>
            </div>
          </div>
        </div>

        {/* ✅ الصور الإضافية من index 2 فصاهلي */}
        <div className="sm:w-1/3 w-full flex flex-col sm:gap-4 gap-4">
          {remainingImages.length > 0 ? (
            remainingImages.slice(0, 2).map((url, i) => (
              <div key={i} className="relative w-full ">
                <Image
                  width={400}
                  height={400}
                  alt={`Image ${i + 2}`}
                  src={url}
                  className="object-cover rounded-lg"
                />
              </div>
            ))
          ) : (
            // ✅ لو مفيش صور إضافية اعرض الـ thumb
            <>
              <div className="relative w-full h-48">
                <Image
                  fill
                  alt="Image 2"
                  src={property.thumb || "/placeholder.png"}
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative w-full h-48">
                <Image
                  fill
                  alt="Image 3"
                  src={property.thumb || "/placeholder.png"}
                  className="object-cover rounded-lg"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsAndSed_img;
