import { useAuth0, user } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createAnswer, createQuestion, getRole } from '../../redux/actions';

const Questions = ({ cellId, q }) => {

   const dispatch = useDispatch();
   const admin = useSelector((state) => state.admin)
   const { user, isAuthenticated } = useAuth0();
   const [question, setQuestion] = useState({
      question: "",
      emailUser: "",
      id: cellId
   })
   const [answer, setAnswer] = useState({
      answer: "",
      id: ""
   })

   useEffect(() => {
      if (isAuthenticated) {
         dispatch(getRole(user.email));
         setQuestion({
            ...question,
            emailUser: user.email
         })
      }
   }, [dispatch])


   const handleChange = (e) => {
      const { name, value } = e.target;
      setQuestion({
         ...question,
         [name]: value,
      });
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      if (question.question.length === '') {
         alert('Please fill in the fields')
      }
      dispatch(createQuestion(question));
      setQuestion({
         question: "",
         emailUser: "",
         id: cellId
      })
      window.alert("Question sent!")
   }

   const handleChangeA = (e, questionId) => {
      const { name, value } = e.target;
      setAnswer({
         ...answer,
         [name]: value,
         id: questionId
      });
   }

   const handleSubmitAnswer = (e) => {
      e.preventDefault();
      if (answer.answer.length === '') {
         alert('Please fill in the fields')
      }
      dispatch(createAnswer(answer))
      setAnswer({
         answer: "",
         id: ""
      })
   }

   return (
      <div>
         <div className="container">
            {isAuthenticated ?
               <div>
                  <h1>Ask your question</h1>
                  <h3>{user.name}:</h3>
                  <input type="text" onChange={(e) => handleChange(e)} name="question" value={question.question}></input>
                  <button type="button" className="btn btn-outline-primary" onClick={(e) => handleSubmit(e)}>Create Question</button>
               </div>
               : <h2>Inicie Sesion</h2>}
         </div>
         <div>
            {q && q.length > 0 ? q.map((c, index) => {
               return (
                  <div key={index}>
                     <p>{c.question}</p>
                     <p>{c.answer}</p>
                     {
                        admin ?
                           <div>
                              <div>
                                 <input type="text" onChange={(e) => handleChangeA(e, c.id)} name="answer" value={answer.answer} placeholder='Answer..'></input>
                                 <button type="button" className="btn btn-outline-primary" onClick={(e) => handleSubmitAnswer(e)}>submit</button>
                              </div>
                           </div>
                           : ""
                     }
                  </div>
               )
            }) : <h2>No hay preguntas</h2>
            }
         </div>
      </div>
   )
}

export default Questions