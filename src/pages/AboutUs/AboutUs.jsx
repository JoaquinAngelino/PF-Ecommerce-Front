import { BsGithub, BsLinkedin } from 'react-icons/bs';
import './AboutUs.css'
import frank from "./frank.jpeg"

export default function AboutUs() {

  return (
    <div className="Flexing">
      <h1 className="TitleAbout">OUR STAFF</h1>
      <hr />
      <span className="Text">We are a team of web developers that wants to make your dreams come true.</span>
      <div className="TeamDiv">
        <div className='TeamCard'>
          <img className='imageAboutUs' src="https://avatars.githubusercontent.com/u/96893105?v=4" alt="Joaquín Angelino Corona" />
          <p>Joaquín Angelino Corona</p>
          <div >
            <a rel="noreferrer" target="_blank" href="https://github.com/JoaquinAngelino">
              <BsGithub className='CardIcon' />
            </a>
            <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/joaquin-angelino-corona/">
              <BsLinkedin className='CardIcon' />
            </a>
          </div>
        </div>
        <div className='TeamCard'>
          <img className='imageAboutUs' src="https://avatars.githubusercontent.com/u/77042064?v=4" alt="Andres Sanchez de La Fuente" />
          <p>Andres Sanchez de la Fuente</p>
          <div className='IconDiv'>
            <a rel="noreferrer" target="_blank" href="https://github.com/asdelaf  ">
              <BsGithub className='CardIcon' />
            </a>
            <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/andres-sanchez-de-la-fuente/">
              <BsLinkedin className='CardIcon' />
            </a>
          </div>
        </div>
        <div className='TeamCard'>
          <img className='imageAboutUs' src={frank} alt="Frank Smith" />
          <p>Frank Smith</p>
          <div className='IconDiv'>
            <a rel="noreferrer" target="_blank" href="https://github.com/12frankporx">
              <BsGithub className='CardIcon' />
            </a>
            <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/frank-smith-bocangelino-rojas-351157168/">
              <BsLinkedin className='CardIcon' />
            </a>
          </div>
        </div>
        <div className='TeamCard'>
          <img className='imageAboutUs' src="https://avatars.githubusercontent.com/u/83725367?v=4" alt="Federico Valdez" />
          <p>Federico Valdez</p>
          <div className='IconDiv'>
            <a rel="noreferrer" target="_blank" href="https://github.com/fvaldezz96">
              <BsGithub className='CardIcon' />
            </a>
            <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/fede-valdez-205499211/">
              <BsLinkedin className='CardIcon' />
            </a>
          </div>
        </div>
        <div className='TeamCard'>
          <img className='imageAboutUs' src="https://avatars.githubusercontent.com/u/94063603?v=4" alt="Ayrton Acevedo" />
          <p>Ayrton Acevedo</p>
          <div className='IconDiv'>
            <a rel="noreferrer" target="_blank" href="https://github.com/ayrtonacevedo">
              <BsGithub className='CardIcon' />
            </a>
            <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/ayrton-nahir-arroyo-acevedo-b795b0212">
              <BsLinkedin className='CardIcon' />
            </a>
          </div>
        </div>
        <div className='TeamCard'>
          <img className='imageAboutUs' src="https://avatars.githubusercontent.com/u/72768487?v=4" alt="Juan David Pabon" />
          <p>Juan David Pabon</p>
          <div className='IconDiv'>
            <a rel="noreferrer" target="_blank" href="https://github.com/juandavid84">
              <BsGithub className='CardIcon' />
            </a>
            <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/juan-david-pabon-porras-4123b389/">
              <BsLinkedin className='CardIcon' />
            </a>
          </div>
        </div>

      </div>
    </div>






  )
}