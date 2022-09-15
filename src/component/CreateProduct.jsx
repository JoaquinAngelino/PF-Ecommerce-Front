import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../component/CreateProduct.css';
// import { Link } from 'react-router-dom';
// const Validate = (input) => {
//    const errors = {};
//    if (!input.name.trim()) errors.name = "errors found";
//    if (!input.image.trim()) errors.image = "image not found";
//    if (!input.description.trim()) errors.description = "description not found";
//    if (!input.modelo.trim()) errors.modelo = "modelo not found";
//    if (!input.precio.trim()) errors.precio = "precio not found";
//    if (!input.especificaciones.trim()) errors.especificaciones = "especificaciones not found";
//    return errors;
// }

const CreateProduct = () => {
  // const dispatch = useDispath();
  // const typeMarca = useSelector((state) => state.ejemplo);

  // const [errors, setErrors] = useState({});
  // const [input, setInput] = useState({
  //    name: "",
  //    image: "",
  //    description: "",
  //    modelo: "",
  //    precio: "",
  //    especificaciones: ""
  // })

  // const handleDelete = (e) => {
  //    setInput({
  //       ...input,
  //       ejemplo: input.ejemplo.filter((g) => g !== e)
  //    })
  // }

  // const handleChange = (e) => {
  //    const { name, value } = e.target;
  //    setInput({
  //       ...input,
  //       [name]: value,
  //    });
  //    setErrors(
  //       Validate({
  //          ...errors,
  //          [name]: value
  //       }));
  // }

  // // const handleSelect = (e) => {
  // //    setInput({
  // //       ejemplo: [...input.ejemplo, e.target.value]
  // //    })
  // // }

  // const handleSubmit = (e) => {
  //    e.preventDefault();
  //    setErrors(
  //       Validate({
  //          ...input,
  //          [e.target.name]: errors.target.value
  //       })
  //    )
  //    if (Object.keys(errors).length === 0) {
  //       // dispatch(functionReducer(input))
  //       alert("your cell phone was created")
  //       setInput({
  //          name: "",
  //          image: "",
  //          description: "",
  //          modelo: "",
  //          precio: "",
  //          especificaciones: ""
  //       })
  //    } else {
  //       alert("we could not create your cell")
  //    }
  // }


  // useEffect(() => {
  //  dispatch(ejemplo());
  // }, [dispatch])

  return (
    <div class="container">
      <h1 class="title text-center">Create Product</h1>
      <div class="abs-center">
        <form action="#" class="border p-3 form border-success">
          <div class="form-group m-2">
            <label for="text">Name</label>
            <input type="text" name="text" id="text" class="form-control "></input>
          </div>
          <div class="form-group m-2">
            <label for="text">Image</label>
            <input type="text" name="text" id="text" class="form-control"></input>
          </div>
          <div class="form-group m-2">
            <label for="text">Description</label>
            <input type="text" name="text" id="text" class="form-control"></input>
          </div>
          <div class="form-group m-2">
            <label for="text">Model</label>
            <input type="text" name="text" id="text" class="form-control"></input>
          </div>
          <div class="form-group m-2">
            <label for="">Specs</label>
            <textarea type="text" name="text" id="text" class="form-control"></textarea>
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
