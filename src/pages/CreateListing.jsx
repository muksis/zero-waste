import { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../components/Spinner';

const CreateListing = () => {
  const [geolocationIsEnabled, setGeolocationIsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (images.length > 6) {
      setIsLoading(false);
      toast.error('Max 6 images');
      return;
    }

    let geolocation = {};
    let location;

    if (geolocationIsEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
      );

      const data = await response.json();

      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location =
        data.status === 'ZERO_RESULTS'
          ? undefined
          : data.results[0]?.formatted_address;

      if (location === undefined || location.includes('undefined')) {
        setIsLoading(false);
        toast.error('Please enter a correct address');
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
      location = address;
    }

    // Store image in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, 'images/' + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setIsLoading(false);
      toast.error('Images not uploaded');
      return;
    });

    setIsLoading(false);
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

  if (isLoading) {
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
            Name of the Item
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
                  min='1'
                  max='100000'
                  required
                />
                {type === 'rent' && <p className='formPriceText'>$ / month</p>}
              </div>
            </>
          )}

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

          {!geolocationIsEnabled && (
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

          <button className='primaryButton createListingButton' type='submit'>
            Create Listing
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateListing;
