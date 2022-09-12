import React from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs';

export default function AboutUs() {

  return (
    <div>
      <h1>OUR STAFF</h1>
      <hr/>
      <span>We are a team of web developers that wants to make your dreams come true.</span>
      <div>
        <div className='TeamCard'>
          <img className='imageAboutUs' src="https://avatars.githubusercontent.com/u/96893105?v=4" alt="Joaquín Angelino Corona" />
          <p>Joaquín Angelino Corona</p>
          <div className='IconDiv'>
            <a rel="noreferrer" target="_blank" href="https://github.com/JoaquinAngelino">
              <BsGithub className='CardIcon' />
            </a>
            <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/joaquin-angelino-corona/">
              <BsLinkedin className='CardIcon' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}