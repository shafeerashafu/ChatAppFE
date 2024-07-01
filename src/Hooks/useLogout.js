import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext.jsx";
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance.js";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/api/auth/logout`);
      const data = res.data; // axios automatically parses JSON responses
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
