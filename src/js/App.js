import React from "react";
import { RouterProvider } from "react-router-dom";

import { ContextProvider } from "../store/Context";
import { Router } from "../routes/routes";

const App = () => {

	const basename = process.env.BASENAME || "";

	return (
		<ContextProvider>
			<RouterProvider router={Router}>
			</RouterProvider>
		</ContextProvider>
	);
};

export default App; 