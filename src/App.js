// CSS
import "react-toastify/dist/ReactToastify.css";

// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Cookies
import Cookies from "universal-cookie";

// Config
import config from "./config/config";

// Notifications
import { ToastContainer } from 'react-toastify';

// Pages
import {
  Auth,
  Employee,
  Home,
} from "./pages";

const cookies = new Cookies()

const authToken = cookies.get("token");

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={authToken ? <Home /> : <Auth />} />
          <Route path="/employee" element={authToken ? <Employee /> : <Auth />} />
          <Route path="/employee/:id" element={authToken ? <Employee /> : <Auth />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer limit={5} />
    </div>
  );
}

export default App;
