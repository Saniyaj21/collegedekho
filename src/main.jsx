import React from "react";

import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css'
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='181727105626-4snohvf7lqrr451oddqpn8uvatdv71me.apps.googleusercontent.com'>
		<Provider store={store}>
			<App />
		</Provider>
	</GoogleOAuthProvider>
)
// development use this
export const base_url = "http://localhost:8080";


// final deploy use this
// export const base_url = "https://playlister-server.vercel.app";

