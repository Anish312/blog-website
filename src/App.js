import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './landingPage/LandingPage';
import NavBar from './navBar/NavBar';
import CreateBlog from './adminPanel/createBlog/CreateBlog';
import Bloglist from './adminPanel/blogList/BlogList';
import BlogEdit from './adminPanel/blogEdit/BlogEdit';
import BlogView from './blogView/Blogview';
import AdminLogin from './adminPanel/adminLogin/AdminLogin';
import RegistrationForm from './adminPanel/registrationPage/RegistrationForm';
import SignUp from './adminPanel/signUp/SignUp';
import Footer from './footer/Footer';
import Ads from './adminPanel/ads/Ads';
import { fb } from './firebase';
import ProtectedRoute from './privateRoute/ProtectedRoute';
import AdminNavbar from './adminPanel/adminNavbar/AdminNavbar';
import { FaFacebook, FaTwitter, FaYoutube ,FaWhatsapp} from 'react-icons/fa';

  import { useEffect, useState} from 'react';
import ContactUsPage from './contactUsPage/ContactUsPage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Add an observer to listen for changes in authentication state
    const unsubscribe = fb.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  
 
  
  
  return (

    
    <Router>
      <div className="app">
      
     { user === null ? <NavBar/> : <AdminNavbar/>}
         
         
          <Routes>  
           
            <Route path="/" element={<LandingPage />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path='/blog/create' element={<ProtectedRoute Cmp={CreateBlog}/>} />
        <Route path='/blog/:id' element={<BlogView/>}  />
        <Route path='/blog/edit/:id' element={<BlogEdit/>}  />         
           <Route path="/Bloglist" element={ <ProtectedRoute Cmp={Bloglist} />
   }  />
            <Route path="/wpAdmin" element={<AdminLogin />} />
            <Route path="/ads" element={<ProtectedRoute Cmp={Ads}/>} /> 
            <Route path='/contactUsPage' element={<ContactUsPage/>}  />

            {/* <Route path="/register" element={RegistrationForm} /> */}
                 

            {/* <Route path="/login" element={<AccountPage />} /> */}
          </Routes>
          {/* <Footer/> */}
          <div className="social-icons">
          <a href="https://www.facebook.com/yourpage"  target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://www.twitter.com/yourpage" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>

        <a href="https://api.whatsapp.com/send?phone=1234567890" target="_blank">
      <FaWhatsapp/>
       </a>

         
        </div>
      </div>
    </Router>
  );
}

export default App;
