import {FieldAttributes, useField} from "formik";
import React from "react";

interface TextInputProps extends FieldAttributes<any> {
    label: string
}

export function TextInput({label, name, ...props}: TextInputProps) {
    const [field, meta] = useField(name);
    return (
        <label className="flex flex-col space-y-1">
            <div>{label}</div>
            <input {...props} {...field}/>
            <p className="text-red-500 text-sm">{meta.touched && meta.error ? meta.error : <span>&nbsp;</span>}</p>
        </label>
    )
}