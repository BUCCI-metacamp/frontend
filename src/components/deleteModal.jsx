import React, { useState } from 'react';
import { deleteUser } from "@/src/apis/userApi/user.js"

const CustomModal = ({ show, handleClose, handleDelete, user }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleClose}>&times;</button>
        <p className="mb-4">유저 삭제할까말까</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-700"
            onClick={() => handleDelete(user)}
          >
            삭제
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={handleClose}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteModal = ({ user, fetchUsers }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleDelete = async (user) => {
    try {
      await deleteUser(user.id); // userId로 유저 삭제
      alert('삭제되었습니다');
      handleClose();
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  }

  return (
    <div className="justify-center">
      <button
        className="bg-red-500 text-white px-1 py-2 rounded hover:bg-red-700"
        onClick={handleOpen}
      >
        삭제
      </button>
      <CustomModal show={showModal} handleClose={handleClose} handleDelete={handleDelete} user={user} />
    </div>
  );
};

export default DeleteModal;
