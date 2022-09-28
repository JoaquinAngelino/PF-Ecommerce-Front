import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getAllProductsAdmin,  getFiltersProductsAdmin, putCell } from "../../redux/actions";
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
import iconSearch from '../SearchBar/search_FILL0.png'




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
  
  const { items, requestSort, sortConfig } = useSortableData(products);
  
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };


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
    if(state.line.length > 0 && state.model.length > 0 && state.brand.length > 0  && state.image.length > 
      0   && state.description.length > 0 && state.spec.length > 0 && state.price > 0 && state.capacity > 0 &&
      state.memoryRAM > 0 && state.stock > 0){

        let validationCell = products.filter((u) => {
          return (u.model.toUpperCase() === state.model.toUpperCase() && u.line.toUpperCase() === state.line.toUpperCase() && 
          u.brand.toUpperCase() === state.brand.toUpperCase())
        })

        if(validationCell.length>0){
          setModals({
            ...modals,
            modalEditarSeguro: false
          });
  
          error("Error. That cell already exists")

        }else{

          dispatch(putCell(state)) 

          .then(()=>{
            dispatch(getAllProductsAdmin());
          })

          cerrarModal();

          success("Cell edited.")
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





   //filtrado
    const [searchBar, setSearchBar] = useState('')
    const [searchFor, setSearchFor] = useState('')

    const handleSelect = (e) => {
      setSearchFor(e.target.value)
      if(e.target.value === "disabled"){
        dispatch(getFiltersProductsAdmin(`disabled=true`))
      }
    }
    function handleInputChange(e) {
        e.preventDefault();
        setSearchBar(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if ((searchBar && searchFor) && (searchFor !== "disabled")) {
          dispatch(getFiltersProductsAdmin(`${searchFor}=${searchBar}`))
        }
    }



    return (
        <div>
            <div className='containerSearchBar'>
              <select name="variable" onChange={(e) => handleSelect(e)} className="form-control" >
                <option>Search For...</option>
                <option value="id">ID</option>
                <option value="model">Model</option>
                <option value="line">Line</option>
                <option value="brand">Brand</option>
                <option value="disabled">Disabled</option>
              </select>
            <form className="d-flex input-group" role="search" onSubmit={(e) => { handleSubmit(e) }}>
                <button
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                    type='submit'
                >
                    <img src={iconSearch} alt="search Icon" width="25" height="25" />
                </button>
                <input
                    className="form-control me-2"
                    value={searchBar}
                    name={"searchBar"}
                    onChange={(e) => { handleInputChange(e) }}
                    placeholder='Type your search...'
                />
            </form>
          </div>
          <button onClick={() => dispatch(getAllProductsAdmin())}>All</button>
          <div className="tableContainer">
            <Table bordered size="sm" >
                <thead>
                <tr>
                    <th><button type="button" onClick={() => requestSort('id')} className={getClassNamesFor('id')}>ID</button></th>
                    <th><button type="button" >Image</button></th>
                    <th><button type="button" onClick={() => requestSort('model')} className={getClassNamesFor('model')}>Model</button></th>
                    <th><button type="button" onClick={() => requestSort('line')} className={getClassNamesFor('line')}>Line</button></th>
                    <th><button type="button" onClick={() => requestSort('stock')} className={getClassNamesFor('stock')}>Stock</button></th> 
                    <th><button type="button" onClick={() => requestSort('brand')} className={getClassNamesFor('brand')}>Brand</button></th>
                    <th><button type="button" >Actions</button></th>                   
                  </tr>
                </thead>

                <tbody>
                {items? items.map((dato) => (
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
              <div><h3>Edit Form</h3></div>
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
              <div><h3>Delete Form</h3></div>
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
              <div><h3>Restore Form</h3></div>
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