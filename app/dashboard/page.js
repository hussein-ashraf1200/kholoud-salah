"use client";
import { useState } from "react";
import RealStateUnits from "../components/dashboard/RealStateUnits";
import SkillsDetails from "../components/dashboard/SkillsDetails";
import StoryContent from "../components/dashboard/StoryContent";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("best");

  return (
    <div className="flex flex-col p-8  bg-[#F8FAFB]">
      {/* Header */}
      <div className="mt-10">
        <h1 className="text-gray-600 sm:text-3xl  font-bold">
          Product & Content Management
        </h1>
        <h2 className="text-gray-600 sm:text-xl">
          Manage your best sales, new collections, and promotional reels.
        </h2>
      </div>

      {/* Tabs */}
      <div className="mt-6 sm:flex sm:justify-center  sm:items-center grid  gap-4  grid-cols-1 ">
        <button
          className={`p-2 rounded-full w-34 sm:w-40 cursor-pointer  ${activeTab === "best" ? "bg-[#115E59] text-white" : "bg-gray-400 text-gray-900"}`}
          onClick={() => setActiveTab("best")}
        >
          Real State Units
        </button>

        <button
          className={`p-2 rounded-full w-34 sm:w-40 cursor-pointer ${activeTab === "new" ? "bg-[#115E59] text-white" : "bg-gray-400 text-gray-900"}`}
          onClick={() => setActiveTab("new")}
        >
          Story Details
        </button>

        <button
          className={`p-2 rounded-full w-34 sm:w-40 cursor-pointer ${activeTab === "reels" ? "bg-[#115E59] text-white" : "bg-gray-400 text-gray-900"}`}
          onClick={() => setActiveTab("reels")}
        >
          Skills
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "best" && (
          <div>
            <RealStateUnits />
          </div>
        )}
        {activeTab === "new" && (
          <div>
            <SkillsDetails />
          </div>
        )}
        {activeTab === "reels" && (
          <div>
            <StoryContent />
          </div>
        )}
      </div>
    </div>
  );
}
