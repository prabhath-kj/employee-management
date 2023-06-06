import ApiInstance from "./ApiInstance";

export default {
  Register: async (payload) => {
    const response = await ApiInstance.post("/signup", payload);
    return response.data;
  },
  //user side
  Login: async (payload) => {
    const response = await ApiInstance.post("/login", payload);
    return response.data;
  },

  GetUser: async () => {
    const response = await ApiInstance.get("/get-user");
    return response.data;
  },

  //admin side

  AdminLogin: async (payload) => {
    const response = await ApiInstance.post("/admin/login", payload);
    return response.data;
  },
  GetAllUsers: async () => {
    const response = await ApiInstance.get("/admin/get-users");
    return response.data;
  },
  DeleteUser:async (payload)=>{
    const response = await ApiInstance.get(`admin/delete-user/${payload}`);
    return response.data;
  },
};
