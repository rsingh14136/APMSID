import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./components/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <BrowserRouter basename="/IMCS">
      <Routes>
        <Route path="/login" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
  );
}

export default App;
