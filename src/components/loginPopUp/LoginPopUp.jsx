import { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { useFireContext } from '../../context/FireContext';
import './LoginPopUp.css';

function LoginPopUp({ setShowLogin }) {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [message, setMessage]           = useState('');
  const [isPositive, setIsPositive]     = useState(false); // Track if message is positive or negative

  const { SignUp, SignIn, isLogin } = useFireContext();

  useEffect(() => {
    if (isLogin()) {
      setShowLogin(false);
    }
  }, [isLogin, setShowLogin]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');  // Clear previous message
    
    try {
      if (currentState === "Sign Up") {
        await SignUp(email, password);
        setMessage('Account created successfully');
        setIsPositive(true); // Set message to positive
      } else {
        await SignIn(email, password);
        setMessage('Logged in successfully');
        setIsPositive(true); // Set message to positive
      }
    } catch (error) {
      setIsPositive(false); // Set message to negative
      // Handle Firebase error codes
      switch (error.code) {
        case 'auth/email-already-in-use':
          setMessage('The email is already in use.');
          break;
        case 'auth/invalid-email':
          setMessage('Invalid email format.');
          break;
        case 'auth/weak-password':
          setMessage('Password should be at least 6 characters.');
          break;
        case 'auth/wrong-password':
          setMessage('Incorrect password.');
          break;
        case 'auth/user-not-found':
          setMessage('No user found with this email.');
          break;
        default:
          setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='login-popup'>
      <form className='login-form'>
        <div className="loginPopUpTitle">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {currentState === 'Login' ? null : <input type="text" placeholder='Your name' required />}
          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button onClick={handleSubmit} type="submit">{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
        
        {/* Message display with conditional styling */}
        <p style={{ color: isPositive ? 'green' : 'red' }}>{message}</p>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <label>I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span></label>
        </div>
        {currentState === 'Login' ? (
          <p>Don't have an account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Click here</span></p>
        )}
      </form>
    </div>
  );
}

export default LoginPopUp;
