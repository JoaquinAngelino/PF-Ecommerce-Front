import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPost, getAllBrands, allUser } from '../../redux/actions';
// import './CreateProduct.css';
import { Link, useNavigate } from 'react-router-dom';
import { error, success } from '../../components/Toast/Toast';

import {Formik,Form} from "formik";
import CustomInput from '../../components/CustomInput/CustomInput';
import * as yup from "yup";
import CustomSelect from '../../components/CustomInput/CustomSelect';
import CustomTextArea from '../../components/CustomInput/CustomTextArea';
import swal from 'sweetalert';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth0 } from '@auth0/auth0-react';
import NotFound from '../NotFound/NotFound'


export default function CreateProduct() {
  const dispatch=useDispatch();
  const allBrandData = useSelector((state) => state.brands);
    //proteger ruta
    const allUsers=useSelector(state=>state.allUser)
    const { user, isAuthenticated } = useAuth0()
    const usuarios = allUsers
    const emailAuth0=email()
    const userLogin=filterEmail()
    //console.log(userLogin)
  // proteger ruta
  const history=useNavigate();
  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(allUser())
}, [dispatch])

async function onSubmit(values,actions){
  await new Promise((resolve)=>setTimeout(resolve,1000));
  actions.resetForm()
}
const products={
}

async function onChangeValue (ev,props){
  
  if(ev.target.name=="color"){
      if(props.values['spec']==undefined){
        props.values.spec=[];
        props.values.spec[0]=`Color: ${ev.target.value}`; 
      }else{
        props.values.spec[0]=`Color: ${ev.target.value}`;
      }
  }
  if(ev.target.name=="dualSim"){
        if(props.values['spec']==undefined){
          props.values.spec=[];
          props.values.spec[1]=`Dual SIM: ${ev.target.value}`;
        }else{
          props.values.spec[1]=`Dual SIM: ${ev.target.value}`;
        }
  }
  if(ev.target.name=="operating"){
      if(props.values['spec']==undefined){
        props.values.spec=[];
        props.values.spec[2]=`Operating system: ${ev.target.value}`;
      }else{
      props.values.spec[2]=`Operating system: ${ev.target.value}`;
      }
  }
  if(ev.target.name=="rearCamera"){
      if(props.values['spec']==undefined){
        props.values.spec=[];
        props.values.spec[3]=`Rear camera resolution: ${ev.target.value} Mpx`;
      }else{
      props.values.spec[3]=`Rear camera resolution: ${ev.target.value} Mpx`;
      }
  }
  if(ev.target.name=="frontCamera"){
      if(props.values['spec']==undefined){
        props.values.spec=[];
        props.values.spec[4]=`Front camera resolution: ${ev.target.value} Mpx`;
      }else{
      props.values.spec[4]=`Front camera resolution: ${ev.target.value} Mpx`;
      }
  }
  if(ev.target.name=="launching"){
      if(props.values['spec']==undefined){
        props.values.spec=[];
        props.values.spec[5]=`launching: ${ev.target.value}`;
      }else{
      props.values.spec[5]=`launching: ${ev.target.value}`;
      }
  }
  if(ev.target.name=="resistant"){
      if(props.values['spec']==undefined){
        props.values.spec=[];
        props.values.spec[6]=`Resistant to the water: ${ev.target.value}`;
      }else{
      props.values.spec[6]=`Resistant to the water: ${ev.target.value}`;
      }
  }
  if(ev.target.name=="images"){
      const data = new FormData();
      data.append("file", ev.target.files[0]);
      data.append("upload_preset", "unns5r2a");
      const res = await fetch("https://api.cloudinary.com/v1_1/dfx7so2fc/upload", { method: "POST", body: data, });
      const file = await res.json();
      props.values.image=file.secure_url;
  }
  
}

const ValidateInput=yup.object().shape({
  'model': yup
  .string()
  .max(20,"Line must have max 20 characters")
  .required("Required model"),
  'line': yup
  .string()
  .max(20,"Line must have max 20 characters")
  .required("Required line"),
  'brand': yup
  .string()
  .oneOf(allBrandData)
  .required("Required Brand"),
  'capacity':yup
  .string()
  .max(5,"Line must have max 5 characters")
  .required("Required Capacity"),
  'memoryRAM':yup
  .string()
  .max(1,"Line must have max 1 characters")
  .required("Required memoryRAM"),
  'price':yup
  .string()
  .max(10,"Line must have max 10 characters")
  .matches(/^[0-9]{1,5}(([.]|[,])[0-9]+)?$/,"the field must be priced appropriately")
  .required("Required price"),
  'stock':yup
  .string()
  .max(10,"Line must have max 10 characters")
  .required("Required stock"),
  'description':yup
  .string()
  .max(500,"Line must have max 500 characters")
  .required("Required description"),
})

function onCLick(ev,props){
  if(Object.keys(props.errors).length==0){
    dispatch(createPost(ev))
     swal({title:`Your cell was created`});
     history("/")
  }
  if(Object.keys(props.touched).length==0){
    swal({title:`You must complete all fields`})
  }  
}
function onClickCancel(ev){
  swal({title:`Has been canceled`})
  history("/")
}
//proteger ruta
function email() {
  if (isAuthenticated) {
    return user.email
  }
}
function filterEmail() {
  if (isAuthenticated && usuarios.length) {
    return usuarios.filter(e => e.email === emailAuth0)
  }
}
// proteger ruta

  return (
    isAuthenticated && userLogin && userLogin[0] && userLogin[0].role!=="Cliente"
    ?(
      <div className="container">
      <h1 className="title text-center p-3">Create Product</h1>
      <div className="abs-center">
          <Formik initialValues={products} onSubmit={onSubmit} validationSchema={ValidateInput}>
            {
              (props)=>(
                <>
                  <Form className="shadow-lg mb-5 row g-3 needs-validation p-3 form border-info ">
                    <CustomInput 
                      label="Model: "
                      name="model"
                      type="text"
                      placeholder="Enter the model"
                    />
                    <CustomInput 
                      label="Line: "
                      name="line"
                      type="text"
                      placeholder="Enter the line"
                    />
                    <CustomInput 
                      label="Image: "
                      name="images"
                      type="file"
                      onChange={(ev)=>onChangeValue(ev,props)}
                    />
                    <CustomSelect 
                      label="All Brands: "
                      name="brand"
                      type="text"
                      placeholder="Please Selecciona:"
                    >
                      <option value="">Select Brand: </option>
                        {
                          allBrandData?.map((e, index) => (
                            <option key={index} id="brand" value={e}>{e}</option>
                          ))
                        }
                    </CustomSelect>
                    <CustomInput 
                      label="Capacity: "
                      name="capacity"
                      type="number"
                      placeholder="Enter the capacity"
                    />
                    <CustomInput 
                      label="Memory RAM: "
                      name="memoryRAM"
                      type="number"
                      placeholder="Enter the Memory RAM"
                      min="0" max="5"
                    />
                    <CustomInput 
                      label="Price: "
                      name="price"
                      type="number"
                      placeholder="Enter the Price"
                    />
                    <CustomInput 
                      label="Stock: "
                      name="stock"
                      type="number"
                      placeholder="Enter the Stock"
                    />
                    <CustomTextArea
                      label="Description: "
                      name="description"
                      type="text"
                      placeholder="Enter the Description"
                    />
                    <div>
                        <h6>Specifications:</h6>
                        <CustomInput 
                        label="Color: "
                        name="color"
                        // values={state.color}
                        onChange={(ev)=>onChangeValue(ev,props)}
                        type="text"
                        placeholder="Enter the Color"
                        />
                        <CustomSelect 
                        label="Dual SIM: "
                        name="dualSim"
                        // values={state.dualSim}
                        onChange={(ev)=>onChangeValue(ev,props)}
                        type="text"
                        placeholder="Enter the Dual SIM"
                        >
                        <option value="">Select Dual SIM: </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        </CustomSelect>
                        <CustomInput 
                        label="Operating system "
                        name="operating"
                        // values={state.operating}
                        onChange={(ev)=>onChangeValue(ev,props)}
                        type="text"
                        placeholder="Enter the Operating System"
                        />
                        <CustomInput 
                        label="Rear Camera Resolution: "
                        name="rearCamera"
                        // values={state.rearCamera}
                        onChange={(ev)=>onChangeValue(ev,props)}
                        type="number"
                        placeholder="Enter the Rear Camera Resolution"
                        />
                        <CustomInput 
                        label="Front Camera Resolution: "
                        name="frontCamera"
                        // values={state.frontCamera}
                        onChange={(ev)=>onChangeValue(ev,props)}
                        type="number"
                        placeholder="Enter the Front Camera Resolution"
                        />
                        <CustomInput 
                        label="Launching: "
                        name="launching"
                        // values={state.launching}
                        onChange={(ev)=>onChangeValue(ev,props)}
                        type="text"
                        placeholder="Enter the Launching"
                        />
                        <CustomSelect 
                        label="Resistant to the water: "
                        name="resistant"
                        // values={state.resistant}
                        onChange={(ev)=>onChangeValue(ev,props)}
                        type="text"
                        placeholder="Enter the Resistant to the water"
                        >
                        <option value="">Select Resistant to the water: </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        </CustomSelect>
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center text-decoration-none">
                      <input disabled={ Object.keys(props.errors).length!=0?true:props.isSubmitting} type="submit" value="Create" onClick={()=>onCLick(props.values,props)} className="btn btn-outline-dark"/>
                      <input type="submit" value="Cancel" onClick={()=>onClickCancel(props)} className="btn btn-outline-dark"/>
                    </div>
                  </Form>
                      
                </>
              )
            }
          </Formik>
      </div>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </div>
    )
    :<NotFound/>

  )
}