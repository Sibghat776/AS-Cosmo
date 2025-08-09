import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify'
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Products from './pages/products/Products';
import Peoples from './pages/peoples/Peoples';
import Orders from './pages/orders/Orders';
import Notifications from './pages/notifications/Notifications';
import Profile from './pages/profile/Profile';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import AddProduct from './pages/addProduct/AddProduct';
import EditProfile from './pages/editProfile/EditProfile';
import PrivateRoute from './routes/PrivateRoute';
import AuthRoute from './routes/AuthRoute';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import Product from './pages/product/Product';
import OrderPage from "./components/orders/OrderPage"
import AdminPanel from './Admin Panel/AdminPanel';

function App() {
  const location = useLocation()
  const hideLayoutRoutes = ['/login', '/signup', '/notfound'];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      {!hideLayout && <Navbar />}
      <ScrollToTop />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:id" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/peoples" element={<Peoples />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path='/orderPage' element={<OrderPage />} />
        </Route>

        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;