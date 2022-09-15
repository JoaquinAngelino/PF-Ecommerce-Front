import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CreateProduct/CreateProduct.css';
import { createPost, getCelulares } from '../../redux/actions';
// import { Link } from 'react-router-dom';

const validations = (input) => {
  const errors = {};
  if (!input.line) errors.line = "errors found";
  // if (!input.image.trim()) errors.image = "image not found";
  if (!input.description) errors.description = "description not found";
  if (!input.model) errors.model = "model not found";
  // if (!input.price.trim()) errors.price = "price not found";
  // if (!input.spec.trim()) errors.spec = "spec not found";
  return errors;
}

const CreateProduct = () => {
  const dispatch = useDispatch();
  const typeMarca = useSelector((state) => state.celulares);

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    line: "",
    image: "",
    description: "",
    model: "",
    price: "",
    spec: [],
    brand: ""
  })

  // const handleDelete = (e) => {
  //   setInput({
  //     ...input,
  //     typeMarca: input.name.filter((g) => g !== e)
  //   })
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    setErrors(
      validations({
        ...errors,
        [name]: value
      }));
  }

  // const handleSelect = (e) => {
  //   setInput({
  //     typeMarca: [...input.brand, e.target.value]
  //   })
  // }

  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefault();
    setErrors(
      validations({
        ...input,
        [e.target.line]: errors.target.value
      })
    )
    if (Object.keys(errors).length === 0) {
      dispatch(createPost(input))
      console.log(input,'soy lo que se envia desde el front')
      alert("your cell phone was created")
      setInput({
        line: "",
        image: "",
        description: "",
        model: "",
        price: "",
        spec: "",
        brand: ""
      })
    } else {
      alert("we could not create your cell")
    }
  }

  useEffect(() => {
    dispatch(getCelulares());
  }, [dispatch])

  return (
    <div class="container">
      <h1 class="title text-center">Create Product</h1>
      <div class="abs-center">
        <form action="#" onSubmit={(e) => handleSubmit(e)} class="border p-3 form border-info">
          <div class="form-group m-2">
            <label for="text">line</label>
            <input type="text" onChange={(e) => handleChange(e)} name="line" class="form-control"
              id="line" value={input.line}></input>
          </div>
          {errors.line && <h4>{errors.line}</h4>}
          <div class="form-group m-2">
            <label for="text">Image</label>
            <input type="url" onChange={(e) => handleChange(e)} name="image" class="form-control" id="image" value={input.image}></input>
          </div>
          {errors.line && <h4>{errors.line}</h4>}
          <div class="form-group m-2">
            <label for="text">Model</label>
            <input type="text" onChange={(e) => handleChange(e)} name="model" class="form-control" id="model" value={input.model}></input>
          </div>
          {errors.line && <h4>{errors.model}</h4>}
          <div class="form-group m-2">
            <label for="text">Description</label>
            <textarea type="text" onChange={(e) => handleChange(e)} name="description" id="description" value={input.description} class="form-control"></textarea>
          </div>
          {errors.line && <h4>{errors.description}</h4>}
          <div class="form-group m-2">
            <label for="text">Brand</label>
            <textarea type="text" onChange={(e) => handleChange(e)} name="brand" value={input.brand} class="form-control"></textarea>
          </div>
          {errors.line && <h4>{errors.brand}</h4>}
          <div class="form-group m-2">
            <label for="">Specs</label>
            <select type="text" name="spec" id="spec" value={input.spec} class="form-control"></select>
          </div>
          {/* {errors.line && <h4>{errors.spec}</h4>} */}
          <div class="d-grid gap-2 d-md-flex justify-content-md-end ">
            <button type="submit" class="btn btn-outline-info">Back</button>
            <button type="submit" class="btn btn-outline-info">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct
