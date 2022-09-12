import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
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
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route exact path='/favorites' element={<Favorites />} />
        <Route exact path='/cart' element={<ShopCart />} />
        <Route exact path='/contact' element={<ContactUs />} />
        <Route exact path='/about' element={<AboutUs />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
