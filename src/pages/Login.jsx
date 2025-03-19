import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import header from '../assets/pncheader.png';
import body from '../assets/pncbankbody.png';
import Loader from '../components/loader/Loader';
import { MdKeyboardArrowRight } from 'react-icons/md';
import './login.css';
import { FaAngleDown } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from submitting the traditional way
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/user/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      navigate('/account');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Invalid credentials, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-main">
      <img src={header} alt="Header" className="login-header-img" />
      <div className="login-container">
        <div className="login-inner-container">
          <h1 className='login-form-heading'>Sign On to<strong>  Online Banking </strong>  or  <span className='highlights'>   select another service</span>  <FaAngleDown className='login-form-heading-icon'/></h1>
          <form onSubmit={handleLogin} className="login-form">
            <div className="login-form-group">
              <label htmlFor="username" className="login-label">User ID(Required)</label>
              <div className="input-bx">
                <input 
                  type="text" 
                  placeholder='user ID required' 
                  id="username" 
                  name="username" 
                  className="login-input" 
                  required 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                /><br />
              </div>
              <div className="login-form-options">
                <div className='login-remember-me-bx'>
                  <input type="checkbox" name="remember-me" className="login-checkbox" />
                  <label className="login-remember-me-label">Remember me</label>
                </div>
              </div>
            </div>

            <div className="login-form-group">
              <label htmlFor="password" className="login-label">Password (required)</label> 
              <div className="input-bx">
                <input 
                  type="password" 
                  placeholder='password required' 
                  id="password" 
                  name="password" 
                  className="login-input" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                /><br />
              </div>
              <div className="login-form-options">
                <div className="login-help-links">
                  <a href="/forgot-username" className="login-forgot-link">Forgot ID or password?</a>
                </div>
              </div>
            </div>
            <div className='login-form-group'>
              <label htmlFor="" style={{ color: "#f0f0f0" }}>.</label>
              <button type="submit" className="login-sign-in-button" disabled={loading}>
                {loading ? <Loader /> : 'Sign in'}
              </button> <br />
              <div className="login-form-options">
                <div className="login-help-links login-help-links-2">or
                  <a href="/setup-access" className="login-setup-link">Enroll in Online Banking</a>
                </div>
              </div>
            </div>
          
          </form>
            {/* Error message with inline styling */}
            {errorMessage && (
              <div 
                style={{ 
                  color: 'red', 
                  fontSize: '14px', 
                  marginTop: '10px', 
                  textAlign: 'center', 
                  padding: '10px', 
                  backgroundColor: '#ffe6e6', 
                  border: '1px solid #ffcccc', 
                  borderRadius: '5px', 
                  marginBottom: "10px"
                }}
              >
                {errorMessage}
              </div>
            )}
        </div>
      </div>
      <img src={body} alt="Footer" className="login-body-img" />
    </main>
  );
}

export default Login;