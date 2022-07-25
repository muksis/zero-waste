import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import together from '../assets/png/together.png';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import saleCategoryImage from '../assets/jpg/saleCategoryImage.jpg';

const Home = () => {
  return (
    <div className='home'>
      <header>
        <p className='pageHeader'>
          <img src={together} alt='together' width='24px' height='24px' />
          Home
        </p>
      </header>

      <main>
        <Slider />

        <p className='homeCategoryHeading'>Categories</p>
        <div className='homeCategories'>
          <Link to='/category/rent'>
            <img
              src={rentCategoryImage}
              alt='rent'
              className='homeCategoryImg'
            />
            <p className='homeCategory'>Things for rent</p>
          </Link>
          <Link to='/category/sale'>
            <img
              src={saleCategoryImage}
              alt='sale'
              className='homeCategoryImg'
            />
            <p className='homeCategory'>Things for sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
