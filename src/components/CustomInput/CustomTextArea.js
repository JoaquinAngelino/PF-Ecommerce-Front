import {useField} from "formik";

const CustomTextArea=({label,...props})=>{
    const [field,meta]=useField(props);
    return(
        <div className="form-group m-2">
            <label className="form-label">{label}</label>
            <textarea {...field} {...props}
            className={meta.touched && meta.error ? "form-control is-invalid":"form-control"}
            />
            {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
        </div>
    )
}

export default CustomTextArea;