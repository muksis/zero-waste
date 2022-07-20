import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FaChevronRight } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('email was sent');
    } catch (error) {
      toast.error('Could not send reset email');
    }
  };

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Forgot Password</p>

        <main>
          <form onSubmit={onSubmit}>
            <input
              type='email'
              className='emailInput'
              placeholder='Email'
              id='email'
              value={email}
              onChange={onChange}
            />
            <Link className='forgotPasswordLink' to='/sign-in'>
              Sign In
            </Link>

            <div className='signInBar'>
              <div className='signInText'>Send Reset Link</div>
              <button className='signInButton'>
                <FaChevronRight fill='#fff' width='34px' height='34px' />
              </button>
            </div>
          </form>
        </main>
      </header>
    </div>
  );
};

export default ForgotPassword;
