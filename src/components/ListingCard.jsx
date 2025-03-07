import { useState } from "react";
import "../styles/ListingCard.scss";
import { ArrowForwardIos, ArrowBackIosNew} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
//import { useSelector, useDispatch } from "react-redux";
//import { setWishList } from "../redux/state";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  //const dispatch = useDispatch();

  //const user = useSelector((state) => state.user);
  //const wishList = user?.wishList || [];

  //const isLiked = wishList?.some((item) => item?._id === listingId);

 /* const patchWishList = async () => {
    if (user?._id !== creator._id) {
      try {
        const response = await fetch(
          `https://nestcove-be.onrender.com/users/${user?._id}/${listingId}`,
          {
            method: isLiked ? "DELETE" : "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          dispatch(setWishList(data.wishList));
        } else {
          console.error("Error updating wishlist:", data);
        }
      } catch (error) {
        console.error("Failed to update wishlist:", error);
      }
    }
  };
*/
  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  return (
    <div
      className="listing-card"
      onClick={() => {
        navigate(`/properties/${listingId}`);
      }}
    >
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
            <img
              src={`https://nestcove-be.onrender.com/${photo.replace('public\\', '')}`} 
                  alt={`Slide ${index}`}
                className="listing-image"
                  />


              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide();
                }}
                
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide();
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3>
        {city}, {province}, {country}
      </h3>
      <p>{category}</p>

      {!booking ? (
        <>
          <p>{type}</p>
          <p>
            <span>${price}</span> per night
          </p>
        </>
      ) : (
        <>
          <p>
            {startDate} - {endDate}
          </p>
          <p>
            <span>${totalPrice}</span> total
          </p>
        </>
      )}

    </div>
  );
};

export default ListingCard;
