import { assets } from '../../assets/assets'
import './footer.css'
function Footer() {
    return (
        <div className='footer' id='footer'>

            <div className='footer-container'>
                <div className='footer-left'>
                    <img id='mahad' src={assets.logo1} alt="" />
                    <p>Best food waiting for your belly. Fresh food delivered to your doorstep just as you like it. We promise you: free delivery and free returns. The food is fresh, made with quality ingredients, and ready to satisfy your cravings! Enjoy a variety of cuisines that cater to every taste, from hearty meals to light snacks. Experience the convenience of having delicious, home-cooked flavors without the hassle. Indulge yourself today and elevate your dining experience right at home!</p>
                    <div className='footer-socials-icons'>
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className='footer-center'>
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                        <li>Terms and conditions</li>
                    </ul>
                </div>
                <div className = 'footer-right'>
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>Address: House No. A/588, Landhi, Karachi, Pakistan</li>
                        <li>Phone  : +923190039560</li>
                        <li>Email  : mahadsiddiqui21@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <div className='footer-bottom'>
                <p>&copy; 2024 M. Mahad Siddiqui. All rights reserved.</p>
            </div>

        </div>
    )
}

export default Footer
