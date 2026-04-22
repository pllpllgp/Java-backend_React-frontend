import * as React from "react";
import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from './pages/Login/Login.tsx';
import Signup from './pages/Login/Signup.tsx';
import Main from './pages/board/Main.tsx';
import BoarList from './pages/board/BoardList.tsx';
import BoarForm from './pages/board/BoardForm.tsx';
import BoarView from './pages/board/BoardView.tsx';
import RootLayout from "./layouts/RootLayout.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{index: true, element: <Navigate to="login" replace /> },
			{path: "login", element: <Login /> },
			{path: "signup", element: <Signup /> },
			{path: "main", element: <ProtectedRoute><Main /></ProtectedRoute> },
			{path: "board/:category/list", element: <ProtectedRoute><BoarList /></ProtectedRoute> },
			{path: "board/:category/form", element: <ProtectedRoute><BoarForm /></ProtectedRoute> },
			{path: "board/:category/detail/:idx", element: <ProtectedRoute><BoarView /></ProtectedRoute> },
			{path: "board/:category/modify/:idx", element: <ProtectedRoute><BoarForm /></ProtectedRoute> },
		],
	},
]);