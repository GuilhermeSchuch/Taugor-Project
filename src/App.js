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
} from "./pages";

const cookies = new Cookies();
const authToken = cookies.get("token");

if(authToken) {
  
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!authToken ? <Auth /> : ''} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
