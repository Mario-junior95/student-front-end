import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import { LoadingProvider } from "./context/LoadingProvider";

ReactDOM.render(
  <React.StrictMode>
    <LoadingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </LoadingProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
