import React, { useState, useEffect }from 'react'
import { Link } from "react-router-dom";
import{ fb }from '../firebase'
import Banner from '../components/banner/Banner';
import './LandingPage.css'
import './LandingPage.scss'
import { Element, Events } from 'react-scroll';
import { CloudinaryContext, Image } from 'cloudinary-react';

import { Navbar } from 'react-bootstrap';
import Footer from '../footer/Footer';
import logo from '../img/logo.png'

const db = fb.firestore()
const Blogs = db.collection('blogs');

function LandingPage() {
    const [blogslist, setblogs] = useState([]);

    const DeleteBlog = (id)=> {
        Blogs.doc(id).delete().then(() => {
            alert("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    };

    useEffect(() => {
        // Subscribe to query with onSnapshot
        const unsubscribe = Blogs.limit(100).onSnapshot(querySnapshot => {
          // Get all documents from collection - with IDs
          const data = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));
          // Update state
          setblogs(data);
        });

        // Detach listener 
        return unsubscribe;
      }, []);
// console.log(blogslist[2]?.Subheadings[0]?.subSubheadings[0]?.content  )

const truncateContent = (content, wordCount = 20) => {
    if (!content) return "";
    const words = content.split(" ");
    const truncatedWords = words.slice(0, wordCount);
    return truncatedWords.join(" ");
  };
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };



  //===========form=====================

  
  useEffect(() => {
    // Smooth scroll to the "Contact Us" section
    const handleScrollToContact = () => {
      const contactSection = document.getElementById('contactUs');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Attach the scroll behavior to the "Contact" link
    const contactLink = document.getElementById('contactLink'); // Add an ID to the link
    if (contactLink) {
      contactLink.addEventListener('click', handleScrollToContact);
    }

    // Clean up event listener
    return () => {
      if (contactLink) {
        contactLink.removeEventListener('click', handleScrollToContact);
      }
    };
  }, []);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [societyName, setSocietyName] = useState('');
  const [societAddress, setSocietyAddress] = useState('');
  const [noOfMembers, setNoOfMembers] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
 // Validate form fields
  if (
    name === '' ||
    lastName==='' ||
    contactNumber === '' ||
    societyName === '' ||
    societAddress === '' ||
    noOfMembers === '' ||
    inquiryType === '' ||
    email === '' ||
    message === ''
  ) {
    alert('Please fill in all fields before submitting.');
    return;
  }


    const formData = {
      name,
      email,
      lastName,
      
      message,
      contactNumber,
      societyName,
      societAddress,
      noOfMembers,
      services,
      inquiryType,
    };

    try {
      const response = await fetch('https://shy-teal-drill-suit.cyclic.app/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setName('');
        setLastName('');
        setEmail('');
        setMessage('');
        setContactNumber('');
        setSocietyName('');
        setSocietyAddress('');
        setNoOfMembers('');
        setInquiryType('')
      } else {
        alert('Error sending message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please try again.');
    }
  };
  const [recentImages, setRecentImages] = useState([]);

  useEffect(() => {
    // Fetch images from Firestore, sorted by timestamp in descending order
    db.collection('adsImages')
      .orderBy('timestamp', 'desc')
      .limit(2)
      .get()
      .then(querySnapshot => {
        const images = querySnapshot.docs.map(doc => doc.data());
        setRecentImages(images);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []);

  const [services, setServices] = useState([]);

  const handleServiceCheckboxChange = (event) => {
    const selectedService = event.target.value;
    if (services.includes(selectedService)) {
      setServices(services.filter(service => service !== selectedService));
    } else {
      setServices([...services, selectedService]);
    }
  }

    return (
         
        <div  className='landingPage'>


        <section class="blog-cards">
  
{/* {blogslist.map(blog=> ( 
<div class="blog_post">
  <div class="img_pod">
    <img className='landingPage_img' src="https://pbs.twimg.com/profile_images/890901007387025408/oztASP4n.jpg" alt="random image"/>
  </div>
  <div class="container_copy">
    <h3>12 January 2019</h3>
    <h1>{blog?.Title}</h1>
    <p >{stripHtmlTags(blog?.Subheadings[0]?.subSubheadings[0]?.content )}</p>
    <Link to={"/blog/"+blog.id} style={{ textDecoration: 'none'}}>
    <a  style={{ textDecoration: 'none'}}class="btn_primary" href='#' target="_blank">Read More</a>
      </Link>
  </div>
  
</div> 
 ))} */}  <div class="bylaw-cards">
 {blogslist.map(blog=> ( 


    <div class="bylaw-card">
      <img class="bylaw-image" src={blog.imageUrl} alt="Blog Image" />
      <h2 class="bylaw-title">{blog?.Title}</h2>
    <div  className='bylaw-para'>{truncateContent(stripHtmlTags(blog?.Subheadings[0]?.subSubheadings[0]?.content ))}</div>
    <Link to={"/blog/"+blog.id} style={{ textDecoration: 'none'}}>

      <button class="read-more-button">Read More</button>
      </Link>

    </div>
  
 
   ))} </div>
 
      
           
         <div className='landingPage-ads'>
         {recentImages.map((imageData, index) => (
          <img  className='rightColumn-img'src={imageData.adsImages} alt={`Recent Image ${index}`}/>
          ))}
   

   </div>
            
    </section>  
     {/* <div>
      <h2>Recent Images</h2>
      {recentImages.map((imageData, index) => (
        <div key={index}>
          <img src={imageData.adsImages} alt={`Recent Image ${index}`} />
        </div>
      ))}
    </div> */}
    
         <Element name="contactUs">

    <div id="contactUs"  class="arch_contact_us_duplicate" >
  <div class="responsive-container-block big-container">
    <div class="responsive-container-block container">
      <div class="responsive-cell-block wk-mobile-12 wk-desk-5 wk-tab-10 wk-ipadp-5" id="ih6s">
        <p class="text-blk section-head">
        Send Us a Message
        </p>
      
      </div>
      <div class="responsive-cell-block wk-ipadp-6 wk-mobile-12 wk-desk-5 wk-tab-9" id="i6df">
        <div class="form-wrapper">
<div className='form-div-2'>
  <input class="input input-element" name="Name" style={{marginRight: "10px"}} value={name} onChange={(e) => setName(e.target.value)}  placeholder="First Name"/>
          <input class="input input-element" name="Name"  value={lastName} onChange={(e) => setLastName(e.target.value)}  placeholder="Last Name"/>

</div>

<input class="input input-element" name="Contact Number" style={{marginRight: "10px"}} type="number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}  placeholder="Contact Number"/>

<input class="input input-element" name="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Email"/>





     
          
          <textarea class="textinput input-element" value={message} onChange={(e) => setMessage(e.target.value)}  placeholder="Message"></textarea>
          <button class="button" onClick={handleSubmit}>
            Send
          </button>
        </div>
     
      </div>
    </div>
  </div>
</div>
</Element>


                      <Footer/>
           
    </div>
    );
  };

export default LandingPage