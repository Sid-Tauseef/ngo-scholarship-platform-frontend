import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { RoleProvider } from "./contexts/RoleContext";
import ErrorBoundary from "./components/ErrorBoundary"; // ADD THIS IMPORT

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RoleProvider>
        {/* WRAP APP WITH ERROR BOUNDARY */}
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </RoleProvider>
    </Provider>
  </React.StrictMode>
);