import { useAuth0, user } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createQuestion, getRole, createAnswer } from '../../redux/actions';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.css';
import toast, { Toaster } from 'react-hot-toast';
import './Questions.css';


import {
   Button,
   Modal,
   ModalBody,
   FormGroup,
   ModalFooter,
} from "reactstrap";


const Questions = ({ cellId, q, get }) => {

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
      modal: false
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
      e.preventDefault()
      const { name, value } = e.target;
      setQuestion({
         ...question,
         [name]: value,
      });
   }

   const createQ = (e) => {
      e.preventDefault()
      if (question.question.length > 0) {
         dispatch(createQuestion(question));
         toast.success(`Question sent!`);
         // window.alert("Question sent!");
         setQuestion({
            question: "",
            emailUser: "",
            id: cellId
         })
         get();
      }
   }

   const sendDataQuestions = (e, questionId, question) => {
      e.preventDefault();
      setAnswer({
         ...answer,
         id: questionId,
         question: question,
         modal: true
      });
   }

   const createA = (e) => {
      e.preventDefault();
      dispatch(createAnswer(answer))
      toast.success(`Answer sent!`);
      // window.alert("Answer sent!");
      setAnswer({
         answer: "",
         id: ""
      })
      get();
   }

   const closeModal = () => {
      setAnswer({
         ...answer,
         modal: false
      })
   }

   const handleChangeAnswer = (e) => {
      e.preventDefault();
      const { value } = e.target;
      setAnswer({
         ...answer,
         answer: value,
      });
   }

   return (
      <div>
         <div >
            {isAuthenticated ?
               <div>
                  <div className=''>
                     <h1>Ask your question</h1>
                     <h3>{user.name}:</h3>
                  </div>
                  <div className=''>
                     <input type="text" className='' onChange={(e) => handleChange(e)} name="question" value={question.question}></input>
                     <button type="button" className="btn btn-outline-primary" onClick={() => createQ()}>Create Question</button>
                  </div>
               </div>
               : <h2 >Login...</h2>
            }
            <div>
               {q && q.length >= 0 ? q.map((c, index) => {
                  return (
                     <div key={index}>
                        <Accordion className="fixed-center">
                           <Accordion.Item eventKey="0" >
                              <Accordion.Header className="questions">
                                 <p>{c.question}</p>
                              </Accordion.Header>
                              <Accordion.Body className="answer">
                                 <p>{c.answer}</p>
                                 {
                                    admin ?
                                       <div>
                                          {
                                             c.answer ?
                                                <button type="button" className='btn btn-outline-primary' onClick={(e) => sendDataQuestions(e, c.id, c.question)}>Change Answer</button>
                                                : <button type="button" className='btn btn-outline-primary' onClick={(e) => sendDataQuestions(e, c.id, c.question)}>Answer</button>
                                          }
                                       </div>
                                       : ""
                                 }
                              </Accordion.Body>
                           </Accordion.Item>
                        </Accordion>
                     </div>
                  )
               })
                  :
                  <h2>No hay preguntas</h2>
               }
            </div>
         </div>
         <Modal isOpen={answer.modal}>
            <ModalBody>
               <FormGroup>
                  <label>Question:</label>
                  <input className="form-control" readOnly type="text" value={answer.question} />
               </FormGroup>
               <FormGroup>
                  <label>Answer:</label>
                  <input className="form-control" type="text" onChange={(e) => handleChangeAnswer(e)} value={answer.answer} />
               </FormGroup>
            </ModalBody>
            <ModalFooter>
               <Button color="primary" onClick={() => createA()}>Editar</Button>
               <Button color="danger" onClick={() => closeModal()}>Cancelar</Button>
            </ModalFooter>
         </Modal>
         <Toaster
            position="button-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
               className: '',
               duration: 5000,
               style: {
                  background: '#363636',
                  color: '#fff',
               },
               success: {
                  duration: 3000,
                  theme: {
                     primary: 'green',
                     secondary: 'black',
                  },
               },
            }}
         />
      </div>
   )
}

export default Questions