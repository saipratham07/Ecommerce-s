/**
 *
 * Homepage (Complete UI/UX & Video Integrated Edition)
 *
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

import actions from '../../actions';
import banners from './banners.json';
import CarouselSlider from '../../components/Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/utils';

const Homepage = () => {
  const dispatch = useDispatch();

  // Extract necessary states cleanly from Redux store using hooks
  const products = useSelector(state => state.product.storeProducts || []);
  const isLoading = useSelector(state => state.product.isLoading || false);

  // Trigger any initial data fetches if your boilerplate actions require it
  useEffect(() => {
    // Example hook call: dispatch(actions.fetchStoreProducts());
  }, [dispatch]);

  return (
    <div className='homepage-modern-wrapper'>
      <Container fluid className="px-md-4">
        
        {/* ================= HERO GRID SECTION ================= */}
        <Row className='hero-grid-row match-height-cols'>
          
          {/* Left Side Promo Banners */}
          <Col xs='12' md='6' lg='3' className='order-lg-1 mb-4 px-2'>
            <div className='promo-column-flex h-100'>
              <div className='ux-promo-card modern-gradient-bg text-white mb-3'>
                <div className='card-overlay-content'>
                  <span className="badge-exclusive">Trending</span>
                  <h3>New Arrivals</h3>
                  <p>Discover this week's hottest drops.</p>
                  <Link to='/shop' className='ux-card-link-btn'>Explore Now →</Link>
                </div>
                <img src='/images/banners/banner-5.jpg' alt='New arrivals promo' className='card-bg-img' />
              </div>
              
              <div className='ux-promo-card'>
                <div className='card-overlay-content dark-overlay'>
                  <span className="badge-exclusive discount">Up to 40% Off</span>
                  <h3>Premium Collection</h3>
                  <Link to='/shop' className='ux-card-link-btn minimalist'>Shop Sale</Link>
                </div>
                <img src='/images/banners/banner-6.jpg' alt='Premium collections promo' className='card-bg-img' />
              </div>
            </div>
          </Col>

          {/* Center Dynamic Main Carousel */}
          <Col xs='12' lg='6' className='order-lg-2 mb-4 px-2'>
            <div className='home-carousel-container h-100'>
              <CarouselSlider
                swipeable={true}
                showDots={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                slides={banners}
                responsive={responsiveOneItemCarousel}
              >
                {banners.map((item, index) => (
                  <div key={index} className="slider-image-wrapper">
                    <div className="slider-text-overlay">
                      <h2>{item.title || "Discover Modern Style"}</h2>
                      <p>{item.description || "Curated premium products tailored to your aesthetic."}</p>
                      <Link to="/shop" className="input-btn custom-btn-primary md">Shop the Look</Link>
                    </div>
                    <img src={item.imageUrl} alt={`Featured banner ${index + 1}`} className="carousel-main-img" />
                  </div>
                ))}
              </CarouselSlider>
            </div>
          </Col>

          {/* Right Side Merchant/Partner Action Banner */}
          <Col xs='12' md='6' lg='3' className='order-lg-3 mb-4 px-2'>
            <div className='ux-promo-card full-height-card height-balanced-fallback'>
              <div className='card-overlay-content light-overlay'>
                <span className="badge-exclusive merchant">Partner Program</span>
                <h3>Sell With Us</h3>
                <p>Open your merchant storefront and reach thousands of shoppers instantly.</p>
                <Link to='/sell' className='input-btn custom-btn-dark md mt-2'>Get Started</Link>
              </div>
              <img src='/images/banners/banner-2.jpg' alt='Become a merchant promo' className='card-bg-img image-darken-filter' />
            </div>
          </Col>
          
        </Row>

        {/* ================= NEW UNIQUE VIDEO SHOWCASE SECTION ================= */}
        <div className="ux-homepage-video-showcase mt-4 mb-5">
          <div className="section-header-row mb-3">
            <h2 className="modern-section-title">Brand Showcase</h2>
            <p className="text-muted text-xs">Watch our platform introductory feature loop</p>
          </div>
          
          <div className="ux-video-player-frame">
            <video 
              width="100%" 
              height="auto" 
              controls 
              muted
              loop
              playsInline
              poster="/images/banners/banner-2.jpg"
              className="ux-embedded-video"
            >
              {/* Using a stable open-source demo MP4 stream wrapper */}
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
              Your browser does not support the video playback engine.
            </video>
            
            <div className="video-glass-bar">
              <span className="pulse-dot"></span>
              <p className="mb-0 text-white text-sm">Live Store Walkthrough & Interface Preview</p>
            </div>
          </div>
        </div>

        {/* ================= DYNAMIC PRODUCT SECTION ================= */}
        <div className="homepage-featured-section mt-5">
          <div className="section-header-row mb-4 d-flex justify-content-between align-items-center">
            <h2 className="modern-section-title">Featured Products</h2>
            <Link to="/shop" className="view-all-link">View All Products →</Link>
          </div>
          
          {isLoading ? (
            <div className="ux-empty-section-loader text-center py-5">
              <p className="text-muted">Loading feature modules smoothly...</p>
            </div>
          ) : products.length > 0 ? (
            <Row>
              {products.slice(0, 4).map((product, idx) => (
                <Col xs="6" md="4" lg="3" key={idx} className="mb-4">
                  <div className="product-grid-card">
                    {/* Render your individual item blueprints here */}
                    <p className="p-3 text-center">{product.name}</p>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="ux-empty-section-loader border rounded p-5 text-center">
              <p className="text-muted mb-0">No active products found. Use your Admin Credentials to upload items to the marketplace database!</p>
            </div>
          )}
        </div>

      </Container>
    </div>
  );
};

export default Homepage;