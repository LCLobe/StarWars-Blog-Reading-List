import React from "react";

import { RouterProvider } from "react-router-dom";
import ContextProvider from "../context/Context";
import { Router } from "../routes/routes";

// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ScrollToTop from "./component/scrollToTop";

// import { Home } from "./views/home";
// import { Demo } from "./views/demo";
// import { Single } from "./views/single";
// import injectContext from "./store/appContext";

// import { Navbar } from "./component/navbar";
// import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<ContextProvider>
			<RouterProvider router={Router}>

			</RouterProvider>
		</ContextProvider>
	);
};

export default Layout; 

//export default injectContext(Layout);


/* <BrowserRouter basename={basename}>
<ScrollToTop>
	<Navbar />
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/demo" element={<Demo />} />
		<Route path="/single/:theid" element={<Single />} />
		<Route path="*" element={<h1>Not found!</h1>} />
	</Routes>
	<Footer />
</ScrollToTop>
</BrowserRouter> */