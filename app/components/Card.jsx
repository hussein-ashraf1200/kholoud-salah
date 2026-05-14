"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Eye, MapPinHouse } from "lucide-react";
import Link from "next/link";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useSelectedProperty } from "../lib/SelectedPropertyContext";

const Card = () => {
  const [visible, setVisible] = useState(4);
  const [properties, setProperties] = useState([]); // ✅ من Firestore
  const { setSelectedProperty } = useSelectedProperty();

  // ✅ جيب البيانات من Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDocs(collection(db, "realstate"));
        const data = snap.docs.map((d) => {
          const docData = d.data();
          delete docData.id;
          return { id: d.id, ...docData };
        });
        setProperties(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {properties.slice(0, visible).map((property) => (
          <div
            key={property.id}
            className="rounded-xl  shadow-lg hover:shadow-3xl 
            hover:scale-105 transition"
          >
            <div className="relative ">
              <div className="w-full sm:h-52 h-32 rounded-t-xl overflow-hidden">
                <Image
                  src={property.thumb || "/placeholder.png"} // ✅ thumb من Firestore
                  fill
                  alt={property.title || "Property"}
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <Link
                aria-label="Visit selected property details"
                className="text-[#134E4A] cursor-pointer absolute top-2 right-2 p-2 rounded-full bg-[#F8FAFB] hover:bg-[#E0E0E0] transition"
                href={`/selectedUnit/${property.id}`}
                onClick={() => {
                  setSelectedProperty(property);
                }}
              >
                <Eye />
              </Link>
            </div>

            <div className="p-4">
              <p className="text-[#134E4A] font-bold text-2xl mt-2">
                {property.price
                  ? `${Number(property.price).toLocaleString()} EGP`
                  : ""}
              </p>
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
            aria-label="Show more properties"
            onClick={() => setVisible(visible + 12)}
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
