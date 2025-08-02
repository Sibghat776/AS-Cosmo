import React from 'react'
import "./home.scss"
import Navbar from '../../components/navbar/Navbar'
import HomePageCards from '../../components/homePageCards/HomePageCards'
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
    <div className='home'>

<div className="mainContent">
    
    <div className="content">
        <h1>Unlock the Power of True Beauty with Our Exclusive Cosmetics</h1>
        <h3>
            Experience the magic of makeup like never before. Our carefully crafted collection is designed to enhance your natural beauty, empower your confidence, and bring out the glow you deserve.
        </h3>
        <button>Shop Now</button>
    </div>

    <div className="coverImg">
        <img src="/img/coverImg.avif" style={{
            width: "250px"
        }} alt="" />
    </div>
    
</div>

<div className="searchContainer">
    <input type="text" placeholder='Search for Products ....' />
    <button className="searchBtn">Search</button>
</div>

<div className="categoriesCards">
    <HomePageCards name={"Face"} img={"/img/cat_1.webp"} id={"6883a3e445f297b465471a0d"}/>
    <HomePageCards name={"Eyes"} img={"/img/cat_2.jpg"} id={"6883a47c57f123e61a89cfe1"}/>
    <HomePageCards name={"Lips"} img={"/img/cat_3.avif"} id={"6883a49457f123e61a89cfe4"}/>
    <HomePageCards name={"Nails"} img={"/img/cat_4.webp"} id={"6883a4a557f123e61a89cfe7"}/>
    <HomePageCards name={"Skincare"} img={"/img/cat_5.webp"} id={"6883a4ba57f123e61a89cfea"}/>
    <HomePageCards name={"Tools"} img={"/img/cat_6.webp"} id={"6883a4c757f123e61a89cfed"}/>
</div>

<div className="mainContent">
    
    <div className="coverImg">
        <img src="/img/footerImg.avif" style={{
            width: "300px"
        }} alt="" />
    </div>

    <div className="content">
        <h1>Glow Beyond Limits with Radiant Skin & Colors</h1>
        <h3>
            Dive into a luxurious world of cosmetics that care for your skin while adding a flawless touch. From bold lipsticks to hydrating foundations, we’ve got everything to keep you glowing, day and night.
        </h3>
        <button style={{
            width: "170px"
        }}>Explore Collection</button>
    </div>
    
</div>

<div className="testimonials">
  <h2>What Our Customers Say</h2>
  <div className="testimonialCards">
    <div className="card">
      <p>Amazing quality and super fast delivery. Totally worth it!</p>
      <h4>Ayesha Rashid</h4>
    </div>
    <div className="card">
      <p>I love how natural the foundation feels. My go-to makeup store now!</p>
      <h4>Fatima Shakeel</h4>
    </div>
    <div className="card">
      <p>Their skincare range really made my skin glow. Highly recommend!</p>
      <h4>Hira Kawal</h4>
    </div>
  </div>
</div>

<div className="promoBanner">
  <div className="promoText">
    <h2>Flat 20% Off on First Purchase!</h2>
    <p>Sign up today and get exclusive discounts, new arrivals, and beauty tips straight to your inbox.</p>
    <button>Get Offer</button>
  </div>
  <div className="promoImage">
    <img src="/img/promoImg.webp" alt="promo" />
  </div>
</div>

<div className="whyChooseUs">
  <h2>Why Choose AS Cosmo?</h2>
  <div className="reasons">
    <div className="reasonCard">
      <img src="/img/qualityIcon.png" alt="Quality" />
      <h4>Top-Quality Products</h4>
      <p>We bring you only the best — 100% authentic, dermatologist-tested makeup & skincare.</p>
    </div>
    <div className="reasonCard">
      <img src="/img/deliveryIcon.png" alt="Delivery" />
      <h4>Fast Delivery</h4>
      <p>Get your beauty essentials delivered across Pakistan in 2-4 business days.</p>
    </div>
    <div className="reasonCard">
      <img src="/img/supportIcon.png" alt="Support" />
      <h4>24/7 Support</h4>
      <p>Have a question? We’re just a message away — available day and night.</p>
    </div>
  </div>
</div>

    </div>
  )
}

export default Home