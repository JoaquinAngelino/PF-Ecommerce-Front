import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CreateProduct/CreateProduct.css';
import { createPost, getCelulares } from '../../redux/actions';
import { Link } from 'react-router-dom';

const validations = (input) => {
  const errors = {};
  if (!input.line) errors.line = "errors found";
  if (!input.image) errors.image = "image not found";
  if (!input.description) errors.description = "description not found";
  if (!input.model) errors.model = "model not found";
  // if (!input.price.trim()) errors.price = "price not found";
  // if (!input.spec.trim()) errors.spec = "spec not found";
  return errors;
}


const CreateProduct = () => {
  const dispatch = useDispatch();
  const allBorad = useSelector((state) => state.allCell);//a esta variable la mapeo los brand o spec !!!
  // const allSpec = useSelector((state) => state.allCell);

  const [input, setInput] = useState({
    line: "",
    image: "",
    description: "",
    model: "",
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
      allBorad: [...input.brand, e.target.value]
    })
  }
  const handleDelete = (e) => {
    setInput({
      ...input,
      allBorad: input.borad.filter((g) => g !== e)
    })
  }

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
      console.log(input, 'soy lo que se envia desde el front')
      alert("your cell phone was created")
      setInput({
        line: "",
        image: "",
        description: "",
        model: "",
      })
    } else {
      alert("we could not create your cell")
    }
  }

  useEffect(() => {
    // dispatch(getCelulares());
  }, [dispatch])

  return (
    <div className="container">
      <h1 className="title text-center">Create Product</h1>
      <div className="abs-center">
        <form onSubmit={(e) => handleSubmit(e)} className="border p-3 form border-info">
          <div className="form-group m-2">
            <label htmlFor="text">line</label>
            <input type="text" onChange={(e) => handleChange(e)} name="line" className="form-control"
              value={input.line}></input>
          </div>
          {errors.line && <h4 className=''>{errors.line}</h4>}
          <div className="form-group m-2">
            <label htmlFor="text">Image</label>
            <input type="url" onChange={(e) => handleChange(e)} name="image" className="form-control" value={input.image}></input>
          </div>
          {errors.image && <h4 className='' >{errors.image}</h4>}
          <div className="form-group m-2">
            <label htmlFor="text">Model</label>
            <input type="text" onChange={(e) => handleChange(e)} name="model" className="form-control" value={input.model}></input>
          </div>
          {errors.model && <h4 className=''>{errors.model}</h4>}
          <div className="form-group m-2">
            <label htmlFor="text">Description</label>
            <textarea type="text" onChange={(e) => handleChange(e)} name="description" value={input.description} className="form-control"></textarea>
          </div>
          {errors.description && <h4 className=''>{errors.description}</h4>}
          <div className="form-group m-2">
            <label htmlFor="text">all Brand</label>
            <select type="text" onChange={(e) => handleChange(e)} name="brand" value={input.brand} className="form-control">
              <option value="brand">Brands</option>
              {
                allBorad?.map((e, index) => {
                  return (
                    <option key={index} value={e.borad}>{e.name}</option>
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
          <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
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
