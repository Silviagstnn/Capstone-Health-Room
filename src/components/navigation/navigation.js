import React from 'react';
import { Container, Nav, Navbar} from 'react-bootstrap';
import brand from '../navigation/brand.png'
import { Link, Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import Links from '../../pages/FindPage';
import AboutUs from '../../pages/AboutUs';

import './navigation.css'

function NavigationBar() {
  return (
    <>
      <Navbar expand="lg" className='fixed-top'>
        <Container>
          <Navbar.Brand><Link to='/'><img src={brand} alt="brand" id='brand' /></Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ">
              <Link to="/">Home</Link>
              <Link to="/link">Link</Link>
              <Link to="/aboutus">About US</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/link" element={<Links />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </main>
    </>
  );
}

export default NavigationBar;