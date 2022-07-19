import { Link } from 'react-router-dom';
import together from '../assets/png/together.png';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';

function Home() {
  return (
    <div className='home'>
      <header>
        <p className='pageHeader'>
          <img src={together} alt='together' width='24px' height='24px' />
          Home
        </p>
      </header>

      <main>
        {/* Slider */}

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
          <Link to='/category/sell'>
            <img
              src={sellCategoryImage}
              alt='sell'
              className='homeCategoryImg'
            />
            <p className='homeCategory'>Things for sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Home;
