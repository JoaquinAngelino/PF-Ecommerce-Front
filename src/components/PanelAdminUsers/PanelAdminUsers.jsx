import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, putUser, getFiltersUsersAdmin } from "../../redux/actions";
import "./PanelAdminUsers.css";
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


const PanelAdminUsers = () => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  const [modals, setModals] = useState({
    modalEditar: false,
    modalEliminar: false,
    modalReestablecer: false,
    modalEditarSeguro: false
  })
  const [state, setState] = useState({
    id: "",
    name: "",
    email: "",
    image: "",
    location: "",
    direction: "",
    disabled: "",
    role: ""
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
  
  const { items, requestSort, sortConfig } = useSortableData(users);
  
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };


 

  useEffect(() => {
    dispatch(getAllUsers());

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
      name: dato.name,
      email: dato.email,
      image: dato.image,
      location: dato.location,
      direction: dato.direction,
      disabled: dato.disabled,
      role: dato.role
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
      name: dato.name,
      email: dato.email,
      image: dato.image,
      location: dato.location,
      direction: dato.direction,   
      role: dato.role,
      disabled: dato.disabled
    });

    setModals({
      ...modals,
      modalEditarSeguro: true
    });
    
  }

  const editarModal2 = () => {
    if(state.name.length > 0 && state.email.length > 0 && state.image.length > 0 && state.location.length > 0 && state.direction.length > 0 
      && state.role.length > 0 && ((state.role === "Administrador")||(state.role === "Vendedor")||(state.role === "Cliente"))){


          dispatch(putUser(state))

          .then(()=>{
            dispatch(getAllUsers());
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
      name: dato.name,
      email: dato.email,
      image: dato.image,
      location: dato.location,
      direction: dato.direction,   
      role: dato.role,
      disabled: true
    });

    setModals({
      ...modals,
      modalEliminar: true
    });
    
  };

  const eliminarModal = () => {
    dispatch(putUser(state))

    .then(()=>{
      dispatch(getAllUsers());
    })

    cerrarModal();

    remove();    
  }

  
  
  
  
  const reestablecer = (dato) => {
    setState({
      ...state,
      id: dato.id,
      name: dato.name,
      email: dato.email,
      image: dato.image,
      location: dato.location,
      direction: dato.direction,   
      role: dato.role,
      disabled: false
    });

    setModals({
      ...modals,
      modalReestablecer: true
    });
  }

  const reestablecerModal = () => {
    dispatch(putUser(state))

    .then(()=>{
      dispatch(getAllUsers());
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


     //filtrado
     const [searchBar, setSearchBar] = useState('')
     const [searchFor, setSearchFor] = useState('')
 
     const handleSelect = (e) => {
       setSearchFor(e.target.value)
       if(e.target.value === "disabled"){
         dispatch(getFiltersUsersAdmin(`disabled=true`))
       }
     }
     function handleInputChange(e) {
         e.preventDefault();
         setSearchBar(e.target.value);
     }
     function handleSubmit(e) {
         e.preventDefault();
         if ((searchBar && searchFor) && (searchFor !== "disabled")) {
           dispatch(getFiltersUsersAdmin(`${searchFor}=${searchBar}`))
         }
     }

    
    return (
        <div>
            <div className='divSearchBar'>
              <select name="variable" onChange={(e) => handleSelect(e)} className="form-control me-2" >
                <option>Search For...</option>
                <option value="id">ID</option>
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="role">Role</option>
                <option value="disabled">Disabled</option>
              </select>
              <form className="d-flex input-group" role="search" onSubmit={(e) => { handleSubmit(e) }}>
                <button className="input-group-text" id="inputGroup-sizing-default" type='submit'>
                  <img src={iconSearch} alt="search Icon" width="25" height="25" />
                </button>
                <input className="form-control me-2" value={searchBar} name={"searchBar"} onChange={(e) => { handleInputChange(e) }} placeholder='Type your search...'/>
              </form>
            </div>
            <button className="updateButton input-group-text" onClick={() => dispatch(getAllUsers())}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="updateImg bi bi-bootstrap-reboot" viewBox="0 0 16 16">
              <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z"/>
              <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6z"/>
            </svg>  All
            </button>


          <div className="tableContainer">
            <Table bordered size="sm">
                <thead>
                <tr>
                    <th><button type="button" onClick={() => requestSort('id')} className={getClassNamesFor('id')}>ID</button></th>
                    <th><button type="button" >Image</button></th>
                    <th><button type="button" onClick={() => requestSort('name')} className={getClassNamesFor('name')}>Name</button></th>
                    <th><button type="button" onClick={() => requestSort('email')} className={getClassNamesFor('email')}>Email</button></th>
                    <th><button type="button" onClick={() => requestSort('role')} className={getClassNamesFor('role')}>Role</button></th>
                    <th><button type="button" >Actions</button></th>                  
                  </tr>
                </thead>

                <tbody>
                {items.length> 0 && items? items.map((dato) => (
                    <tr key={dato.id}>
                    {dato.disabled ? 
                    <td class="table-danger"><p className="dato">{dato.id}</p></td>
                    :<td><p className="dato">{dato.id}</p></td>}
                    {dato.disabled ? 
                    <td class="table-danger"><img src={dato.image} alt="img" className="datoImg"></img></td>
                    :<td><img src={dato.image} alt="img" className="datoImg"></img></td>}
                    {dato.disabled ? 
                    <td class="table-danger"><p className="dato">{dato.name}</p></td>
                    :<td><p className="dato">{dato.name}</p></td>}
                    {dato.disabled ? 
                    <td class="table-danger"><p className="dato">{dato.email}</p></td>
                    :<td><p className="dato">{dato.email}</p></td>}
                    {dato.disabled ? 
                    <td class="table-danger"><p className="dato">{dato.role}</p></td>
                    :<td><p className="dato">{dato.role}</p></td>}
                    {dato.disabled ? 
                    <td class="table-danger">
                        <Button className="Button" color="primary" onClick={() => editar(dato)}>Edit</Button>
                        {dato.disabled ? 
                        <Button className="Button" color="success" onClick={()=> reestablecer(dato)}>Restore</Button>
                        :<Button className="Button" color="danger" onClick={()=> eliminar(dato)}>Remove</Button>}
                    </td>
                    :<td>
                        <Button className="Button" color="primary" onClick={() => editar(dato)}>Edit</Button>
                        {dato.disabled ? 
                        <Button className="Button" color="success" onClick={()=> reestablecer(dato)}>Restore</Button>
                        :<Button className="Button" color="danger" onClick={()=> eliminar(dato)}>Remove</Button>}
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
                  <label>Name:</label>
                  <input className="form-control" name="name" type="text" onChange={handleChange} value={state.name}/>
                </FormGroup>
                
                <FormGroup>
                  <label>Email:</label>
                  <input className="form-control" readOnly  type="text"  value={state.email}/>
                </FormGroup>

                <FormGroup>
                  <label>Location:</label>
                  <input className="form-control" name="location" type="text" onChange={handleChange} value={state.location}/>
                </FormGroup>

                <FormGroup>
                  <label>Direction:</label>
                  <input className="form-control" name="direction" type="text" onChange={handleChange} value={state.direction}/>
                </FormGroup>

                <FormGroup>
                  <label>Role:</label>
                  <input className="form-control" name="role" type="text" onChange={handleChange} value={state.role}/>
                  <label>(Administrador) - (Vendedor) - (Cliente)</label>
                </FormGroup>
                
                <img src={state.image} alt="img" className="datoImg"></img>  
                <FormGroup>       
                  <label>Image:</label>
                  <input className="form-control" name="image" type="text" onChange={handleChange} value={state.image}/>
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
                  <label>Name:</label>
                  <input className="form-control" readOnly name="name" type="text" onChange={handleChange} value={state.name}/>
                </FormGroup>
                
                <FormGroup>
                  <label>Email:</label>
                  <input className="form-control" readOnly name="email" type="text" onChange={handleChange} value={state.email}/>
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
                  <label>Name:</label>
                  <input className="form-control" readOnly name="name" type="text" onChange={handleChange} value={state.name}/>
                </FormGroup>
                
                <FormGroup>
                  <label>Email:</label>
                  <input className="form-control" readOnly name="email" type="text" onChange={handleChange} value={state.email}/>
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
export default PanelAdminUsers;