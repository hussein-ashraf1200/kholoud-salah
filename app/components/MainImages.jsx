import React from "react";
import Image from "next/image";

const MainImages = ({ property }) => {
  if (!property) return null;

  const thumb = property.thumb || "/placeholder.png";
  const extras = property.images || []; // ✅ الصور الإضافية

  return (
    <div className="flex justify-center items-center p-4 mt-20">
      <div className="flex gap-4 w-full max-w-6xl">
        {/* Left Big Image */}
        <div className="w-2/3 relative ">
          <Image
            width={850}
            height={850}
            alt={property.title || "Main Image"}
            src={thumb}
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {/* Right Small Images */}
        <div className="w-1/3 flex flex-col gap-2">
          {extras.length > 0
            ? // ✅ لو في صور إضافية اعرضها
              extras.slice(0, 2).map((url, i) => (
                <div key={i} className="relative  ">
                  <Image
                    width={400}
                    height={400}
                    alt={`Image ${i + 1}`}
                    src={url}
                    className="object-cover rounded-lg"
                  />
                </div>
              ))
            : // ✅ لو مفيش صور إضافية اعرض الـ thumb
              [1, 2, 3].map((i) => (
                <div key={i} className="relative w-full h-28">
                  <Image
                    fill
                    alt={`Image ${i}`}
                    src={thumb}
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MainImages;
