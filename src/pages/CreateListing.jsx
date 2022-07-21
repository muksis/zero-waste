import { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const CreateListing = () => {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    address: '',
    price: 0,
    description: '',
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const {
    type,
    name,
    address,
    price,
    description,
    images,
    latitude,
    longitude,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate('/sign-in');
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleMutate = (e) => {
    let boolean = null;

    if (e.target.value === 'true') {
      boolean = true;
    }

    if (e.target.value === 'false') {
      boolean = false;
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    //Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='profile'>
      <header>
        <p className='pageHeader'>Create a Listing</p>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor='type' className='formLabel'>
            Sell / Let / Give Away
          </label>
          <div className='formButtons'>
            <button
              type='button'
              className={type === 'sale' ? 'formButtonActive' : 'formButton'}
              id='type'
              value='sale'
              onClick={handleMutate}
            >
              Sell
            </button>
            <button
              type='button'
              className={type === 'rent' ? 'formButtonActive' : 'formButton'}
              id='type'
              value='rent'
              onClick={handleMutate}
            >
              Let
            </button>
            <button
              type='button'
              className={type === 'free' ? 'formButtonActive' : 'formButton'}
              id='type'
              value='free'
              onClick={handleMutate}
            >
              Give Away
            </button>
          </div>

          <label htmlFor='name' className='formLabel'>
            Name
          </label>
          <input
            className='formInputName'
            type='text'
            id='name'
            value={name}
            onChange={handleMutate}
            maxLength='32'
            minLength='10'
            required
          />

          <label htmlFor='address' className='formLabel'>
            Address
          </label>
          <textarea
            className='formInputAddress'
            type='text'
            id='address'
            value={address}
            onChange={handleMutate}
            required
          />

          {!geolocationEnabled && (
            <div className='formLatLng flex'>
              <div>
                <label htmlFor='latitude' className='formLabel'>
                  Latitude
                </label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='latitude'
                  value={latitude}
                  onChange={handleMutate}
                  required
                />
              </div>
              <div>
                <label htmlFor='longitude' className='formLabel'>
                  Longitude
                </label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='longitude'
                  value={longitude}
                  onChange={handleMutate}
                  required
                />
              </div>
            </div>
          )}

          {type !== 'free' && (
            <>
              <label htmlFor='price' className='formLabel'>
                Price
              </label>
              <div className='formPriceDiv'>
                <input
                  className='formInputSmall'
                  type='number'
                  id='price'
                  value={price}
                  onChange={handleMutate}
                  min='50'
                  max='750000000'
                  required
                />
                {type === 'rent' && <p className='formPriceText'>$ / month</p>}
              </div>
            </>
          )}

          <label htmlFor='description' className='formLabel'>
            Description
          </label>
          <textarea
            className='formInputAddress'
            type='text'
            id='description'
            value={description}
            onChange={handleMutate}
            required
          />

          <label htmlFor='images' className='formLabel'>
            Images
          </label>
          <p className='imagesInfo'>
            The first image will be the cover (max 6).
          </p>
          <input
            className='formInputFile'
            type='file'
            id='images'
            onChange={handleMutate}
            max='6'
            accept='.jpg, .png, .jpeg'
            multiple
            required
          />

          <button className='primaryButton createListingButton' type='submit'>
            Create Listing
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateListing;
