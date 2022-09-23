import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// PaymentForm
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js"
import CreateProduct from './pages/CreateProduct/CreateProduct';
import EditProduct from './pages/EditProduct/EditProduct';
//login
import Profile from './components/Profile/Profile';
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

import PanelAdminCells from './components/PanelAdminCells/PanelAdminCells';
import PanelAdminUsers from './components/PanelAdminUsers/PanelAdminUsers';
import PaymentForm from './pages/PaymentForm/PaymentForm'


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
        
        <Route path="/create" element={<CreateProduct/>}/>
        <Route path='*' element={<NotFound />} />

        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path='/edit' element={<EditProduct />} />
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/panelCells' element={<PanelAdminCells/>}/>
        <Route path='/panelUsers' element={<PanelAdminUsers/>}/>
        


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
