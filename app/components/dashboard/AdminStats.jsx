"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { db } from "../../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AdminStats = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    soldUnits: "",
    investment: "",
    happyClients: "",
  });

  //  جيب البيانات
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, "stats", "main"));
        if (snap.exists()) setForm(snap.data());
      } catch (err) {
        toast.error("Failed to load stats.");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //  Save
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, "stats", "main"), {
        soldUnits: Number(form.soldUnits),
        investment: Number(form.investment),
        happyClients: Number(form.happyClients),
      });
      toast.success("Stats updated!");
    } catch (err) {
      toast.error("Failed to update stats.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-400 rounded-xl">
      <h2 className="font-bold text-lg mb-4">Edit Stats</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Sold Units</label>
          <input
            name="soldUnits"
            type="number"
            value={form.soldUnits}
            onChange={handleChange}
            className="border p-2 rounded w-40"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Investment (M)</label>
          <input
            name="investment"
            type="number"
            value={form.investment}
            onChange={handleChange}
            className="border p-2 rounded w-40"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Happy Clients</label>
          <input
            name="happyClients"
            type="number"
            value={form.happyClients}
            onChange={handleChange}
            className="border p-2 rounded w-40"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="self-end bg-green-800 text-white px-4 py-2 rounded-xl disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AdminStats;