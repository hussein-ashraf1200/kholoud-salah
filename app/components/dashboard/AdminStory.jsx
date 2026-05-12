"use client";

import React, { useEffect, useState, useCallback } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { db } from "../../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const EMPTY_FORM = {
  projectName: "",
  startingPrice: "",
  paymentPlan: "",
  image: null,
  existingThumb: "",
};

const AdminStory = () => {
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState(null);

  // ✅ Fetch
  const fetchData = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, "story"));
      const data = snap.docs.map((d) => {
        const docData = d.data();
        delete docData.id;
        return { id: d.id, ...docData };
      });
      setStories(data);
    } catch (err) {
      toast.error("Failed to load stories.");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const closeModal = () => {
    setOpen(false);
    setEditId(null);
    setForm(EMPTY_FORM);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // ✅ Upload to Cloudinary
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData },
    );
    if (!res.ok) throw new Error("Image upload failed");
    const data = await res.json();
    return data.secure_url;
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.projectName.trim() || !form.startingPrice.trim()) {
      toast.error("Project name and price are required.");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = form.existingThumb;
      if (form.image) imageUrl = await uploadImage(form.image);

      const data = {
        projectName: form.projectName.trim(),
        startingPrice: form.startingPrice.trim(),
        paymentPlan: form.paymentPlan.trim(),
        ...(imageUrl && { image: imageUrl }),
      };

      if (editId) {
        await updateDoc(doc(db, "story", editId), data);
        toast.success("Story updated!");
      } else {
        await addDoc(collection(db, "story"), data);
        toast.success("Story added!");
      }

      closeModal();
      await fetchData();
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit
  const handleEdit = (item) => {
    setForm({
      projectName: item.projectName || "",
      startingPrice: item.startingPrice || "",
      paymentPlan: item.paymentPlan || "",
      image: null,
      existingThumb: item.image || "",
    });
    setEditId(item.id);
    setOpen(true);
  };

  // ✅ Delete
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteDoc(doc(db, "story", deleteId));
      toast.success("Story deleted.");
      setDeleteId(null);
      await fetchData();
    } catch (err) {
      toast.error("Failed to delete.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-xl">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpen(true)}
          className="bg-green-800 text-white px-4 py-2 rounded-xl"
        >
          Add Story
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {stories.map((item) => (
          <div key={item.id} className="border rounded-xl p-3">
            <div className="relative w-full h-40 mb-2">
              <Image
                fill
                alt={item.projectName || "Story"}
                src={item.image || "/placeholder.png"}
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="font-bold text-sm">{item.projectName}</h3>
            <p className="text-sm text-gray-600">{item.startingPrice} EGP</p>
            <p className="text-xs text-gray-400">{item.paymentPlan}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => setDeleteId(item.id)} // ✅
                className="bg-red-500 text-white px-2 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Confirmation Dialog */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl flex flex-col items-center gap-4">
            <div className="bg-red-100 p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800">Delete Story ?</h3>
            <p className="text-sm text-gray-500 text-center">
              Are you sure you want to delete this story? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-xl hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-gray-400 w-96 p-5 rounded-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2"
              aria-label="Close"
            >
              <X />
            </button>

            <form onSubmit={handleSubmit} className="space-y-3">
              {form.existingThumb && !form.image && (
                <div className="text-sm text-gray-700">
                  <p className="mb-1">Current image:</p>
                  <Image
                    src={form.existingThumb}
                    alt="Current"
                    width={100}
                    height={60}
                    className="rounded object-cover"
                  />
                </div>
              )}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full border p-2 "
              />

              <input
                name="projectName"
                value={form.projectName}
                onChange={handleChange}
                placeholder="Project Name *"
                required
                className="w-full border p-2"
              />

              <input
                name="startingPrice"
                value={form.startingPrice}
                onChange={handleChange}
                placeholder="Starting Price *"
                required
                className="w-full border p-2"
              />

              <input
                name="paymentPlan"
                value={form.paymentPlan}
                onChange={handleChange}
                placeholder="Payment Plan (e.g. 75% | 25%)"
                className="w-full border p-2"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white p-2 rounded disabled:opacity-50"
              >
                {loading ? "Saving..." : editId ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStory;
