import React, { useState, useEffect } from "react";

const ComingSoonPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Admin panel header style */}
        <div className="mb-6 pb-3 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">
            Page Under Development
          </h1>
        </div>

        <div className="py-8">
          <div className="flex justify-center mb-6">
            <svg
              className="w-20 h-20 text-blue-600 animate-pulse"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>

          <p className="text-gray-600 mb-8">
            We're working on this section of the Netlink Testlabs. Please check
            back soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
