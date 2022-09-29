import React, { useEffect, useState } from "react";
import ShopCard from "./ShopCard";
import './Card.css'
import { getPrice } from "../../components/Card/favAndCart";

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

    let cartItemMap = null
    if (cartItem) {
        cartItemMap = cartItem.map((e) => <ShopCard
            key={e.id}
            id={e.id}
            line={e.line}
            model={e.model}
            stock={e.stock}
            capacity={e.capacity}
            memoryRAM={e.memoryRAM}
            price={e.price}
            brand={e.brand}
            image={e.image}
            deleteItem={deleteItem}
            updateQuantity={updateQuantity}
            quantity={e.quantity}
        />
        )
    }

    return (
        <div className="shoppingCart">
            <h2>Your Shopping Cart: {totalPrice}</h2>
            <div className="principalSC">
                {cartItemMap}
            </div>
            <hr />
            <p>Please Log in to continue shopping</p>
        </div>
    );
}
