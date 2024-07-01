import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("jwt"); // Retrieve token from localStorage
                if (!token) {
                    throw new Error("No token found"); // Handle case where token is not found
                }

                const res = await axiosInstance.get(`/api/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = res.data; // Assuming data is an array of conversations
                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array to run once on mount

    return { loading, conversations };
};

export default useGetConversations;
