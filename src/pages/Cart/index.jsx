import DbCart from "./DbCart";
import LocalCart from "./LocalCart";
import Loading from "../../components/Loading/Loading";
import { useAuth0 } from "@auth0/auth0-react";

export default function Cart() {
  const { user, isLoading } = useAuth0()

  if (isLoading) {
    return (<Loading />)
  }
  console.log("CART");
  return user ? <DbCart user={user}/> : <LocalCart />
}