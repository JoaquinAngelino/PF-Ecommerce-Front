import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPost, getAllBrands } from '../../redux/actions';
import './CreateProduct.css';
import { Link } from 'react-router-dom';

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
  } else if (!input.brand.trim()) {
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

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    line: "",
    model: "",
    image: "",
    description: "",
    spec: [],
    brand: "",
    capacity: 0,
    memoryRAM: 0,
    stock: 0,
    price: 0
  })

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
    if (!input.model && !input.line && !input.image && !input.description && !input.brand && !input.capacity) return alert("does not contain fields");
    if (Object.keys(errors).length === 0) {
      dispatch(createPost(input))
      alert("your cell phone was created")
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
      alert("we could not create your cell");
    }
    return;
  }
  useEffect(() => {
    dispatch(getAllBrands(allBrandData))
  }, [dispatch])

  return (
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
            <input type="url" onChange={(e) => handleChange(e)} name="image" className="form-control" value={input.image}></input>
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
    </div>
  )
}

