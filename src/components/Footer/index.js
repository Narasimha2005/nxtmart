import {
  FaRegCopyright,
  FaFacebookSquare,
  FaPinterestSquare,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div
      style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
    >
      <p className="footer-paragraph">
        For any queries, contact +91-9876543210
        <br />
        or mail us help@nxtmart.co.in
      </p>
      <div className="footer-icons-container">
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
          <FaFacebookSquare className="footer-icon" />
        </a>
        <a href="https://www.pinterest.com" target="_blank" rel="noreferrer">
          <FaPinterestSquare className="footer-icon" />
        </a>
        <a href="https://www.x.com" target="_blank" rel="noreferrer">
          <FaTwitter className="footer-icon" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram className="footer-icon" />
        </a>
      </div>
    </div>
    <p className="footer-paragraph">
      Copyright <FaRegCopyright /> 2023 NxtMart Grocery Supplies Pvt Ltd
    </p>
  </div>
)

export default Footer
