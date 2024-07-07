import React from 'react';

function Modal({ isVisible, onClose, children }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <button
          className="text-right text-red-500"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
