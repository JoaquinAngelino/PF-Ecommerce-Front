import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import AboutUs from './pages/AboutUs/AboutUs';
import ContactUs from './pages/ContactUs/ContactUs';
import Favorites from './pages/Favorites/Favorites';
import Home from './pages/Home/Home';
import LandingPage from './pages/LandingPage/LandingPage';
import NotFound from './pages/NotFound/NotFound';
import Detail from './components/Detail/Detail';
import ShoppingCart from './pages/Cart';
import PaymentForm from './pages/PaymentForm/PaymentForm'

// PaymentForm
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js"
const stripePromise=loadStripe("pk_test_51LaZvGBnw8Rgt2NjQI3zwuWRhuXnnGKWZNCgHwz0UPBxh6t0l0SlRlMVMwTWvQUGfgyh9e4D0b7MD8sGiArVOQMg00JrfIx5p5")



function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route  path='/favorites' element={<Favorites />} />
        <Route  path='/contact' element={<ContactUs />} />
        <Route  path='/about' element={<AboutUs />} />
        <Route  path='/cart' element={<ShoppingCart />} />
        <Route path="/detail/" element={<Detail/>}/>
        <Route path='/cart/paymentForm' element={<Elements stripe={stripePromise}><PaymentForm></PaymentForm></Elements>}/>
        {/* <Route path="/paymentForm" element={<PaymentForm/>}/> */}
        
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
