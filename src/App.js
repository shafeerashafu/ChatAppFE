

/* eslint-disable no-mixed-spaces-and-tabs */
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home.jsx";

import SignUp from "./Pages/Signup/Signup.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./Context/AuthContext.jsx";
import Login from "./Pages/Login/Login.jsx";

function App() {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center h-screen p-4'>
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
