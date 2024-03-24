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

// Firebase
import { auth } from "./config/firebase";

// Pages
import {
  Auth,
  Employee,
} from "./pages";

const cookies = new Cookies();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={auth.currentUser ? <Employee /> : <Auth />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer limit={5} />
    </div>
  );
}

export default App;
