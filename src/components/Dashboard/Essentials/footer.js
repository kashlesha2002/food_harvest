import React from "react";
import { BsHeartFill } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="footer py-4">
      <div className="container text-center">
        <span>
          Made with <BsHeartFill style={{ color: 'red' }} /> by{" "} Team Food Harvest
        </span>
        <br />
        <span>
          © {new Date().getFullYear()} Food Harvest. All Rights Reserved.
        </span>
        <br />
        
      </div>
    </footer>
  );
};

export default Footer;
