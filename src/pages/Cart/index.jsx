import React, { useEffect, useState } from "react";
import ShopCard from "./ShopCard";
import './Card.css'
import { getPrice } from "../../components/Card/favAndCart";
import {Link} from "react-router-dom";

export default function ShoppingCart() {

    const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem('cartList')))
    const [totalPrice, setTotalPrice] = useState(getPrice());

    useEffect(()=>{
        localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    },[totalPrice])

    const deleteItem = (id) => {
        let arr = cartItem.filter(e => e.id !== id)
        localStorage.setItem('cartList', JSON.stringify(arr))
        setCartItem(arr)
        setTotalPrice(getPrice())
    }

    const updateQuantity = () => {
        setTotalPrice(getPrice())
    }


    if (!cartItem) {
        return (
            <h4>
                The CartItem list is empty.
            </h4>
        )
    }
    let cartItemMap = cartItem.map((e) => <ShopCard
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

    return (
        <div className="shoppingCart">
            <h2>Your Shopping Cart</h2>
            <div className="principalSC">
                {cartItemMap}
            </div>
            <hr />
            <Link to={"/cart/paymentForm"}><button>Buy now !</button></Link>
        </div>
    );
}
