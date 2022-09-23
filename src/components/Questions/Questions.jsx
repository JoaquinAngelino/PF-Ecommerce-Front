import { useAuth0, user } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createQuestion,  getRole, createAnswer } from '../../redux/actions';
import 'bootstrap/dist/css/bootstrap.css';
import {
   Button,
   Modal,
   ModalBody,
   FormGroup,
   ModalFooter,
 } from "reactstrap";

const Questions = ({cellId, q}) => {

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
      id: "",
      modal:false
   })

   useEffect(() => {
      if (isAuthenticated) {
         dispatch(getRole(user.email));
         setQuestion({
            ...question,
            emailUser: user.email
         })
      }

   }, [dispatch, q])


   const handleChange = (e) => {
      const { name, value } = e.target;
      setQuestion({
         ...question,
         [name]: value,
      });
   }

   const createQ = () => {
      if(question.question.length > 0){
         dispatch(createQuestion(question));
         window.alert("Question sent!");
         setQuestion({
            question: "",
            emailUser: "",
            id: cellId
         })
      }
   }

   
   const sendDataQuestions = (e, questionId, question) => {
      setAnswer({
         ...answer,
         id: questionId,
         question: question,
         modal:true 
      });
   }
   
   const createA = () => {
      dispatch(createAnswer(answer))
      window.alert("Answer sent!");
      setAnswer({
         answer: "",
         id:""
      })
   }

   const closeModal= () => {
      setAnswer({
         ...answer,
         modal:false
      })
   }

   const handleChangeAnswer = (e) => {
      const { value } = e.target;
      setAnswer({
         ...answer,
         answer: value,
      });
   }



   return (
      <div>

         <div className="container">
            {isAuthenticated ?
               <div>
                  <h1>Ask your question</h1>
                  <h3>{user.name}:</h3>
                  <input type="text" onChange={(e) => handleChange(e)} name="question" value={question.question}></input>
                  <button type="button" className="btn btn-outline-primary" onClick={() => createQ()}>Create Question</button>
               </div>
               : <h2>Inicie Sesion</h2>}
         </div>
         <div>
            {q && q.length >= 0 ? q.map((c, index) => {
                  return (
                     <div key={index}>
                        <h5>Question:</h5>
                        <p>{c.question}</p>
                        <h5>Answer:</h5>
                        <p>{c.answer}</p>   
                        {
                           admin ?
                              <div>
                                 {c.answer ? 
                                    <button type="button" onClick={(e) => sendDataQuestions(e, c.id, c.question)}>Change Answer</button>
                                    :<button type="button" onClick={(e) => sendDataQuestions(e, c.id, c.question)}>Answer</button>
                                 }
                              </div>
                              : ""
                        }
                        <h3>-------------------</h3>
                     </div>
                  )
               })
            : <h2>No hay preguntas</h2>}
         </div>
         <Modal isOpen={answer.modal}>
            <ModalBody>
               <FormGroup>
                  <label>Question:</label>
                  <input className="form-control" readOnly type="text"  value={answer.question} />
               </FormGroup>
                                             
               <FormGroup>
                  <label>Answer:</label>
                  <input className="form-control"  type="text" onChange={(e) => handleChangeAnswer(e)} value={answer.answer}/>
               </FormGroup>
            </ModalBody>
            <ModalFooter>
               <Button color="primary" onClick={() => createA()}>Editar</Button>
               <Button color="danger" onClick={() => closeModal()}>Cancelar</Button>
            </ModalFooter>
         </Modal>

      </div>
   )
}

export default Questions