"use client";

import React, { useEffect, useState, useCallback } from "react";
import { X, Trash, SquarePen } from "lucide-react";
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
  title: "",
  description: "",
  price: "",
  location: "",
  bedroom: "",
  bathroom: "",
  sqm: "",
  floors: "",
  type: "",
  coordinations: "",
  image: null,
  extraImages: [],
  plan: null,
  existingThumb: "",
  existingImages: [],
  existingPlan: "",
};

const AdminCard = () => {
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState(null);

  // ✅ Fetch Data
  const fetchData = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, "realstate"));
      const data = snap.docs.map((d) => {
        const docData = d.data();
        delete docData.id;
        return { id: d.id, ...docData };
      });
      setProperties(data);
    } catch (err) {
      toast.error("Failed to load properties.");
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

  // ✅ Handle Input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "extraImages") {
      const selected = Array.from(files);
      if (selected.length > 5) {
        toast.error("Maximum 5 images only!");
        return;
      }
      setForm((prev) => ({ ...prev, extraImages: selected }));
    } else {
      setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    }
  };

  // ✅ Upload Image to Cloudinary
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
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.secure_url;
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.location) {
      toast.error("Title, price, and location are required.");
      return;
    }
    setLoading(true);
    try {
      let thumbUrl = form.existingThumb;
      if (form.image) thumbUrl = await uploadImage(form.image);

      let planUrl = form.existingPlan;
      if (form.plan) planUrl = await uploadImage(form.plan);

      // ✅ رفع الصور الإضافية
      let extraImagesUrls = form.existingImages;
      if (form.extraImages.length > 0) {
        const uploads = await Promise.all(
          form.extraImages.map((file) => uploadImage(file)),
        );
        extraImagesUrls = uploads;
      }

      const data = {
        title: form.title.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        location: form.location.trim(),
        bedroom: form.bedroom,
        bathroom: form.bathroom,
        sqm: form.sqm,
        floors: form.floors,
        type: form.type.trim(),
        coordinations: form.coordinations.trim(),
        ...(thumbUrl && { thumb: thumbUrl }),
        ...(extraImagesUrls.length > 0 && { images: extraImagesUrls }),
        ...(planUrl && { plan: planUrl }),
      };

      if (editId) {
        await updateDoc(doc(db, "realstate", editId), data);
        toast.success("Updated successfully");
      } else {
        await addDoc(collection(db, "realstate"), data);
        toast.success("Added successfully");
      }

      closeModal();
      fetchData();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit
  const handleEdit = (item) => {
    setForm({
      title: item.title || "",
      description: item.description || "",
      price: item.price || "",
      location: item.location || "",
      bedroom: item.bedroom || "",
      bathroom: item.bathroom || "",
      sqm: item.sqm || "",
      floors: item.floors || "",
      type: item.type || "",
      coordinations: item.coordinations || "",
      image: null,
      extraImages: [],
      plan: null,
      existingThumb: item.thumb || "",
      existingImages: item.images || [],
      existingPlan: item.plan || "",
    });
    setEditId(item.id);
    setOpen(true);
  };

  // ✅ Delete
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteDoc(doc(db, "realstate", deleteId));
      toast.success("Deleted successfully");
      setDeleteId(null);
      fetchData();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-xl">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpen(true)}
          className="bg-green-800 text-white px-4 py-2 rounded-xl"
        >
          Add Property
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {properties.map((item) => (
          <div key={item.id} className="border rounded-xl p-2">
            <div className="relative w-full h-40 mb-2">
              <Image
                fill
                alt={item.title || "Property image"}
                src={item.thumb || "/placeholder.png"}
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="font-bold text-gray-700">{item.title}</h3>
            <p className="text-gray-700">
              {item.price ? `${Number(item.price).toLocaleString()} EGP` : ""}
            </p>
            <p className="text-sm text-gray-700">{item.location}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-500 text-sm rounded"
              >
                <SquarePen />
              </button>
              <button
                onClick={() => setDeleteId(item.id)}
                className="text-red-500 text-sm rounded"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Dialog */}
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
            <h3 className="text-lg font-bold text-gray-800">
              Delete Property?
            </h3>
            <p className="text-sm text-gray-500 text-center">
              This action cannot be undone.
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
          <div className="bg-gray-400 w-96 p-5 rounded-xl relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2"
              aria-label="Close modal"
            >
              <X />
            </button>

            <form onSubmit={handleSubmit} className="space-y-3 mt-6">
              {/* Thumb Preview */}
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
              <label className="text-sm text-gray-700">
                Property Image (Main)
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />

              {/* Extra Images Preview */}
              {form.existingImages.length > 0 &&
                form.extraImages.length === 0 && (
                  <div className="text-sm text-gray-700">
                    <p className="mb-1">Current extra images:</p>
                    <div className="flex gap-2 flex-wrap">
                      {form.existingImages.map((url, i) => (
                        <Image
                          key={i}
                          src={url}
                          alt={`img ${i}`}
                          width={60}
                          height={60}
                          className="rounded object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}
              <label className="text-sm text-gray-700">
                Extra Images (اختار أكتر من صورة)
              </label>
              <input
                type="file"
                name="extraImages"
                accept="image/*"
                multiple
                onChange={handleChange}
              />
              {form.extraImages.length > 3 && (
                <p className="text-red-600 text-sm">Maximum 3 images only!</p>
              )}

              {/* Plan Preview */}
              {form.existingPlan && !form.plan && (
                <div className="text-sm text-gray-700">
                  <p className="mb-1">Current plan:</p>
                  <Image
                    src={form.existingPlan}
                    alt="Plan"
                    width={100}
                    height={60}
                    className="rounded object-cover"
                  />
                </div>
              )}
              <label className="text-sm text-gray-700">Floor Plan Image</label>
              <input
                type="file"
                name="plan"
                accept="image/*"
                onChange={handleChange}
              />

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title *"
                required
                className="w-full border p-2"
              />
              <input
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="Price *"
                required
                className="w-full border p-2"
              />
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location *"
                required
                className="w-full border p-2"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border p-2"
              />
              <input
                name="bedroom"
                type="number"
                min="0"
                value={form.bedroom}
                onChange={handleChange}
                placeholder="Bedrooms"
                className="w-full border p-2"
              />
              <input
                name="bathroom"
                type="number"
                min="0"
                value={form.bathroom}
                onChange={handleChange}
                placeholder="Bathrooms"
                className="w-full border p-2"
              />
              <input
                name="sqm"
                type="number"
                min="0"
                value={form.sqm}
                onChange={handleChange}
                placeholder="SQM"
                className="w-full border p-2"
              />
              <input
                name="floors"
                type="number"
                min="0"
                value={form.floors}
                onChange={handleChange}
                placeholder="Floors"
                className="w-full border p-2"
              />
              <input
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="Type (Villa, Apartment...)"
                className="w-full border p-2"
              />
              <input
                name="coordinations"
                value={form.coordinations}
                onChange={handleChange}
                placeholder="Google Maps Link"
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

export default AdminCard;
