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
import CreateProduct from './pages/CreateProduct/CreateProduct';
//login
import Profile from './components/Profile/Profile';
//login

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
        <Route path="/create" element={<CreateProduct/>}/>
        <Route path='*' element={<NotFound />} />

        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path='/create' element={<CreateProduct />} />
        <Route path='/Profile' element={<Profile/>}/>
        


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
