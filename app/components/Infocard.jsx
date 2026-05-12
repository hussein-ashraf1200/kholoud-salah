"use client";
import { CircleDollarSign, LucideHome, Smile } from "lucide-react";
import Counter from "./Counter";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const Infocard = () => {
  const [stats, setStats] = useState({
    soldUnits: 150,
    investment: 300,
    happyClients: 150,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const snap = await getDoc(doc(db, "stats", "main"));
        if (snap.exists()) setStats(snap.data());
      } catch (err) {
        console.error("Failed to load stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className=" grid grid-cols-3">
      {/* Units */}
      <div className="bg-[#ECEEEF] rounded-2xl shadow-2xl w-24 sm:w-30 p-1 flex flex-col justify-center items-center">
        <LucideHome className="text-[#00666D] mb-1" />
        <p className="text-xl font-bold text-[#00666D]">
          <Counter to={stats.soldUnits} suffix="+" />
        </p>
        <h1 className="text-xs sm:text-sm">SOLD UNITS</h1>
      </div>

      {/* Investment */}
      <div className="bg-[#ECEEEF] rounded-2xl shadow-2xl w-24 sm:w-30 p-1 flex flex-col justify-center items-center">
        <CircleDollarSign className="text-[#00666D] mb-1" />
        <p className="text-xl font-bold text-[#00666D]">
          <Counter to={stats.investment} suffix="M+" />
        </p>
        <h1 className="text-xs sm:text-sm">Investment</h1>
      </div>

      {/* Clients */}
      <div className="bg-[#ECEEEF] rounded-2xl shadow-2xl w-24 sm:w-30 p-1 flex flex-col justify-center items-center">
        <Smile className="text-[#00666D] mb-1" />
        <p className="text-xl font-bold text-[#00666D]">
          <Counter to={stats.happyClients} suffix="+" />
        </p>
        <h1 className="text-xs sm:text-sm">Happy Clients</h1>
      </div>
    </div>
  );
};

export default Infocard;
