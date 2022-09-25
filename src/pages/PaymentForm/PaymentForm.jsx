import React from "react";
import { CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CardPayment from "../../components/Card/CardPayment/CardPayment";
import "./PaymentForm.css";


export  default function PaymentForm(){

    const dispatch = useDispatch()
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false)
    
    const totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
    const items = JSON.parse(localStorage.getItem("cartList"));
    // EMAIL Y USUARIO => FALTA
    let history = useNavigate();
    function handleRegresar(e){
        history("/cart");
    }

    async function handleSubmit(e){
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({ //Tieme objetos que debe de completar
          type: "card",  //type de pago: metodo de tarjeta
          card: elements.getElement(CardNumberElement) //Selecciona el input element de la tarjeta
        });
        setLoading(true)
        console.log(paymentMethod);

        if (!error) {
            const { id } = paymentMethod
            try {
              const { data } = await axios.post(`http://localhost:3001/checkout`, {
                id,
                amount: 100,
                // mail,
                // arr,
                // userIdName
      
              })
              console.log("Esta es la data"+data);
              alert(`You have pay $ ${totalPrice} successfully`)
              history("/")
      
            } catch (error) {
              console.log(error.message);
              
            }
            setLoading(false)
          }
    }

    return(
        <div className="conteiner-card">
            <div className="subcontainer01">
                <div className="shopping_button">
                  <input type="submit" value={'Continue Shopping'} onClick={(e) => handleRegresar(e)}/>              
                </div>
            <hr></hr>
              <div>
                    {/* Se muestra las Cartas */}
                    
                    {items && items.length ? items.map(product => {
                        return (
                            <CardPayment
                            image={product.image}
                            name={product.model}
                            price={product.price}
                            />
                        )
                    }) : <div>has no items selected!</div>}
              </div>
            </div>
            <hr />
            <div className="subcontainer02">
              <div className="containerCardDetails">
                <div className="tituloCardDetails">
                <h2>Card Details</h2>
                </div>
                <div className="containerSubCard">
                  <h4> Card Number </h4>
                  <CardNumberElement className="cardNumb"/>
                  
                    <h4> Date </h4> 
                    <CardExpiryElement className="cardExpi"/>
                  
                    <h4> CVV </h4>
                    <CardCvcElement className="cardCvc"/>
                </div>
                <div className="containerSubCard02">
                    <button onClick={(e) => handleSubmit(e)} disabled={loading ? true : false}>
                      {loading ? <p>Loading</p> : <p>   { `$ ${totalPrice}.00`}</p>}  <p> 'Checkout'   </p>
                    </button>
                </div>
              </div>
            </div>
        </div>
        )
}