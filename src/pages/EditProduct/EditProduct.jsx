import {Formik,Form} from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomSelect from "../../components/CustomInput/CustomSelect";
import { cellDetail, getAllBrands, updateProduct } from "../../redux/actions";
import * as yup from "yup";
import "./EditProduct.css"
import CustomTextArea from "../../components/CustomInput/CustomTextArea";
import { useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';


export default function EditProduct(){
    const dispatch=useDispatch();
    const history=useNavigate();
    const cell=useSelector((state)=>state.details);
    //Specification to cell
    var sp1=cell?.spec[0]?.split(":");
    var sp2=cell?.spec[1]?.split(":");
    var sp3=cell?.spec[2]?.split(":");
    var sp4=cell?.spec[3]?.split(":");
    var sp5=cell?.spec[4]?.split(":");
    var sp6=cell?.spec[5]?.split(":");
    var sp7=cell?.spec[6]?.split(":");

    const [state,setState]=useState({
    });
    const [input,setInput]=useState({
    });
    const allBrandData = useSelector((state) => state.brands);
    const { id } = useParams();
    const products={
    }
    useEffect(() => {
        dispatch(cellDetail(id));
        dispatch(getAllBrands());
    }, [dispatch, id])
    async function onSubmit(values,actions){
        await new Promise((resolve)=>setTimeout(resolve,1000));
        actions.resetForm()
    }
   
      async function onChangeValue (ev){
        if(ev.target.name=="color"){
            setState({...state,color:ev.target.value});
        }
        if(ev.target.name=="dualSim"){
            setState({...state,dualSim:ev.target.value});
        }
        if(ev.target.name=="operating"){
            setState({...state,operating:ev.target.value});
        }
        if(ev.target.name=="rearCamera"){
            setState({...state,rearCamera:`${ev.target.value} Mpx`});
        }
        if(ev.target.name=="frontCamera"){
            setState({...state,frontCamera:`${ev.target.value} Mpx`});
        }
        if(ev.target.name=="launching"){
            setState({...state,launching:ev.target.value});
        }
        if(ev.target.name=="resistant"){
            setState({...state,resistant:ev.target.value});
        }
        if(ev.target.name=="images"){
            const data = new FormData();
            data.append("file", ev.target.files[0]);
            data.append("upload_preset", "unns5r2a");
            const res = await fetch("https://api.cloudinary.com/v1_1/dfx7so2fc/upload", { method: "POST", body: data, });
            const file = await res.json();
            setInput({ ...input, image: file.secure_url });
        }
        
    }

    function onCLick(ev){
        var arr = Object.entries(state);
        var d=[]

        for(let i in arr){
            if(arr[i][0]=="color"){
                arr[i][0]="Color";
            }else if(arr[i][0]=="dualSim"){
                arr[i][0]="Dual SIM";
            }else if(arr[i][0]=="operating"){
                arr[i][0]="Operating system";
            }else if(arr[i][0]=="rearCamera"){
                arr[i][0]="Rear camera resolution";
            }else if(arr[i][0]=="frontCamera"){
                arr[i][0]="Front camera resolution";
            }else if(arr[i][0]=="launching"){
                arr[i][0]="launching";
            }else if(arr[i][0]=="resistant"){
                arr[i][0]="Resistant to the water";
            }
            var aa=arr[i].join(":");
            d.push(aa);
        }
        //DATOS DE CELL
        var data1=cell.spec;
        // DATOS DE spec 
        var data2=d;
        var array = [];
        for (var i = 0; i < data1.length; i++) {
            var igual=false;
                for (var j = 0; j < data2.length && !igual ; j++) {
                    var a=data1[i].split(":");
                    var b=data2[j].split(":");
                    if(a[0]== b[0]){
                        a[1]=b[1]
                        var aa=a.join(": ");
                        array.push(aa);
                        igual=true;
                    }
                 
                }
            if(!igual)array.push(data1[i]);
        }

        ev.spec=array;
        ev.image=input.image;
        dispatch(updateProduct(id,ev));
        swal({title:` It has been successfully updated`})
        history("/panelCells");
    }
    function onClickCancel(){
        swal({title:`Has been canceled`})
        history("/panelCells")
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
    // 'image': yup
    // .string()
    // .max(100,"Line must have max 100 characters")
    // .required("Required image"),
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
                                        name="images"
                                        type="file"
                                        onChange={(ev)=>onChangeValue(ev)}
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
                                    <div>
                                        <h6>Specifications:</h6>
                                        <CustomInput 
                                        label="Color: "
                                        name="color"
                                        values={state.color}
                                        onChange={(ev)=>onChangeValue(ev)}
                                        type="text"
                                        placeholder={sp1?.[1]}
                                        />
                                        <CustomSelect 
                                        label="Dual SIM: "
                                        name="dualSim"
                                        values={state.dualSim}
                                        onChange={(ev)=>onChangeValue(ev)}
                                        type="text"
                                        placeholder={sp2?.[1]}
                                        >
                                        <option value="">Select Dual SIM: </option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                        </CustomSelect>
                                        <CustomInput 
                                        label="Operating system "
                                        name="operating"
                                        values={state.operating}
                                        onChange={(ev)=>onChangeValue(ev)}
                                        type="text"
                                        placeholder={sp3?.[1]}
                                        />
                                        <CustomInput 
                                        label="Rear Camera Resolution: "
                                        name="rearCamera"
                                        values={state.rearCamera}
                                        onChange={(ev)=>onChangeValue(ev)}
                                        type="number"
                                        placeholder={sp4?.[1]}
                                        />
                                        <CustomInput 
                                        label="Front Camera Resolution: "
                                        name="frontCamera"
                                        values={state.frontCamera}
                                        onChange={(ev)=>onChangeValue(ev)}
                                        type="number"
                                        placeholder={sp5?.[1]}
                                        />
                                        <CustomInput 
                                        label="Launching: "
                                        name="launching"
                                        values={state.launching}
                                        onChange={(ev)=>onChangeValue(ev)}
                                        type="text"
                                        placeholder={sp6?.[1]}
                                        />
                                        <CustomSelect 
                                        label="Resistant to the water: "
                                        name="resistant"
                                        values={state.resistant}
                                        onChange={(ev)=>onChangeValue(ev)}
                                        type="text"
                                        placeholder={sp7?.[1]}
                                        >
                                        <option value="">Select Resistant to the water: </option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                        </CustomSelect>
                                    </div>
                                    
        
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
                                    <h6>Specifications: </h6>
                                    {
                                        cell!==""?(<p>Color: {state.color===undefined?sp1?.[1]:state.color}</p>):null
                                    }
                                    {
                                        cell!==""?(<p>Dual SIM: {state.dualSim===undefined?sp2?.[1]:state.dualSim}</p>):null
                                    }
                                    {
                                        cell!==""?(<p>Operating system: {state.operating===undefined?sp3?.[1]:state.operating}</p>):null
                                    }
                                    {
                                        cell!==""?(<p>Rear camera resolution: {state.rearCamera===undefined?sp4?.[1]:state.rearCamera}</p>):null
                                    }
                                    {
                                        cell!==""?(<p>Front camera resolution: {state.frontCamera===undefined?sp5?.[1]:state.frontCamera}</p>):null
                                    }
                                    {
                                        cell!==""?(<p>Launching: {state.launching===undefined?sp6?.[1]:state.launching}</p>):null
                                    }
                                    {
                                        cell!==""?(<p>Resistant to the water: {state.resistant===undefined?sp7?.[1]:state.resistant}</p>):null
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