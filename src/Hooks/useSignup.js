import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext.jsx";
import axiosInstance from "./axiosInstance.js";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
    if (!success) return;

    setLoading(true);
    try {
      const res = await axiosInstance.post(`/api/auth/signup`, {
        fullName,
        username,
        password,
        confirmPassword,
        gender,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data; // axios automatically parses JSON responses
      if (data.error) {
        throw new Error(data.error);
      }
      
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
