import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, getOrdersUser } from "../../redux/actions";
import { useParams } from "react-router-dom";
import "./DetailOrder.css";

const DetailOrder = () => {
    
    const dispatch = useDispatch();

    const { id } = useParams();
    const { id_User } = useParams();
    const orders = useSelector((state) => state.orders)
    
    useEffect(() => {
        if(id){
            dispatch(getOrderById(id))
            
        }else{
            dispatch(getOrdersUser(id_User))
        }
        

    }, [dispatch, id])
    
    return(
        <div>
        {orders && orders.length>=0 ? orders.map((order) => {
            return(
        <div className="conteiner-card-order">

            <div className="subcontainer01-order">
                <div className="title-order-detail"><h1>Order Detail</h1></div>
                

                
                {order && order.user? 
                    <div>     
                        <br/><br/>
                        <div className="group-container-order">
                            <p className="variable-order">Status:</p>
                            {order.status === "Realizado" ?
                            <p className="datoTerminado-detail">{order.status}</p>
                            :<p>
                            {order.status === "Pendiente" ? 
                                <p className="datoPendiente-detail">{order.status}</p>
                                :<p className="datoCancelado-detail">{order.status}</p>}
                            </p>
                            }
                        </div>

                        <div className="group-container-order">
                            <p className="variable-order">ID:</p>
                            <p className="value-order">{order.id_Orders}</p>
                        </div>

                        <div className="group-container-order">
                            <p className="variable-order">Date:</p>
                            <p className="value-order">{order.date}</p>
                        </div>

                        <div className="group-container-order">
                            <p className="variable-order">User Email:</p>
                            <p className="value-order">{order.userMail}</p>
                        </div>

                        <div className="group-container-order">
                            <p className="variable-order">User Name:</p>
                            <p className="value-order">{order.user.name}</p>
                        </div>

                        <div className="group-container-order">
                            <p className="variable-order">Payment:</p>
                            <p className="value-order">{order.payment}</p>
                        </div>

                        <br/>
                        <div className="group-container-order">
                            <p className="variable-order">Total:</p>
                            <p className="value-total-order">$ {parseFloat(order.subTotal).toFixed(2)}</p>
                        </div>
                    </div>
                :<p>order not found</p>}
            </div>
            <div className="container-cells-order">
                    {/* Se muestra las Cartas */}
                    
                    {order.cells && order.cells.length ? order.cells.map(c => {
                        return (
                                <div className="cell-card-order">
                                    <figure className="card-order">
                                        <div className='imgCard'>
                                        <img src={`${c.image}`} alt='imagen' 	/>
                                        </div>
                                        <div className='name-cell-order'>
                                            <figcaption>{c.model}</figcaption>
                                        </div>
                                        <div className='price-cell-order'>
                                            <figcaption>{c.price ? `$ ${c.price}` : null}</figcaption>
                                        </div>
                                    </figure>
                                </div>
                        )
                    }) : <div>has no items selected!</div>}
            </div>

        </div>
        )}):<p>a</p>}
        </div>
    )
}

export default DetailOrder;