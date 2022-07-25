import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const Contact = () => {
  const [message, setMessage] = useState('');
  const [owner, setOwner] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const getOwner = async () => {
      const docRef = doc(db, 'users', params.ownerId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOwner(docSnap.data());
      } else {
        toast.error('Could not get owner data');
      }
    };

    getOwner();
  }, [params.ownerId]);

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Contact Owner</p>
      </header>

      {owner !== null && (
        <main>
          <div className='contactOwner'>
            <p className='ownerName'>Contact {owner?.name}</p>
          </div>

          <form className='messageForm'>
            <div className='messageDiv'>
              <label htmlFor='message' className='messageLabel'>
                Message
              </label>
              <textarea
                name='message'
                id='message'
                className='textarea'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <a
              href={`mailto:${owner.email}?Subject=${searchParams.get(
                'ListingName'
              )}&body=${message}`}
            >
              <button type='button' className='primaryButton'>
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
};

export default Contact;
