import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal"; // Import the modal component
import ApiCalls from "../../utils/ApiCalls";
import { setUsers } from "../../redux/usersReducer";
import { useDispatch, useSelector } from "react-redux";

const AdminHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to control modal visibility
  const [filteredUsers, setFilteredUsers] = useState([]);

  const validateToken = async () => {
    try {
      const response = await ApiCalls.GetAllUsers();
      if (response.success) {
        dispatch(setUsers(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("admintoken")) {
      validateToken();
    } else {
      navigate("/admin/login");
    }
  }, [setUsers]);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobileNumber.includes(searchTerm)
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  const handleLogout = () => {
    localStorage.removeItem("admintoken");
    navigate("/admin/login");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleModalClose = () => {
    // Logic to handle modal close
    // Reset any necessary state and close the modal
    setIsEditing(false);
  };
  const handleDeleteUser = async (id) => {
    const userId = id;
    const response = await ApiCalls.DeleteUser(id);
    if (response.success) {
      const updatedUsers = users.filter((user) => user._id !== userId);
      dispatch(setUsers(updatedUsers));
    } else {
      throw new Error(response.message);
    }
  };
  return (
    <div>
      <div className="bg-gray-900 min-h-screen lg:p-8">
        <div className="flex items-center justify-end">
          <button
            onClick={handleLogout}
            className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600 ml-4"
          >
            Logout
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-50">All Users</h2>
          <div className="mb-4 mt-4">
            <input
              type="text"
              placeholder="Search by name"
              className="px-4 py-2 rounded bg-gray-800 text-gray-200"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {filteredUsers.map((user) => (
            <div key={user?._id} className="bg-gray-800 p-4 mt-4 rounded">
              <div className="flex items-center gap-x-2">
                <img
                  className="aspect-[2/2] w-16"
                  src={user.profilePic}
                  alt="User Profile"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-50">
                    {user.username}
                  </h3>
                  <span className="text-xs text-gray-300">{user.email}</span>
                </div>
              </div>
              <div className="my-4">
                <h3 className="text-2xl font-medium text-gray-200">
                  {user?.designation}
                </h3>
                <div className="text-sm font-medium">
                  <span className="m-1 ml-0 inline-block text-blue-500">
                    HTML
                  </span>
                  <span className="m-1 ml-0 inline-block text-yellow-500">
                    CSS
                  </span>
                  <span className="m-1 ml-0 inline-block text-pink-500">
                    FIGMA
                  </span>
                  <span className="m-1 ml-0 inline-block text-lime-500">
                    Ad. XD
                  </span>
                  <span className="m-1 ml-0 inline-block text-blue-500">
                    Illustrator
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  {user.mobileNumber}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-50">
                  Full Time
                </span>
                <div>
                  <button
                    onClick={() => handleEditUser(user._id)} // Open the modal for editing
                    className="text-gray-400 hover:text-gray-200 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-red-400 hover:text-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isEditing && (
        <Modal onClose={handleModalClose}>
          <h3>Edit User Profile</h3>
        </Modal>
      )}
    </div>
  );
};

export default AdminHome;
