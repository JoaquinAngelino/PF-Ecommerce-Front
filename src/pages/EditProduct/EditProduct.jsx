import {Formik,Form} from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomSelect from "../../components/CustomInput/CustomSelect";
import { cellDetail, getAllBrands, updateProduct } from "../../redux/actions";
import * as yup from "yup";
import "./EditProduct.css"
import CustomTextArea from "../../components/CustomInput/CustomTextArea";

export default function EditProduct(){
    const dispatch=useDispatch();
    const cell=useSelector((state)=>state.details);
    console.log(cell);
    const allBrandData = useSelector((state) => state.brands);
    const id=2;
    const products={
    }
    useEffect(() => {
        dispatch(cellDetail(id));
        dispatch(getAllBrands());
    }, [dispatch, id])

//    console.log(products);
    async function onSubmit(values,actions){
        await new Promise((resolve)=>setTimeout(resolve,1000));
        actions.resetForm()
        
    }
    function onCLick(ev){
        dispatch(updateProduct(id,ev));
        alert("Cell updated")
    }
    function onClickCancel(){
        alert("Cancel")
    }

// VALIDACIONES




const ValidateInput=yup.object().shape({
    'model': yup
    .string()
    .max(20,"Line must have max 20 characters")
    .required("Required model"),
    'line': yup
    .string()
    .max(20,"Line must have max 20 characters")
    .required("Required line"),
    'image': yup
    .string()
    .max(100,"Line must have max 100 characters")
    .required("Required image"),
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



    return (
        <div className="container-fluid">
            <h1 className="title text-center p-3">Edit Product</h1>
            <div className="subcontainer-edit">
                <Formik initialValues={products} onSubmit={onSubmit} validationSchema={ValidateInput}>
                    {(props)=>(
                        <>
                            <div class="row">
                                <div class="col">
                                <Form>
                                    <CustomInput 
                                        label="Model: "
                                        name="model"
                                        type="text"
                                        placeholder={cell?.model}
                                        
                                    />
                                    <CustomInput 
                                        label="Line: "
                                        name="line"
                                        type="text"
                                        placeholder={cell?.line}
                                    />
                                    <CustomInput 
                                        label="Image: "
                                        name="image"
                                        type="text"
                                        placeholder={cell?.image}
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
                                        placeholder={cell?.capacity}
                                    />
                                    <CustomInput 
                                        label="Memory RAM: "
                                        name="memoryRAM"
                                        type="number"
                                        placeholder={cell?.memoryRAM}
                                        min="0" max="5"
                                    />
                                    <CustomInput 
                                        label="Price: "
                                        name="price"
                                        type="number"
                                        placeholder={cell?.price}
                                    />
                                    <CustomInput 
                                        label="Stock: "
                                        name="stock"
                                        type="number"
                                        placeholder={cell?.stock}
                                    />
                                    <CustomTextArea
                                        label="Description: "
                                        name="description"
                                        type="text"
                                        placeholder={cell?.description}
                                    />
                                    {/* <CustomTextArea
                                        label="Spec: "
                                        name="spec"
                                        type="text"
                                        placeholder={cell?.spec.join(",").replaceAll(",","\n")}
                                    /> */}
        
                            <div className="d-grid gap-2 d-md-flex justify-content-md-center text-decoration-none">
                            <input disabled={props.isSubmitting} type="submit" value="Edit" onClick={()=>onCLick(props.values)} className="btn btn-outline-dark"/>
                                <input type="submit" value="Cancel" onClick={()=>onClickCancel()} className="btn btn-outline-dark"/>
                                

                            </div>
                               </Form>
                                </div>
                                <div className="col">
                                    {
                                        !cell!==""?(<p>Model: {props.values.model===undefined?cell?.model:props.values.model}</p>):null
                                    }
                                    {
                                        cell!==""?(<p>Line: {props.values.line===undefined?cell?.line:props.values.line}</p>):null
                                    }
                                    {
                                        cell!==""?(<img src={props.values.image===undefined?cell?.image:props.values.image}/>):null
                                    }
                                    {
                                        cell!==""?(<p>Brand: {props.values.brand===undefined?cell?.brand:props.values.brand}</p>):null
                                    }
                                    {
                                        cell!==""?(<p>Capacity: {props.values.capacity===undefined?cell?.capacity:props.values.capacity}</p>):null
                                    }
                                    {
                                        cell!==""?(<p>Memory RAM: {props.values.memoryRAM===undefined?cell?.memoryRAM:props.values.memoryRAM}</p>):null
                                    }
                                    {
                                        cell!==""?(<p>Price: {props.values.price===undefined?cell?.price:props.values.price}</p>):null
                                    }
                                    {
                                        cell!==""?(<p>Stock: {props.values.stock===undefined?cell?.stock:props.values.stock}</p>):null
                                    }
                                    {
                                        cell!==""?(<p>Description: {props.values.description===undefined?cell?.description:props.values.description}</p>):null
                                    }
                                    {
                                        // cell!==""?(<p>Spec: {props.values.spec===undefined?cell?.spec.join(",").replaceAll(",","\n"):props.values.spec}</p>):null
                                    }
                                    
                                </div>
                            </div>
                        </>
                        ) 
                    }
                </Formik>
            </div>
        </div>       
    )
}