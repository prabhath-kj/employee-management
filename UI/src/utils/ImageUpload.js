import { useDispatch } from "react-redux";
import { setUser } from "../redux/userReducer";
import Swal from "sweetalert2";
import axios from "axios";

const useChangeDp = () => {
  const dispatch = useDispatch();

  const changeDp = async () => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      background: "#240E76",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });

    if (file) {
      const formData = new FormData();
      formData.append("file", file, file.name);

      try {
        const response = await axios.post(
          "http://localhost:5000/update-profilePic",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          dispatch(setUser(response?.data?.data));
          Swal.fire({
            showConfirmButton: false,
            timer: 2000,
            text: "Image uploaded successfully",
            background: "#240E76",
          });
          // Perform any necessary actions with the uploaded image URL or data
        } else {
          Swal.fire({
            showConfirmButton: false,
            timer: 2000,
            text: response.data.message,
            background: "#240E76",
          });
        }
      } catch (error) {
        Swal.fire({
          showConfirmButton: false,
          timer: 2000,
          text: "Failed to upload image",
          background: "#240E76",
        });
      }
    }
  };

  return changeDp;
};

export default useChangeDp;
