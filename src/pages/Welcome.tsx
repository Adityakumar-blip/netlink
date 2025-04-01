import React from "react";
import logo from "@/assets/logo-netlink.png";

const Welcome = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100">
      <div className="text-center max-w-md mx-auto p-8 bg-white rounded-xl shadow-sm">
        <img
          src={logo}
          alt="Company Logo"
          className="w-40 h-auto mb-10 mx-auto"
        />
        <h1 className="text-4xl font-light text-gray-800 mb-3">Welcome</h1>
        <p className="text-gray-600 text-lg">
          We're delighted to have you join us. Your journey with us begins now.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
