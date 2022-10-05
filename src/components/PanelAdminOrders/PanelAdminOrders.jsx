import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, putOrder, getFiltersOrdersAdmin } from "../../redux/actions";
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
import iconSearch from '../SearchBar/search_FILL0.png'
import { Link } from "react-router-dom";


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
    id_Orders: "",
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
      id_Orders: dato.id_Orders,
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
      id_Orders: dato.id_Orders,
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

          dispatch(putOrder(state))

          .then(()=>{
            dispatch(getAllOrders());
          })

          cerrarModal();
          
          success("Edited");          
  }


  const handleSelectStatus = (e) => {
    setState({
        ...state,
        status: e.target.value,
    });
  };
  
  



  



  const [searchBar, setSearchBar] = useState('')
  const [searchFor, setSearchFor] = useState('')

  const handleSelect = (e) => {
    setSearchFor(e.target.value)
  }

  function handleInputChange(e) {
      e.preventDefault();
      setSearchBar(e.target.value);
  }
  function handleSubmit(e) {
      e.preventDefault();
      if ((searchBar && searchFor)) {
        dispatch(getFiltersOrdersAdmin(`${searchFor}=${searchBar}`))
      }
  }

    
    return (
        <div>
            <div className='divSearchBar'>
              <select name="variable" onChange={(e) => handleSelect(e)} className="form-control me-2" >
                <option>Search For...</option>
                <option value="id_Orders">ID</option>
                <option value="date">Date</option>
                <option value="userMail">Email</option>
                <option value="subTotal">Subtotal</option>
                <option value="status">Status</option>
              </select>
              <form className="d-flex input-group" role="search" onSubmit={(e) => { handleSubmit(e) }}>
                <button className="input-group-text" id="inputGroup-sizing-default" type='submit'>
                  <img src={iconSearch} alt="search Icon" width="25" height="25" />
                </button>
                <input className="form-control me-2" value={searchBar} name={"searchBar"} onChange={(e) => { handleInputChange(e) }} placeholder='Type your search...'/>
              </form>
            </div>
            <button className="updateButton input-group-text" onClick={() => dispatch(getAllOrders())}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="updateImg bi bi-bootstrap-reboot" viewBox="0 0 16 16">
              <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z"/>
              <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6z"/>
            </svg>  All
            </button>


          <div className="tableContainer">
            <Table bordered size="sm">
                <thead>
                <tr>
                    <th><button type="button" onClick={() => requestSort('id_Orders')} className={getClassNamesFor('id_Orders')}>ID</button></th>
                    <th><button type="button" onClick={() => requestSort('status')} className={getClassNamesFor('status')}>Status</button></th>  
                    <th><button type="button" onClick={() => requestSort('date')} className={getClassNamesFor('date')}>Date</button></th>
                    <th><button type="button" onClick={() => requestSort('userMail')} className={getClassNamesFor('userMail')}>Email</button></th>
                    <th><button type="button" onClick={() => requestSort('subTotal')} className={getClassNamesFor('subTotal')}>Subtotal</button></th>
                    <th><button type="button" onClick={() => requestSort('paid')} className={getClassNamesFor('paid')}>Paid</button></th>  
                    <th><button type="button" >Actions</button></th>                  
                  </tr>
                </thead>

                <tbody>
                {items.length> 0 && items? items.map((dato) => (
                    <tr key={dato.id_Orders}>

                    <td ><p className="dato">{dato.id_Orders}</p></td>
                    
                    {dato.status === "Realizado" ?
                    <td><p className="datoTerminado">{dato.status}</p></td>
                    :<td>
                        {dato.status === "Pendiente" ? 
                        <p className="datoPendiente">{dato.status}</p>
                        :<p className="datoCancelado">{dato.status}</p>}
                     </td>
                    }

                    <td><p className="dato">{dato.date}</p></td>

                    <td><p className="dato">{dato.userMail}</p></td>

                    <td><p className="dato">{parseFloat(dato.subTotal).toFixed(2)}</p></td>

                    {dato.paid ? 
                    <td><p className="dato">True</p></td>
                    :<td><p className="datoTerminado">False</p></td>}
                    
                    <td>
                        <Button className="Button" color="primary" onClick={() => editar(dato)}>Edit</Button>
                        <Link   to={`/panelOrders/detailOrder/${dato.id_Orders}`}><Button className="Button" color="success">Detail</Button></Link>
                    </td>

                    </tr>             
                )):<tr></tr>}
                </tbody>
            </Table>
          </div>

            <Modal isOpen={modals.modalEditar}>
            <ModalHeader>
              <div><h3>Change Status Order</h3></div>
            </ModalHeader>

            <ModalBody>
                <FormGroup>
                  <label className="labelEdit">Id:</label>
                  <p>{state.id_Orders}</p>
                </FormGroup>
                
                <FormGroup>
                  <label className="labelEdit">Date:</label>
                  <p>{state.date}</p>
                </FormGroup>

                <FormGroup>
                  <label className="labelEdit">User email:</label>
                  <p>{state.userMail}</p>
                </FormGroup>

                <FormGroup>
                  <label className="labelEdit">Subtotal:</label>
                  <p>{state.subTotal}</p>
                </FormGroup>

                <FormGroup>
                  <label className="labelEdit">Paid:</label>
                  {state.paid? <p>True</p>
                    :<p>False</p>
                  }   
                </FormGroup>

                <FormGroup>
                  <label className="labelEdit">Payment:</label>
                  <p>{state.payment}</p>
                </FormGroup>

                <FormGroup>
                  <label className="labelEdit">Status:</label>
                  <select name="status" value={state.status} onChange={(e) => handleSelectStatus(e)} className="form-control me-2" >
                    <option value="Realizado">Realizado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
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





            <Toaster position="bottom-right" reverseOrder={false}/>
    
        </div>
    )
}
export default PanelAdminOrders;