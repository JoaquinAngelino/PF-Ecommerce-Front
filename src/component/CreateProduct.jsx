import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../component/CreateProduct.css';
// import { Link } from 'react-router-dom';
const Validate = (input) => {
  const errors = {};
  if (!input.linea.trim()) errors.linea = "errors found";
  if (!input.image.trim()) errors.image = "image not found";
  if (!input.description.trim()) errors.description = "description not found";
  if (!input.modelo.trim()) errors.modelo = "modelo not found";
  if (!input.precio.trim()) errors.precio = "precio not found";
  if (!input.especificaciones.trim()) errors.especificaciones = "especificaciones not found";
  return errors;
}

const CreateProduct = () => {
  const dispatch = useDispath();
  const typeMarca = useSelector((state) => state.ejemplo);

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    linea: "",
    image: "",
    description: "",
    modelo: "",
    precio: "",
    especificaciones: ""
  })

  const handleDelete = (e) => {
    setInput({
      ...input,
      ejemplo: input.ejemplo.filter((g) => g !== e)
    })
  }

  const handleChange = (e) => {
    const { linea, value } = e.target;
    setInput({
      ...input,
      [linea]: value,
    });
    setErrors(
      Validate({
        ...errors,
        [linea]: value
      }));
  }

  const handleSelect = (e) => {
    setInput({
      ejemplo: [...input.ejemplo, e.target.value]
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(
      Validate({
        ...input,
        [e.target.linea]: errors.target.value
      })
    )
    if (Object.keys(errors).length === 0) {
      dispatch(functionReducer(input))
      alert("your cell phone was created")
      setInput({
        linea: "",
        image: "",
        description: "",
        modelo: "",
        precio: "",
        especificaciones: ""
      })
    } else {
      alert("we could not create your cell")
    }
  }


  useEffect(() => {
    dispatch(postProductCel());
  }, [dispatch])

  return (
    <div class="container">
      <h1 class="title text-center">Create Product</h1>
      <div class="abs-center">
        <form action="#" class="border p-3 form border-success">
          <div class="form-group m-2">
            <label for="text">Linea</label>
            <input type="text" linea="text" id="text" class="form-control "></input>
          </div>
          <div class="form-group m-2">
            <label for="text">Image</label>
            <input type="text" linea="text" id="text" class="form-control"></input>
          </div>
          <div class="form-group m-2">
            <label for="text">Model</label>
            <input type="text" linea="text" id="text" class="form-control"></input>
          </div>
          <div class="form-group m-2">
            <label for="text">Description</label>
            <textarea type="text" linea="text" id="text" class="form-control"></textarea>
          </div>
          <div class="form-group m-2">
            <label for="">Specs</label>
            <select type="text" linea="text" id="text" class="form-control"></select>
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end ">
            <button type="submit" class="btn btn-outline-success">Back</button>
            <button type="submit" class="btn btn-outline-success">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct
