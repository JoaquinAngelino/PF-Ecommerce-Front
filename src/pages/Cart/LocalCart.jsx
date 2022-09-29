import React, { useEffect, useState } from "react";
import ShopCard from "./ShopCard";
import './Card.css'
import { getPrice } from "../../components/Card/favAndCart";
import NothingFound from "../../components/NothingFound/NothingFound";

export default function LocalCart() {

    const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem('cartList')))
    const [totalPrice, setTotalPrice] = useState(getPrice());

    useEffect(() => {
        localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    }, [totalPrice])

    const deleteItem = (id) => {
        let arr = cartItem.filter(e => e.id !== id)
        localStorage.setItem('cartList', JSON.stringify(arr))
        setCartItem(arr)
        setTotalPrice(getPrice())
    }

    const updateQuantity = () => {
        setTotalPrice(getPrice())
    }

    if(!cartItem){return <NothingFound/>}
    console.log("before render", totalPrice);

    return (
        <div className="shoppingCart">
            <h2>Your Shopping Cart: {totalPrice}</h2>
            <div className="principalSC">
                {cartItem.map(e => <ShopCard
                    key={e.id}
                    id={e.id}
                    model={e.model}
                    stock={e.stock}
                    price={e.price}
                    image={e.image}
                    deleteItem={deleteItem}
                    updateQuantity={updateQuantity}
                    quantity={e.quantity}
                />
                )}
            </div>
            <hr />
            <p>Please Log in to continue shopping</p>
        </div>
    );
}
