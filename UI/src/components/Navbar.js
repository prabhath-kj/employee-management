import { useNavigate } from "react-router-dom";
import useChangeDp from "../utils/ImageUpload";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userReducer";
import ApiCalls from "../utils/ApiCalls";
import { useEffect } from "react";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeDp = useChangeDp();

  const validateToken = async () => {
    try {
      const response = await ApiCalls.GetUser();
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleFile = async () => {
     changeDp();
  };

  return (
    <nav className="bg-indigo-900 h-16 lg:h-20 p-2 lg:p-8 shadow-lg">
      <div className="flex items-center justify-end">
        <button className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </button>
        <button
          onClick={handleLogout}
          className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600 ml-4"
        >
          Logout
        </button>
        <button
          onClick={handleFile}
          className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600 ml-4"
        >
          Change DP
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
