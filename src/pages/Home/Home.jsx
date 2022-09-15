import CardContainer from "../../components/CardContainer/CardContainer";
import Filters from "../../components/Filters/Filters";
import Pagination from "../../components/Pagination/Pagination";


export default function Home() {

  return (
    <>
      <Filters />
      <CardContainer />
      <Pagination />
    </>
  )
}