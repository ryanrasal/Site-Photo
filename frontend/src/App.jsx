import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { CurrentAdminContextProvider } from "./context/AdminContext";
import PublicRoute from "./pages/Public/PublicRoute";
import PrivateRoute from "./pages/Admin/PrivateRoute";
import AuthGuard from "./AuthGuard";

function App() {
  return (
    <div className="bg-black h-screen ">
      <CurrentAdminContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<PublicRoute />} />
            <Route
              path="/admin/*"
              element={
                <AuthGuard>
                  <PrivateRoute />
                </AuthGuard>
              }
            />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </CurrentAdminContextProvider>
    </div>
  );
}

export default App;
