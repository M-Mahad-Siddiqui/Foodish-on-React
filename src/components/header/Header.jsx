import de from './de.jpg';
import food from './food.jpg';
import './header.css';
import img from './header_img.png';
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import img4 from './img4.jpg';
import img5 from './img5.jpg';



function Header() {

    const images = [img, img1, food, img2, de, img4, img5];
    const randomImage = images[Math.floor(Math.random() * images.length)];

    // const styles = {
    //     height        : '34vw',
    //     margin        : '30px auto',
    //     background    : ` url(${randomImage}) no-repeat`,
    //     backgroundSize: 'cover',
    //     width         : "80vw",
    //     position      : 'relative',
    //     borderRadius  : '15px'

    // };
const styles = {
    height: '34vw',
    margin: '30px auto',
    backgroundImage: `url(${randomImage})`,  // Set background image
    backgroundRepeat: 'no-repeat',           // Define repeat behavior
    backgroundSize: 'cover',                 // Set size explicitly
    width: "80vw",
    position: 'relative',
    borderRadius: '15px'
};

    return (
        <div style={styles} className='header'>
            <div className="header-contents">
                <h2>Best food waiting for your belly</h2>
                <p>
                    Choose from a diverse collection of delicious dishes crafted with the finest ingredients and culinary expertise.
                    Our mission is to satisfy our customers with quality food and make food accessible to all.
                </p>
                <button>View Menu</button>
            </div>
        </div>
    );
}

export default Header;