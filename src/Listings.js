// import Search from './Search';
import { ListGroup } from 'react-bootstrap';
import {useState, useEffect} from "react";
import Listing from './Listing';
import ShareBnBApi from "./apiHelper";
import SearchForm from './SearchForm';
// import { Link } from 'react-router-dom';



/**  Listings Component
 * Props:
 * State:
 *  - listings: array of objects containing listing information
 *    [{id, name, price, capacity, zipcode}, ...]
 *
 * App -> Listings
 */
function Listings(){
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(function getAllListingsOnMount() {
    async function getAllListings() {
      let listings = await ShareBnBApi.getAllListings();
      setListings(listings);
      setIsLoading(false);
    }
    if (isLoading) getAllListings();
  }, [isLoading]);

  async function fetchListingsByTerm(searchTerm){
    let listings = await ShareBnBApi.getListingsByTerm(searchTerm);
    setListings(listings);
    setIsLoading(false);
  }

  return(
    <div>
      <h2>Book a covid-safe outdoor location!</h2>
      <SearchForm searchListings={fetchListingsByTerm}/>
      <ListGroup>
        {listings.map(l => (
          <Listing
            key={l.id}
            id={l.id}
            name={l.name}
            price={l.price}
            capacity={l.capacity}
            zipcode={l.zipcode}
            photoUrl={l.photoUrl}
            />
          ))
        }
      </ListGroup>
    </div>
  );
}
export default Listings;
