import { useAuth0, user } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createQuestion, getQuestion, getRole } from '../../redux/actions';


const Questions = (id) => {

   const dispatch = useDispatch();
   const admin = useSelector((state) => state.admin)
   const { user, isAuthenticated } = useAuth0();
   const [question, setQuestion] = useState({
      question: "",
      emailUser: ""
   })
   const allQuestion = useSelector(state => state.resQuestion);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setQuestion({
         ...question,
         [name]: value,
      });
   }

   const handleSubmit = () => {

      dispatch(createQuestion(question, id));
      // console.log(createQuestion(), "soy lo que sale del front ")
      window.alert("Question sent!")
   }

   useEffect(() => {
      // console.log(id)
      dispatch(getQuestion(id.id))
      if (isAuthenticated) {
         dispatch(getRole(user.email));
         setQuestion({
            ...question,
            emailUser: user.email
         })
      }
   }, [dispatch, id.id])

   return (
      <div>
         <div className="container">
            {isAuthenticated ?
               <div>
                  <h1>Ask your question</h1>
                  <h3>{user.name}:</h3>
                  <input type="text" onChange={(e) => handleChange(e)} name="question" value={question.question}></input>
                  <button type="button" className="btn btn-outline-primary" onClick={() => handleSubmit()}>Create Question</button>
               </div>
               : <h2>Inicie Sesion</h2>}
         </div>
         <div>
            {
               allQuestion && allQuestion.map((e, index) => {
                  return (
                     <div key={index}>
                        <p>{e.question}</p>
                        <p>{e.answer}</p>
                        {
                           admin ?
                              <div>
                                 <form action="">
                                    <input type="text" placeholder='res'></input>
                                    <button>submit</button>
                                 </form>
                              </div> : ""
                        }
                     </div>
                  )
               })
            }
         </div>
      </div>
   )
}

export default Questions