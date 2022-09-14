import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NothingFound from "../NothingFound/NothingFound"
import ProductCard from "./ProductCard"

export default function CardContainer() {
  const dispatch = useDispatch()
  const [products, setProducts] = useSelector(state => state.products)
  useEffect(() => {
    //dispatch(getAllProducts())
  })

  if (!products || !products.length) {
    return (<NothingFound />)
  }
  

  const mapedProducts = products.map(e => <ProductCard
    key={e.id}
    id={e.id}
    linea={e.linea}
    modelo={e.modelo}
    precio={e.precio}
    capacidad={e.capacidad}
    imagen={e.imagen}
    stock={e.stock}
  />)

  return (
    { mapedProducts }
  )
}