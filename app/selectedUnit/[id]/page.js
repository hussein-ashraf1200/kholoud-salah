"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import MainImages from "../../components/MainImages";
import DetailsAndSed_img from "../../components/DetailsAndSed_img";
import PlanImage from "@/app/components/PlanImage";
import Maps from "@/app/components/Maps";

export default function SelectedUnit() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const snap = await getDoc(doc(db, "realstate", id));
        if (snap.exists()) {
          setProperty({ id: snap.id, ...snap.data() });
        }
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400">Loading...</p>
      </div>
    );

  if (!property)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400">Property not found.</p>
      </div>
    );

  return (
    <div className="rounded-lg h-fit   bg-[#F8FAFB]">
      <MainImages property={property} />
      <DetailsAndSed_img property={property} />
      <PlanImage selectedProperty={property} />
      <Maps/>
    
    </div>
  );
}
