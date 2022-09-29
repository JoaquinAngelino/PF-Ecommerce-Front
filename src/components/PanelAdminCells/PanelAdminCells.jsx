import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAdmin, putCell } from "../../redux/actions";
import "./PanelAdminCells.css";
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
import { success, remove, error } from "../Toast/Toast";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";



const PanelAdminCells = () => {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [modals, setModals] = useState({
    modalEditar: false,
    modalEliminar: false,
    modalReestablecer: false,
    modalEditarSeguro: false
  })
  const [state, setState] = useState({
    id: "",
    line: "",
    model: "",
    stock: "",
    capacity:"",
    image:"",
    brand:"",
    price:"",
    memoryRAM:"",
    description:"",
    spec:"",
    disabled:""
  });

  useEffect(() => {
    dispatch(getAllProductsAdmin());

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
      line: dato.line,
      model: dato.model,
      stock: dato.stock,
      capacity: dato.capacity,
      image: dato.image,
      brand: dato.brand,
      price: dato.price,
      memoryRAM: dato.memoryRAM,
      description: dato.description,
      spec: dato.spec,
      disabled: dato.disabled
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
      line: dato.line,
      model: dato.model,
      stock: dato.stock,
      capacity: dato.capacity,
      image: dato.image,
      brand: dato.brand,
      price: dato.price,
      memoryRAM: dato.memoryRAM,
      description: dato.description,
      spec: dato.spec,
      disabled: dato.disabled
    });

    setModals({
      ...modals,
      modalEditarSeguro: true
    });
    
  }

  const editarModal2 = () => {
    // if(state.line.length > 0 && state.model.length > 0 && state.brand.length > 0  && state.image.length > 
    //   0   && state.description.length > 0 && state.spec.length > 0 && state.price > 0 && state.capacity > 0 &&
    //   state.memoryRAM > 0 && state.stock > 0){

    //     dispatch(putCell(state)) 

    //     .then(()=>{
    //       dispatch(getAllProductsAdmin());
    //     })

    //     cerrarModal();

    //     success("Cell edited.")

    // }else{
    //     setModals({
    //       ...modals,
    //       modalEditarSeguro: false
    //     });
        
    //    error("Error, check the fields.")   

    // }
    // history("/")
    
  }




 

  const eliminar = (dato) => {
    setState({
      ...state,
      id: dato.id,
      line: dato.line,
      model: dato.model,
      stock: dato.stock,
      capacity: dato.capacity,
      image: dato.image,
      brand: dato.brand,
      price: dato.price,
      memoryRAM: dato.memoryRAM,
      description: dato.description,
      spec: dato.spec,
      disabled: true
    });

    setModals({
      ...modals,
      modalEliminar: true
    });
    
  };

  const eliminarModal = () => {
    dispatch(putCell(state))

    .then(()=>{
      dispatch(getAllProductsAdmin());
    })

    cerrarModal();

    remove()
}

  
  
  
  
  const reestablecer = (dato) => {
    setState({
      ...state,
      id: dato.id,
      line: dato.line,
      model: dato.model,
      stock: dato.stock,
      capacity: dato.capacity,
      image: dato.image,
      brand: dato.brand,
      price: dato.price,
      memoryRAM: dato.memoryRAM,
      description: dato.description,
      spec: dato.spec,
      disabled: false
    });

    setModals({
      ...modals,
      modalReestablecer: true
    });
  }

  const reestablecerModal = () => {
    dispatch(putCell(state))

    .then(()=>{
      dispatch(getAllProductsAdmin());
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
            <Table bordered size="sm" striped>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Model</th>
                    <th>Line</th>
                    <th>Stock</th> 
                    <th>Brand</th>
                    <th>Actions</th>                   
                  </tr>
                </thead>

                <tbody>
                {products? products.map((dato) => (
                    <tr key={dato.id}>
                    {dato.disabled ? 
                    <td class="table-danger"><p className="dato">{dato.id}</p></td>
                    :<td><p className="dato">{dato.id}</p></td>}
                    {dato.disabled ? 
                    <td class="table-danger"><img src={dato.image} alt="img" className="datoImg"></img></td>
                    :<td><img src={dato.image} alt="img" className="datoImg"></img></td>}
                    {dato.disabled ? 
                    <td class="table-danger"><p className="dato">{dato.model}</p></td>
                    :<td><p className="dato">{dato.model}</p></td>}
                    {dato.disabled ? 
                    <td class="table-danger"><p className="dato">{dato.line}</p></td>
                    :<td><p className="dato">{dato.line}</p></td>}
                    {dato.disabled ? 
                    <td class="table-danger"><p className="dato">{dato.stock}</p></td>
                    :<td><p className="dato">{dato.stock}</p></td>}
                    {dato.disabled ? 
                    <td class="table-danger"><p className="dato">{dato.brand}</p></td>
                    :<td><p className="dato">{dato.brand}</p></td>}
                    {dato.disabled ? 
                    <td class="table-danger">
                        {/* <Button color="primary" onClick={() => editar(dato)}>Edit</Button> */}
                        <Link to={`/panelCells/editProduct/${dato.id}`}><Button color="primary">Edit</Button></Link>
                        {dato.disabled ? 
                        <Button color="success" onClick={()=> reestablecer(dato)}>Restore</Button>
                        :<Button color="danger" onClick={()=> eliminar(dato)}>Remove</Button>}
                    </td>
                    :<td>
                        {/* <Button color="primary" onClick={() => editar(dato)}>Edit</Button> */}
                        <Link to={`/panelCells/editProduct/${dato.id}`}><Button color="primary">Edit</Button></Link>
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
                  <label>Model:</label>
                  <input className="form-control" name="model" type="text" onChange={handleChange} value={state.model}/>
                </FormGroup>
                
                <FormGroup>
                  <label>Line:</label>
                  <input className="form-control" name="line" type="text" onChange={handleChange} value={state.line}/>
                </FormGroup>

                <FormGroup>
                  <label>Brand:</label>
                  <input className="form-control" name="brand" type="text" onChange={handleChange} value={state.brand}/>
                </FormGroup>

                <FormGroup>
                  <label>Stock:</label>
                  <input className="form-control" name="stock" type="number" onChange={handleChange} value={state.stock}/>
                </FormGroup>

                <FormGroup>
                  <label>Price:</label>
                  <input className="form-control" name="price" type="number" onChange={handleChange} value={state.price}/>
                </FormGroup>

                <FormGroup>
                  <label>Capacity:</label>
                  <input className="form-control" name="capacity" type="number" onChange={handleChange} value={state.capacity}/>
                </FormGroup>

                <FormGroup>
                  <label>Memory RAM:</label>
                  <input className="form-control" name="memoryRAM" type="number" onChange={handleChange} value={state.memoryRAM}/>
                </FormGroup>

                <FormGroup>
                  <label>Image:</label>
                  <input className="form-control" name="image" type="text" onChange={handleChange} value={state.image}/>
                </FormGroup>

                <FormGroup>
                  <label>Description:</label>
                  <input className="form-control" name="description" type="text" onChange={handleChange} value={state.description}/>
                </FormGroup>

                <FormGroup>
                  <label>Spec:</label>
                  <input className="form-control" name="spec" type="text" onChange={handleChange} value={state.spec}/>
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
                  <label>Model:</label>
                  <input className="form-control" name="model"  readOnly  type="text" onChange={handleChange} value={state.model}/>
                </FormGroup>
                
                <FormGroup>
                  <label>Line:</label>
                  <input className="form-control" name="line" readOnly  type="text" onChange={handleChange} value={state.line}/>
                </FormGroup>

                <FormGroup>
                  <h4>Are you sure you want to remove this item?</h4>
                </FormGroup>
                
            </ModalBody>

            <ModalFooter>
                <Button color="primary" onClick={() => eliminarModal()}>Remove</Button>
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
                  <label>Model:</label>
                  <input className="form-control" name="model"  readOnly  type="text" onChange={handleChange} value={state.model}/>
                </FormGroup>
                
                <FormGroup>
                  <label>Line:</label>
                  <input className="form-control" name="line" readOnly  type="text" onChange={handleChange} value={state.line}/>
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
export default PanelAdminCells;