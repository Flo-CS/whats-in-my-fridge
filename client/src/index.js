import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Slide, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import App from "./App";
import store from "./features/store";

import "./index.scss";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
            <ToastContainer
                style={{padding: "10px"}}
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                draggablePercent={60}
                pauseOnFocusLoss
                pauseOnHover
                transition={Slide}
                limit={3}
            />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
