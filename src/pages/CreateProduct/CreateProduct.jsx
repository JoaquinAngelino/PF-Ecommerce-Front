import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CreateProduct/CreateProduct.css';
import { createPost, getAllProducts } from '../../redux/actions';
import { Link } from 'react-router-dom';

const validations = (input) => {
  const errors = {};
  if (!input.line) errors.line = "a name is needed";
  if (!input.image) errors.image = "a picture is needed";
  if (!input.description) errors.description = "of a description";
  if (!input.model) errors.model = "model needed";
  if (!input.brand) errors.price = "choose a brand";
  return errors;
}


const CreateProduct = () => {
  const dispatch = useDispatch();
  const allbrand = useSelector((state) => state.products);
  // console.log(allbrand, 'data de front')
  // const allSpec = useSelector((state) => state.allCell);

  const [input, setInput] = useState({
    line: "",
    image: "",
    description: "",
    model: "",
    brand: ""
  })
  const [errors, setErrors] = useState({});


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

  const handleSelect = (e) => {
    setInput({
      allbrand: [...input.brand, e.target.value]
    })
  }
  // const handleDelete = (e) => {
  //   setInput({
  //     ...input,
  //     allbrand: input.brand.filter((g) => g !== e)
  //   })
  // }

  // const handleEdit = () => {
  //   setInput({
  //   })
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e, 'soy el handleSubmit del front')
    setErrors(
      validations({
        ...input,
        [e.target.name]: errors.target.value
      })
    )
    if (Object.keys(errors).length === 0) {
      dispatch(createPost(input))
      // console.log(input, 'soy lo que se envia desde el front')
      alert("your cell phone was created")
      setInput({
        line: "",
        image: "",
        description: "",
        model: "",
        brand: ""
      })
    } else {
      alert("we could not create your cell")
    }
  }

  useEffect(() => {
    dispatch(getAllProducts());
    console.log(getAllProducts())
  }, [dispatch])

  return (
    <div className="container">
      <h1 className="title text-center">Create Product</h1>
      <div className="abs-center">
        <form onSubmit={(e) => handleSubmit(e)} className="border row g-3 needs-validation p-3 form border-info ">
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
            <label htmlFor="text">Model</label>
            <input type="text" onChange={(e) => handleChange(e)} name="model" className="form-control" value={input.model}></input>
            {errors.model && <h4 className="errors">{errors.model}</h4>}
          </div>
          <div className="form-group m-2">
            <label htmlFor="text">Description</label>
            <textarea type="text" onChange={(e) => handleChange(e)} name="description" value={input.description} className="form-control"></textarea>
            {errors.description ? <h4 className="errors">{errors.description}</h4> : ""}
          </div>
          <div className="form-group m-2">
            <label htmlFor="text">All Brand</label>
            <select id='brand' type="text" onChange={(e) => handleSelect(e)} name="brand" value={input.brand} className="form-control">
              <option value="brand">Brands</option>
              {
                allbrand?.map((e, index) => {
                  return (
                    <option key={index} value={e.brand}>{e.brand}</option>
                  )
                })
              }
            </select>
          </div>
          {/* <div className="form-group m-2">
            <label htmlFor="">Specs</label>
            <select type="text" name="spec" id="spec" value={input.spec} className="form-control"></select>
          </div> */}
          {/* {errors.line && <h4>{errors.spec}</h4>} */}
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Link to='/home'>
              <button type="submit" className="btn btn-outline-info">Back</button>
            </Link>
            <button type="submit" className="btn btn-outline-info">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct
