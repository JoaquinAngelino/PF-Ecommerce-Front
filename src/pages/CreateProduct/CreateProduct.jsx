// protecter router
import { useAuth0 } from '@auth0/auth0-react';
import { allUser } from "../../redux/actions";
import NotFound from '../NotFound/NotFound';
//protecter router
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createPost, getAllBrands } from '../../redux/actions';
import './CreateProduct.css';
import { Link } from 'react-router-dom';
import { error, success } from '../../components/Toast/Toast';
import { Toaster } from 'react-hot-toast';


const validations = (input) => {
  const errors = {};
  if (!input.line.trim()) {
    errors.line = "does not contain lines"
  } else if (!input.model.trim()) {
    errors.model = "does not contain models"
  } else if (!input.image.trim()) {
    errors.image = "need a picture"
  } else if (!input.description.trim()) {
    errors.description = "no description"
  } else if (!input.brand.length === 0) {
    errors.brand = "does not contain brand"
  } else if (!input.capacity.trim()) {
    errors.capacity = "does not contain capacity"
  } else if (!input.memoryRAM.trim()) {
    errors.memoryRAM = "does not contain memory rAM"
  }
  return errors;
}

export default function CreateProduct() {
  const dispatch = useDispatch();
  const allBrandData = useSelector((state) => state.brands);
  //protecter router
  const {user, isAuthenticated}=useAuth0()
  const allUsers = useSelector(state => state.allUser);
  const usuarios = allUsers
  const emailAuth0 = email()
  const userDb = filterUser()
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
  console.log(userDb)
  //protecter router

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    line: "",
    model: "",
    image: "",
    description: "",
    spec: [],
    brand: "",
    capacity: "",
    memoryRAM: "",
    stock: "",
    price: ""
  })

  const uploadImage = async (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "unns5r2a");
    const res = await fetch("https://api.cloudinary.com/v1_1/dfx7so2fc/upload", { method: "POST", body: data, });
    const file = await res.json();
    setInput({ ...input, image: file.secure_url });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    setErrors(
      validations({
        ...input,
        [name]: value
      }));
      console.log(input);
  }
  const handleSelect = (e) => {
    setInput({
      ...input,
      brand: [e.target.value]
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(
      validations({
        ...input,
        [e.target.name]: e.target.value
      })
    );
    if (!input.model && !input.line && !input.image && !input.description && !input.brand && !input.capacity) return error("Does not contain fields");
    if (Object.keys(errors).length === 0) {
      dispatch(createPost(input))
      success("Your cell was created")
      setInput({
        line: "",
        image: "",
        description: "",
        model: "",
        spec: [],
        brand: "",
        capacity: "",
        memoryRAM: "",
        price: "",
      })
    } else {
      error("We could not create your cell");
    }
    // return ;
  }

  useEffect(() => {
    dispatch(getAllBrands())
    dispatch(allUser());
  }, [dispatch])

  return (
    isAuthenticated && userDb!==undefined && userDb[0] && userDb[0].role!=="Cliente"
    ?(
      <div className="container">
      <h1 className="title text-center p-3">Create Product</h1>
      <div className="abs-center">
        <form onSubmit={(e) => handleSubmit(e)} className="shadow-lg mb-5 row g-3 needs-validation p-3 form border-info ">
          <div className="form-group">
            <label htmlFor="text">Model</label>
            <input type="text" onChange={(e) => handleChange(e)} name="model" className="form-control"
              value={input.model}></input>
            {errors.model && <h4 className='errors'>{errors.model}</h4>}
          </div>
          <div className="form-group">
            <label htmlFor="text">Line</label>
            <input type="text" onChange={(e) => handleChange(e)} name="line" className="form-control"
              value={input.line}></input>
            {errors.line && <h4 className='errors'>{errors.line}</h4>}
          </div>
          <div className="form-group m-0">
            <label htmlFor="text">Image</label>
            <input type="file" onChange={uploadImage} name="image" className="form-control"></input>
            {errors.image && <h4 className="errors" >{errors.image}</h4>}
          </div>

          <div className="form-group m-2">
            <label htmlFor="text">All Brand</label>
            <select name="brand" onChange={(e) => handleSelect(e)} className="form-control">
              <option value="brand">Brands</option>
              {allBrandData?.map((e, index) => (
                <option key={index} id="brand" value={e}>{e}</option>
              ))}
            </select>
          </div>

          <div className="form-group m-2">
            <label htmlFor="text">Capacity</label>
            <input type="number" min="0" max="5" onChange={(e) => handleChange(e)} name="capacity" className="form-control" value={input.capacity}></input>
            {errors.capacity && <h4 className="errors">{errors.capacity}</h4>}
          </div>

          <div className="form-group m-2">
            <label htmlFor="text">Memory RAM</label>
            <input type="number" min="0" max="5" onChange={(e) => handleChange(e)} name="memoryRAM" className="form-control" value={input.memoryRAM}></input>
            {errors.memoryRAM && <h4 className="errors">{errors.memoryRAM}</h4>}
          </div>

          <div className="form-group m-2">
            <label htmlFor="text">Price</label>
            <input type="number" onChange={(e) => handleChange(e)} name="price" className="form-control" value={input.price}></input>
            {errors.price && <h4 className="errors">{errors.price}</h4>}
          </div>

          <div className="form-group m-2">
            <label htmlFor="text">Stock</label>
            <input type="number" min="0" max="5" onChange={(e) => handleChange(e)} name="stock" className="form-control" value={input.stock}></input>
            {errors.stock && <h4 className="errors">{errors.stock}</h4>}
          </div>

          <div className="form-group m-2">
            <label htmlFor="text">Description</label>
            <textarea type="text" onChange={(e) => handleChange(e)} value={input.description} name='description' className="form-control"></textarea>
            {errors.description && <h4 className="errors">{errors.description}</h4>}
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end text-decoration-none">
            <Link to='/home'>
              <button type="submit" className="btn btn-outline-dark">Back</button>
            </Link>
            <button type="submit" className="btn btn-outline-dark">Submit</button>
          </div>
        </form>
      </div>
      <Toaster position="bottom-right" reverseOrder={false}/>
    </div>

    )
    :<NotFound/>

  )
}

