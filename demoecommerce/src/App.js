import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Don't forget to import the CSS for toast notifications
import Home from './Components/Home';
import Cart from './Components/Cart';
import Order from './Components/Order';
import SingleProduct from './Components/SingleProduct';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<Navigate to="/" replace />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:product_id" element={<SingleProduct />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/order" element={<Order />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;


