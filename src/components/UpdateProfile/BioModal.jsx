import React, { useState } from 'react';
import Modal from '../Modal';

function BioModal({userDetails, isVisible, onClose, onSave }) {
  const [bio, setBio] = useState(userDetails.bio?userDetails.bio:"");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(bio);
    onClose();
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Add Bio</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Bio
        </button>
      </form>
    </Modal>
  );
}

export default BioModal;
