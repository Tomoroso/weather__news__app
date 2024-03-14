import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();


  return (
    <div className="app__footer">
        <p>Copyright V.Pinteac {year}</p>
    </div>
  )
};


export default Footer;