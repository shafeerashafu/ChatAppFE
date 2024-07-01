import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import PropTypes from "prop-types";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:5000", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Socket connected");
      });

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      newSocket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      newSocket.on("error", (error) => {
        console.error("Socket error:", error);
      });

      return () => {
        newSocket.close();
        console.log("Socket disconnected");
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
	// eslint-disable-next-line
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SocketContextProvider;
