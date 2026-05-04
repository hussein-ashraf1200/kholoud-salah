"use client";
import React from "react";
import { useSelectedProperty } from "../lib/SelectedPropertyContext";

export const Maps = () => {
  const { selectedProperty } = useSelectedProperty();

  if (!selectedProperty) return null;

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">

      <iframe
        className="w-full h-full border-0 p-2 rounded-lg shadow-lg"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${selectedProperty.coordinations}&output=embed`}
      ></iframe>
    </div>
  );
};

export default Maps;
