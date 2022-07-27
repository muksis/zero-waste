import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';

const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  return (
    <li className='categoryListing'>
      <Link
        to={`/category/${listing.type}/${id}`}
        className='categoryListingLink'
      >
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className='categoryListingImg'
        />
        <div className='categoryListingDetails'>
          <p className='categoryListingLocation'>{listing.location}</p>
          <p className='categoryListingName'>{listing.name}</p>
          <p className='categoryListingPrice'>
            ${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === 'rent' && '/month'}
          </p>
        </div>
      </Link>

      {onDelete && (
        <AiFillDelete
          className='removeIcon'
          fill='rgb(231, 76, 60'
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}

      {onEdit && <MdEdit className='editIcon' onClick={() => onEdit(id)} />}
    </li>
  );
};

export default ListingItem;
