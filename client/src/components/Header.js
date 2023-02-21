
import React from "react";
import Nav from 'react-bootstrap/Nav';

const Header = () => {
  // const { user, dispatch } = useContext(Context)



 
  return (
  
    <Nav defaultActiveKey="/home" as="ul" style={{background:'#1795a6'}}>
    <Nav.Item as="li">
      <Nav.Link href="/company" style={{color:"white",textDecoration:'none'}}>Company</Nav.Link>
    </Nav.Item>
    <Nav.Item as="li">
      <Nav.Link href="/companyDetails" style={{color:"white",textDecoration:'none'}}>Details</Nav.Link>
    </Nav.Item>
    <Nav.Item as="li">
      <Nav.Link eventKey="link-2" style={{color:"white",textDecoration:'none'}}>Link</Nav.Link>
    </Nav.Item>
  </Nav>
   
  );
};

export default Header;
