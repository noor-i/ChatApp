import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const validateForm = () => {
    if (!formData.email.trim()) {
      return toast.error("Email is required.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return toast.error("Invalid email format.");
    }
    if (!formData.password.trim()) {
      return toast.error("Password is required.");
    }
    if (formData.password.length < 6) {
      return toast.error("Password length must be at least 6 characters.");
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm(formData);
    if (success) login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* LEFT SIDE FORM */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO AND INTRO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
