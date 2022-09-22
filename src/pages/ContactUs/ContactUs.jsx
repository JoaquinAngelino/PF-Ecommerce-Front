import { useState } from "react"
import './ContactUs.css'
import * as yup from 'yup';
import axios from "axios";

export default function ContactUs() {
  yup.setLocale({
    string: {
      min: 'Message must be longer than ${min}',
    },
  });
  let schema = yup.object().shape({
    subject: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().min(10).required()
  })

  const [error, setError] = useState("")
  const [input, setInput] = useState({
    subject: "",
    name: "",
    email: "",
    message: "",
  })

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    schema.validate(input)
      .then(async (value) => {
        await axios.post("http://localhost:3001/send-claim", value)
        setInput({ subject: "", name: "", email: "", message: "" })
        setError("")
      }
      )
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <div className="FormDiv">
      <h2>If you have any doubts, please let us know</h2>
      <form className="LogInForm" >
        <label className="FormLabel">Issue</label>
        <select className="FormInput" type="text" name="subject" value={input.subject} onChange={(e) => handleChange(e)} >
          <option>Select one</option>
          <option value="product" defaultValue>Product</option>
          <option value="service" >Service</option>
          <option value="other">Other</option>
        </select>
        <input className="FormInput" value={input.name} onChange={(e) => handleChange(e)}
          type='text' placeholder="Your name" name="name" required />
        <input
          className="FormInput" value={input.email} onChange={(e) => handleChange(e)}
          type='email' placeholder="Your email" name="email" required />
        <label className="FormLabel">Message</label>
        <textarea className="FormInput FormTextArea" type="textarea" name="message" value={input.message} onChange={(e) => handleChange(e)} cols="30" rows="10"></textarea>
        <p className="inputError">{error}</p>
        <button className="SubmitBtn" type="submit" onClick={handleSubmit}>Send</button>
      </form>
    </div>
  )
}