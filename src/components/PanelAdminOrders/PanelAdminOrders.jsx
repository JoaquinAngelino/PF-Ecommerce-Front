import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, putOrder } from "../../redux/actions";
import "./PanelAdminOrders.css";
import 'bootstrap/dist/css/bootstrap.css';
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import { error, success, remove } from "../Toast/Toast";
import { Toaster } from "react-hot-toast";


const PanelAdminOrders = () => {
  const orders = useSelector(state => state.orders);
  const dispatch = useDispatch();
  const [modals, setModals] = useState({
    modalEditar: false,
    modalEliminar: false,
    modalReestablecer: false,
    modalEditarSeguro: false
  })
  const [state, setState] = useState({
    id: "",
    userMail: "",
    date: "",
    payment: "",
    subTotal: "",
    paid: "",
    status:""
  });

  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);
    
    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);
  
    const requestSort = key => {
      let direction = 'ascending';
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    }
  
    return { items: sortedItems, requestSort };
  }
  
  const { items, requestSort, sortConfig } = useSortableData(orders);
  
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };


 

  useEffect(() => {
    dispatch(getAllOrders());

  },[dispatch])

  function cerrarModal() {
    setModals({
      modalEditar: false,
      modalEliminar: false,
      modalReestablecer: false,
      modalEditarSeguro: false
    });
  }


  const editar = (dato) => {
    
    setState({
      ...state,
      id: dato.id,
      userMail: dato.userMail,
      date: dato.date,
      payment: dato.payment,
      subTotal: dato.subTotal,
      paid: dato.paid,
      status: dato.status
    });

    setModals({
      ...modals,
      modalEditar: true
    });
  };


  const editarModal1 = (dato) => {
    setState({
      ...state,
      id: dato.id,
      userMail: dato.userMail,
      date: dato.date,
      payment: dato.payment,
      subTotal: dato.subTotal,
      paid: dato.paid,
      status: dato.status
    });

    setModals({
      ...modals,
      modalEditarSeguro: true
    });
    
  }

  const editarModal2 = () => {
    if(state.userMail.length > 0 && state.date.length > 0 && state.payment.length > 0 && state.subTotal.length > 0 && state.paid.length > 0 
      && state.status.length > 0 ){


          dispatch(putOrder(state))

          .then(()=>{
            dispatch(getAllOrders());
          })

          cerrarModal();
          
          success("Edited");          

      }else{

        setModals({
          ...modals,
          modalEditarSeguro: false
        });

        error("Error, check the fields.")
      }
  }




 

  const eliminar = (dato) => {
    setState({
      ...state,
      id: dato.id,
      userMail: dato.userMail,
      date: dato.date,
      payment: dato.payment,
      subTotal: dato.subTotal,
      paid: true,
      status: dato.status
    });

    setModals({
      ...modals,
      modalEliminar: true
    });
    
  };

  const eliminarModal = () => {
    dispatch(putOrder(state))

    .then(()=>{
      dispatch(getAllOrders());
    })

    cerrarModal();

    remove();    
  }

  
  
  
  
  const reestablecer = (dato) => {
    setState({
      ...state,
      id: dato.id,
      userMail: dato.userMail,
      date: dato.date,
      payment: dato.payment,
      subTotal: dato.subTotal,
      paid: false,
      status: dato.status
    });

    setModals({
      ...modals,
      modalReestablecer: true
    });
  }

  const reestablecerModal = () => {
    dispatch(putOrder(state))

    .then(()=>{
      dispatch(getAllOrders());
    })

    cerrarModal();

    success("Reestablished.");
    
  }


  
  const handleChange = (e) => {
    setState({
        ...state,
        [e.target.name]: e.target.value,
    });
  };


    
    return (
        <div>
          <div className="tableContainer">
            <Table bordered size="sm">
                <thead>
                <tr>
                    <th><button type="button" onClick={() => requestSort('id')} className={getClassNamesFor('id')}>ID</button></th>
                    <th><button type="button" onClick={() => requestSort('date')} className={getClassNamesFor('date')}>Date</button></th>
                    <th><button type="button" onClick={() => requestSort('userMail')} className={getClassNamesFor('userMail')}>User Email</button></th>
                    <th><button type="button" onClick={() => requestSort('subTotal')} className={getClassNamesFor('subTotal')}>Subtotal</button></th>
                    <th><button type="button" onClick={() => requestSort('paid')} className={getClassNamesFor('paid')}>Paid</button></th>
                    <th><button type="button" onClick={() => requestSort('status')} className={getClassNamesFor('status')}>Status</button></th>     
                    <th><button type="button" >Actions</button></th>                  
                  </tr>
                </thead>

                <tbody>
                {items.length> 0 && items? items.map((dato) => (
                    <tr key={dato.id}>
                    {dato.paid ? 
                    <td class="table-danger"><p className="dato">{dato.id}</p></td>
                    :<td><p className="dato">{dato.id}</p></td>}
                    {dato.paid ? 
                    <td class="table-danger">{dato.date}</td>
                    :<td>{dato.date}</td>}
                    {dato.paid ? 
                    <td class="table-danger"><p className="dato">{dato.userMail}</p></td>
                    :<td><p className="dato">{dato.userMail}</p></td>}
                    {dato.paid ? 
                    <td class="table-danger"><p className="dato">{dato.subTotal}</p></td>
                    :<td><p className="dato">{dato.subTotal}</p></td>}
                    {dato.paid ? 
                    <td class="table-danger"><p className="dato">{dato.paid}</p></td>
                    :<td><p className="dato">{dato.paid}</p></td>}
                    {dato.paid ? 
                    <td class="table-danger"><p className="dato">{dato.status}</p></td>
                    :<td><p className="dato">{dato.status}</p></td>}
                    {dato.paid ? 
                    <td class="table-danger">
                        <Button color="primary" onClick={() => editar(dato)}>Edit</Button>
                        {dato.paid ? 
                        <Button color="success" onClick={()=> reestablecer(dato)}>Restore</Button>
                        :<Button color="danger" onClick={()=> eliminar(dato)}>Remove</Button>}
                    </td>
                    :<td>
                        <Button color="primary" onClick={() => editar(dato)}>Edit</Button>
                        {dato.paid ? 
                        <Button color="success" onClick={()=> reestablecer(dato)}>Restore</Button>
                        :<Button color="danger" onClick={()=> eliminar(dato)}>Remove</Button>}
                    </td>}                    
                    </tr>             
                )):<tr></tr>}
                </tbody>
            </Table>
          </div>

            <Modal isOpen={modals.modalEditar}>
            <ModalHeader>
              <div><h3>Edit Form</h3></div>
            </ModalHeader>

            <ModalBody>
                <FormGroup>
                <label>Id:</label>
                <input className="form-control" readOnly type="text"  value={state.id} />
                </FormGroup>
                
                <FormGroup>
                  <label>Date:</label>
                  <input className="form-control" name="date" type="text" onChange={handleChange} value={state.date}/>
                </FormGroup>
                
                <FormGroup>
                  <label>User email:</label>
                  <input className="form-control" name="userMail" type="text" onChange={handleChange} value={state.userMail}/>
                </FormGroup>

                <FormGroup>
                  <label>Subtotal:</label>
                  <input className="form-control" name="subTotal" type="text" onChange={handleChange} value={state.subTotal}/>
                </FormGroup>

                <FormGroup>
                  <label>Paid:</label>
                  <input className="form-control" name="paid" type="text" onChange={handleChange} value={state.paid}/>
                </FormGroup>

                <FormGroup>
                  <label>Payment:</label>
                  <input className="form-control" name="payment" type="text" onChange={handleChange} value={state.payment}/>
                </FormGroup>

                <FormGroup>
                  <label>Status:</label>
                  <input className="form-control" name="status" type="text" onChange={handleChange} value={state.status}/>
                </FormGroup>
            </ModalBody>

            
                {!modals.modalEditarSeguro ?
                <ModalFooter>
                 <Button color="primary" onClick={() => editarModal1(state)}>Edit</Button>
                 <Button color="danger" onClick={() => cerrarModal()}>Cancel</Button>
                </ModalFooter> 
                :
                <ModalFooter>
                  <label>Are you sure?</label>
                  <Button color="primary" onClick={() => editarModal2()}>Yes</Button>
                  <Button color="danger" onClick={() => cerrarModal()}>Cancel</Button>
                </ModalFooter>     
                }

            
            </Modal>





            <Modal isOpen={modals.modalEliminar}>
            <ModalHeader>
              <div><h3>Delete Form</h3></div>
            </ModalHeader>

            <ModalBody>
                <FormGroup>
                  <label>Id:</label>
                  <input className="form-control" readOnly type="text"  value={state.id} />
                </FormGroup>
                
                <FormGroup>
                  <label>Date:</label>
                  <input className="form-control"  readOnly type="text" value={state.date}/>
                </FormGroup>
                
                <FormGroup>
                  <label>User email:</label>
                  <input className="form-control" readOnly  type="text"  value={state.userMail}/>
                </FormGroup>

                <FormGroup>
                  <h4>Are you sure you want to delete this item?</h4>
                </FormGroup>
                
            </ModalBody>

            <ModalFooter>
                <Button color="primary" onClick={() => eliminarModal()}>Delete</Button>
                <Button color="danger" onClick={() => cerrarModal()}>Cancel</Button>
            </ModalFooter>
            </Modal>




            <Modal isOpen={modals.modalReestablecer}>
            <ModalHeader>
              <div><h3>Restore Form</h3></div>
            </ModalHeader>

            <ModalBody>
                <FormGroup>
                  <label>Id:</label>
                  <input className="form-control" readOnly type="text"  value={state.id} />
                </FormGroup>
                
                <FormGroup>
                  <label>Date:</label>
                  <input className="form-control"  readOnly type="text" value={state.date}/>
                </FormGroup>
                
                <FormGroup>
                  <label>User email:</label>
                  <input className="form-control" readOnly  type="text"  value={state.userMail}/>
                </FormGroup>


                <FormGroup>
                  <h4>Are you sure you want to restore this item?</h4>
                </FormGroup>
                
            </ModalBody>

            <ModalFooter>
                <Button color="primary" onClick={() => reestablecerModal()}>Restore</Button>
                <Button color="danger" onClick={() => cerrarModal()}>Cancel</Button>
            </ModalFooter>
            </Modal>
            <Toaster position="bottom-right" reverseOrder={false}/>
    
        </div>
    )
}
export default PanelAdminOrders;