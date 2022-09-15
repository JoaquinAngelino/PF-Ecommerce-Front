import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import AboutUs from './pages/AboutUs/AboutUs';
import ContactUs from './pages/ContactUs/ContactUs';
import Favorites from './pages/Favorites/Favorites';
import Home from './pages/Home/Home';
import LandingPage from './pages/LandingPage/LandingPage';
import NotFound from './pages/NotFound/NotFound';
import ShopCart from './pages/ShopCart/ShopCart';


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route  path='/favorites' element={<Favorites />} />
        <Route  path='/cart' element={<ShopCart />} />
        <Route  path='/contact' element={<ContactUs />} />
        <Route  path='/about' element={<AboutUs />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
