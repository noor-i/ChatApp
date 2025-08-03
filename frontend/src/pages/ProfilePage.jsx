import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [profilePic, setProfilePic] = useState("");

  const handleImageUpload = async (e) => {
    // When the user selects a file, this event is triggered

    // Get the first file from the input (e.g., an image)
    const file = e.target.files[0];
    //If there is no file, just return
    if (!file) return;
    // Create a new FileReader object to read the file

    const reader = new FileReader();

    // Read the file and convert it to a base64-encoded string (Data URL)
    reader.readAsDataURL(file);

    // When FileReader finishes reading the file:
    reader.onload = async () => {
      // reader.result contains the base64 string of the image
      const base64Image = reader.result;
      // Update the user's profile picture with the new image
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        {/* FIRST HALF */}
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          {/* avatar upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                className="size-32 rounded-full object-cover border-3"
                src={authUser.profilePic || "/avatar.png"}
                alt="profile-pic"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content rounded-full p-2 cursor-pointer hover:scale-105 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>
          {/* User info */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.fullName}
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>
        </div>
        {/* SECOND HALF */}
        <div className="bg-base-300 rounded-xl p-6 mt-6">
          <h1 className="text-lg font-medium  mb-4">Account Information</h1>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              <span>{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
