import { CircleDollarSign, LucideHome, Smile } from "lucide-react";
import Counter from "./Counter";

const Infocard = () => {
  return (
    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
      {/* Units */}
      <div className="bg-[#ECEEEF] rounded-2xl shadow-2xl w-28 sm:w-30 p-3 flex flex-col justify-center items-center">
        <LucideHome className="text-[#00666D] mb-1" />
        <p className="text-xl font-bold text-[#00666D]">
          <Counter to={150} suffix="+" />
        </p>
        <h1 className="text-xs sm:text-sm">SOLD UNITS</h1>
      </div>

      {/* Investment */}
      <div className="bg-[#ECEEEF] rounded-2xl shadow-2xl w-28 sm:w-30 p-3 flex flex-col justify-center items-center">
        <CircleDollarSign className="text-[#00666D] mb-1" />
        <p className="text-xl font-bold text-[#00666D]">
          <Counter to={300} suffix="M+" />
        </p>
        <h1 className="text-xs sm:text-sm">Investment</h1>
      </div>

      {/* Clients */}
      <div className="bg-[#ECEEEF] rounded-2xl shadow-2xl w-28 sm:w-30 p-3 flex flex-col justify-center items-center">
        <Smile className="text-[#00666D] mb-1" />
        <p className="text-xl font-bold text-[#00666D]">
          <Counter to={150} suffix="+" />
        </p>
        <h1 className="text-xs sm:text-sm">Happy Clients</h1>
      </div>
    </div>
  );
};

export default Infocard;
