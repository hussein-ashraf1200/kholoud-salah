import React from "react";
import Image from "next/image";

const MainImages = ({ property }) => {
  if (!property) return null;

  const thumb = property.thumb || "/placeholder.png";
  const extras = property.images || [];

  return (
    <div className="flex justify-center items-center p-4 mt-20">
      <div className="flex gap-4 w-full max-w-6xl h-125">
        {/* Left Big Image */}
        <div className="w-2/3 h-full">
          <Image
            width={900}
            height={500}
            alt={property.title || "Main Image"}
            src={thumb}
            className="object-cover rounded-lg w-full h-full"
            loading="lazy"
          />
        </div>

        {/* Right Small Images */}
        <div className="w-1/3 h-full flex flex-col gap-2">
          {extras.length > 0
            ? extras.slice(0, 2).map((url, i) => (
                <div key={i} className="h-1/2">
                  <Image
                    width={400}
                    height={245}
                    alt={`Image ${i + 1}`}
                    src={url}
                    className="object-cover rounded-lg w-full h-full"
                    loading="lazy"
                  />
                </div>
              ))
            : [1, 2].map((i) => (
                <div key={i} className="h-1/2">
                  <Image
                    width={400}
                    height={245}
                    alt={`Image ${i}`}
                    src={thumb}
                    className="object-cover rounded-lg w-full h-full"
                    loading="lazy"
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MainImages;
