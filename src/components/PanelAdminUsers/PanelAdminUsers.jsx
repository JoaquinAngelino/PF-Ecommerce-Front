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

        cerrarModal();
    
        window.alert("Edited.")

        dispatch(getAllUsers());
      }else{

        setModals({
          ...modals,
          modalEditarSeguro: false
        });

        window.alert("Error, check the fields.")
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
      disabled: false
    });

    setModals({
      ...modals,
      modalEliminar: true
    });
    
  };

  const eliminarModal = () => {
    dispatch(putUser(state))

    cerrarModal();

    window.alert("Removed.");

    dispatch(getAllUsers());
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
      disabled: true
    });

    setModals({
      ...modals,
      modalReestablecer: true
    });
  }

  const reestablecerModal = () => {
    dispatch(putUser(state));

    cerrarModal();

    window.alert("Reestablished.");

    dispatch(getAllUsers());
  }


  
  const handleChange = (e) => {
    setState({
        ...state,
        [e.target.name]: e.target.value,
    });
  };


    
    return (
        <div>
            <Table bordered size="sm" striped>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Location</th> 
                    <th>Direction</th>
                    <th>Role</th>
                    <th>Image</th>
                  </tr>
                </thead>

                <tbody>
                {users.length> 0 && users? users.map((dato) => (
                    <tr key={dato.id}>
                    {!dato.disabled ? 
                    <td class="table-danger">{dato.id}</td>
                    :<td>{dato.id}</td>}
                    {!dato.disabled ? 
                    <td class="table-danger">{dato.name}</td>
                    :<td>{dato.name}</td>}
                    {!dato.disabled ? 
                    <td class="table-danger">{dato.email}</td>
                    :<td>{dato.email}</td>}
                    {!dato.disabled ? 
                    <td class="table-danger">{dato.location}</td>
                    :<td>{dato.location}</td>}
                    {!dato.disabled ? 
                    <td class="table-danger">{dato.direction}</td>
                    :<td>{dato.direction}</td>}
                    {!dato.disabled ? 
                    <td class="table-danger">{dato.role}</td>
                    :<td>{dato.role}</td>}
                    {!dato.disabled ? 
                    <td class="table-danger">{dato.image}</td>
                    :<td>{dato.image}</td>}
                    <td>
                        <Button color="primary" onClick={() => editar(dato)}>Editar</Button>
                        {!dato.disabled ? 
                        <Button color="success" onClick={()=> reestablecer(dato)}>Restore</Button>
                        :<Button color="danger" onClick={()=> eliminar(dato)}>Delete</Button>}
                    </td>
                    
                    </tr>        
                )):<tr></tr>}
                </tbody>
            </Table>


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
    
        </div>
    )
}
export default PanelAdminUsers;