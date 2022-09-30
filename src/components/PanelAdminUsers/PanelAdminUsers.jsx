// protecter router
import { useAuth0 } from '@auth0/auth0-react';
import NotFound from '../../pages/NotFound/NotFound';
//protecter router
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, putUser } from "../../redux/actions";
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


const PanelAdminUsers = () => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  const [modals, setModals] = useState({
    modalEditar: false,
    modalEliminar: false,
    modalReestablecer: false,
    modalEditarSeguro: false
  })
    //protecter router
    const {user, isAuthenticated}=useAuth0()
    const usuarios = users
    const emailAuth0 = email()
    const userDb = filterUser()
    console.log(userDb)
    function filterUser() {
      if (isAuthenticated && usuarios.length) {
        return usuarios.filter(e => e.email === emailAuth0)
      }
    }
    function email() {
      if (isAuthenticated) {
        return user.email
      }
    }
    //protecter router
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

        let validationEmail = users.filter((u) => {
          return (u.email.toUpperCase() === state.email.toUpperCase())
        })

        if(validationEmail.length>0){
          setModals({
            ...modals,
            modalEditarSeguro: false
          });
  
          error("Error. That email already exists")

        }else{

          dispatch(putUser(state))

          .then(()=>{
            dispatch(getAllUsers());
          })

          cerrarModal();
          
          success("Edited");          
        }


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


    
    return (
      isAuthenticated && userDb!==undefined && userDb[0] && userDb[0].role==="Administrador"
      ?(
        <div>
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
                      <Button color="primary" onClick={() => editar(dato)}>Edit</Button>
                      {dato.disabled ? 
                      <Button color="success" onClick={()=> reestablecer(dato)}>Restore</Button>
                      :<Button color="danger" onClick={()=> eliminar(dato)}>Remove</Button>}
                  </td>
                  :<td>
                      <Button color="primary" onClick={() => editar(dato)}>Edit</Button>
                      {dato.disabled ? 
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
            <div><h3>Editar Registro</h3></div>
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
                <input className="form-control" name="email" type="text" onChange={handleChange} value={state.email}/>
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

              <FormGroup>
                <label>Image:</label>
                <input className="form-control" name="image" type="image" onChange={handleChange} value={state.image}/>
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
            <div><h3>Edit record</h3></div>
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
            <div><h3>Reset record</h3></div>
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
      ):<NotFound/>
       
    )
}
export default PanelAdminUsers;