import axios from "axios";
import ReactStars from 'react-stars';
import { useEffect, useState } from "react";
import { useAuth0, user } from '@auth0/auth0-react';
import { useDispatch } from "react-redux";
import { getRole } from "../../redux/actions";

const Ratings = ({ cellId, r, get }) => {

   const dispatch = useDispatch();
   const { user, isAuthenticated } = useAuth0();

   const [rating, setRating] = useState({
      id: cellId,
      rating: 0,
      comment: "",
      emailUser: ""
   });

   const ratingChanged = (newRating) => {
      setRating({
         ...rating,
         rating: newRating
      });
   }

   const handleChange = (e) => {
      e.preventDefault()
      const { name, value } = e.target
      setRating({
         ...rating,
         [name]: value
      });
   }

   const createRating = async (e) => {
      e.preventDefault()
      if (Object.keys(rating).length > 0) {
         console.log(rating, 'soy el dato')
         await axios.post(`/rating/${cellId}`, rating);
         window.alert("rating sent!");
         setRating({
            rating: 0,
            comment: "",
            emailUser: ""
         })
         get();
      }
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
            <div style={styles.stars}>
               <ReactStars
                  count={5}
                  value={rating.rating}
                  half={false}
                  onChange={ratingChanged}
                  size={24}
                  edit={true}
                  color2={'#ffd700'} />
            </div>
            <textarea
               type="text"
               name="comment"
               value={rating.comment}
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


