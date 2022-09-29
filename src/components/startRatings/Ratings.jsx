import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useAuth0, user } from '@auth0/auth0-react';
import { useDispatch } from "react-redux";
import { postRating, getRole } from "../../redux/actions";

const colors = {
   orange: "#FFBA5A",
   grey: "#a9a9a9"
};

const Ratings = ({ cellId, r, get }) => {

   const dispatch = useDispatch();
   const { user, isAuthenticated } = useAuth0();

   const [currentValue, setCurrentValue] = useState(0);
   const [hoverValue, setHoverValue] = useState(undefined);
   const stars = Array(5).fill(0);

   const [rating, setRating] = useState({
      id: cellId,
      rating: "",
      comment: ""
   });

   const handleChange = (e) => {
      e.preventDefault()
      const { name, value } = e.target
      setRating({
         ...rating,
         [name]: value
      });
   }

   const createRating = (e) => {
      e.preventDefault()
      if (rating.rating.length > 0) {
         dispatch(postRating(rating));
         window.alert("rating sent!");
         setRating({
            rating: "",
            comment: "",
            emailUser: "",
            id: cellId
         })
         // get();
      }
   }

   const handleClick = value => {
      setCurrentValue(value)
   }

   const handleMouseOver = newHoverValue => {
      setHoverValue(newHoverValue)
   }

   const handleMouseLeave = () => {
      setHoverValue(undefined)
   }

   useEffect(() => {
      if (isAuthenticated) {
         dispatch(getRole(user.email));
         setRating({
            ...rating,
            emailUser: user.email
         })
      }
   }, [dispatch, r])

   return (
      <div>
         <form style={styles.container} onSubmit={(e) => createRating(e)}>
            <h2>Rate the product!</h2>
            {/* <div style={styles.stars}>
               {stars.map((_, index) => {
                  return (
                     <FaStar
                        key={index}
                        size={24}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                        style={{
                           marginRight: 10,
                           cursor: "pointer"
                        }}
                     />
                  )
               })}
            </div> */}
            <textarea
               type="text"
               name="rating"
               value={rating.rating}
               onChange={(e) => handleChange(e)}
               placeholder="What's your experience?"
               style={styles.textarea}
            />
            <button type="submit" className="btn btn-outline-primary">Submit</button>
         </form>
      </div>
   )
}

const styles = {
   container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
   },
   stars: {
      display: "flex",
      flexDirection: "row",
   },
   textarea: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      padding: 10,
      margin: "20px 0",
      minHeight: 100,
      width: 300
   },
   button: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      width: 300,
      padding: 10,
   }
};

export default Ratings;


