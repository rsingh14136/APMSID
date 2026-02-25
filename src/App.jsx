import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./components/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import { SuccessModalProvider } 
  from "./Pages/Model/SuccessModalProvider";
import ProtectedRoute from "./api/ServiceApi/ProtectedRoute";

function App() {
  return (
     <SuccessModalProvider>
    <BrowserRouter basename="/IMCS">
      <Routes>
        <Route path="/login" element={<Home />} />
       <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
      </Routes>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
    </BrowserRouter>
  </SuccessModalProvider>
  );
}

export default App;
