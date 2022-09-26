import {useField} from "formik";

const CustomInput=({label,...props})=>{
    const [field,meta]=useField(props);
    return(
        <div className="form-group m-2">
            <label className="form-label">{label}</label>
            <input {...field} {...props}
            className={meta.touched && meta.error ? "form-control is-invalid":"form-control"}
            />
            {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
        </div>
    )
}

export default CustomInput;