import { useState } from "react";

export default function InfoDrawer({ onClose, drawerContent }) {
  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out w-72">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">{drawerContent?.title}</h2>
          <p className="text-gray-700 mb-4">
            {drawerContent?.details}
          </p>
          <button
            onClick={onClose}
            className="text-blue-500 hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
