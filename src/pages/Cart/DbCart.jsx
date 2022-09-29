import { useEffect, useState } from "react";
import './Card.css'
import { getPrice } from "../../components/Card/favAndCart";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, getUserCart } from "../../redux/actions";
import NothingFound from "../../components/NothingFound/NothingFound";
import DbShopCard from "./DbShopCard";
import Loading from "../../components/Loading/Loading";

export default function DbCart({ user }) {
    const [totalPrice, setTotalPrice] = useState(0);
    const cart = useSelector(state => state.cart);
    const isLoading = useSelector(state => state.isLoading);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserCart(user.email))
    }, [dispatch])

    const updateQuantity = (id, quantity) => { 
        let found = cart.find(e => e.id === id)
        found.quantity = quantity
        let total = 0
        cart.forEach(e => { total += e.price * (e.quantity ? e.quantity : 1) })
        setTotalPrice(total.toFixed(2))
    }

    const deleteItem = async (id) => {
        dispatch(deleteFromCart(user.email, id))
        setTotalPrice(getPrice())
    }
    
    
    if (isLoading) { return (<Loading />) }
    if (!cart.length) { return (<NothingFound />) }    
    return (
        <div className="shoppingCart">
            <h2>Your Shopping Cart: {totalPrice}</h2>
            <div className="principalSC">
                {cart?.map((e) => <DbShopCard
                    key={e.id}
                    id={e.id} 
                    model={e.model}
                    stock={e.stock}
                    price={e.price}
                    image={e.image}
                    deleteItem={deleteItem}
                    updateQuantity={updateQuantity}
                    quantity={e.quantity || 1}
                />)}
            </div>
            <hr />
            <Link to={"/cart/paymentForm"}><button>Buy now !</button></Link>
            <Toaster position="bottom-right" reverseOrder={false} />
        </div>
    );
}
