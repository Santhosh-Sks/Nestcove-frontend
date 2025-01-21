// Import dependencies
import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState, useCallback } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList;
  console.log(user);

  const dispatch = useDispatch();

  // Memoize getPropertyList to avoid recreation
  const getPropertyList = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/users/${user._id}/properties`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data);
      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch all properties failed", err.message);
    }
  }, [user._id, dispatch]); // Add `user._id` and `dispatch` as dependencies

  // useEffect to call getPropertyList
  useEffect(() => {
    getPropertyList();
  }, [getPropertyList]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Property List</h1>
      <div className="list">
        {propertyList?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
              key={_id} // Add a unique key for each list item
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default PropertyList;
