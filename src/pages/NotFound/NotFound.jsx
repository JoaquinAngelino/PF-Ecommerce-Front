import {Link} from 'react-router-dom'
export default function NotFound(){

  return (
    <div>
      <h1>404, Page not found</h1>
      <Link to="/home">back to <span className="notFoundSpan">/home</span></Link>
    </div>
  )
}