import { useState } from "react"

export default function ContactUs() {


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

  function handleSubmit(e) {
    e.preventDefault();
    setInput({
      subject: "",
      name: "",
      email: "",
      message: "",
    })
  }

  return (
    <div>
      <h2>If you have any doubts, please let us know</h2>
      <form>
        <label>Issue</label>
        <select type="text" name="subject" value={input.subject} onChange={(e) => handleChange(e)} >
          <option value="product" defaultValue>Product</option>
          <option value="service" >Service</option>
          <option value="other">Other</option>
        </select>
        <input value={input.name} onChange={(e) => handleChange(e)} type='text' placeholder="Your name" name="name" required />
        <input value={input.email} onChange={(e) => handleChange(e)} type='email' placeholder="Your email" name="email" required />
        <label>Message</label>
        <textarea type="textarea" name="message" value={input.message} onChange={(e) => handleChange(e)} cols="30" rows="10"></textarea>
        <button type="submit" onClick={handleSubmit}>Send</button>
      </form>
    </div>
  )
}