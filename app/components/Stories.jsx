"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const StoriesSlider = () => {
  const [stories, setStories] = useState([]);
  const [current, setCurrent] = useState(0);
  const duration = 5000;

  // ✅ جيب البيانات من Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDocs(collection(db, "story"));
        const data = snap.docs.map((d) => {
          const docData = d.data();
          delete docData.id;
          return { id: d.id, ...docData };
        });
        setStories(data);
      } catch (err) {
        console.error("Failed to fetch stories:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ الـ slider مش هيشتغل غير لما البيانات تيجي
  useEffect(() => {
    if (stories.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
    }, duration);
    return () => clearInterval(timer);
  }, [stories]);

  // ✅ لو البيانات لسه بتتحمل
  if (stories.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-[60vh]">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  const projectName = stories[current].projectName;

  const message = `I want more details about this project: ${projectName}`;

  return (
    <div className="relative flex flex-col w-screen sm:w-full h-[40vh] sm:h-[60vh]  -mx-4 sm:mx-0 mt-4">
      {/* Image */}
      <Image
        src={stories[current].image || "/placeholder.png"}
        alt={stories[current].projectName}
        fill
        className="object-cover rounded-2xl w-full h-full"
      />

      {/* Title */}
      <h2 className="absolute top-1/2 left-4 sm:left-6 md:left-10 -translate-y-1/2 text-lg sm:text-2xl md:text-3xl w-[70%] sm:w-[50%] md:w-96 font-bold text-white z-10">
        {stories[current].projectName}
      </h2>

      {/* Content */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-4 sm:left-6 md:left-6 right-4 sm:right-auto bg-gray-600/80 backdrop-blur-sm text-white flex items-start sm:items-center gap-4 sm:gap-8 p-3 sm:p-4 rounded-lg z-10">
        <div>
          <h1 className="text-sm sm:text-base">Starting Price</h1>
          <p className="text-base sm:text-lg">
            {stories[current].startingPrice}
          </p>
        </div>

        <div>
          <h1 className="text-sm sm:text-base">Payment Plan</h1>
          <p className="text-xs sm:text-sm opacity-90">
            {stories[current].paymentPlan}
          </p>
        </div>

        <a
          href={`https://wa.me/201128192366?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-400 text-gray-800 rounded-lg flex items-center gap-1 px-3 py-2 hover:bg-gray-200 text-sm sm:text-base"
        >
          Learn More
          <ChevronRight size={18} />
        </a>
      </div>

      {/* Progress Bars */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[80%] sm:w-60 flex gap-2 z-10">
        {stories.map((_, index) => (
          <div
            key={index}
            className="flex-1 h-1 bg-white/30 rounded overflow-hidden"
          >
            <div
              className={`h-full bg-white ${index === current ? "animate-progress" : ""}`}
              style={{
                width:
                  index < current ? "100%" : index === current ? "100%" : "0%",
                animationDuration: `${duration}ms`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesSlider;
