import CardContainer from "../../components/CardContainer/CardContainer";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import Pagination from "../../components/Pagination/Pagination";


export default function Home() {

  return (
    <>
      <h1>Home</h1>
      <NavBar/>
      <CardContainer />
      <Pagination />
      <Footer />
    </>
  )
}