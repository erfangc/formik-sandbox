import {useField} from "formik";
import NumberFormat, {NumberFormatProps} from "react-number-format";
import React from "react";

interface MyNumberInputProps extends NumberFormatProps {
    label: string
}

export function NumberField({label, name, ...props}: MyNumberInputProps) {
    // @ts-ignore
    const [field, meta, helpers] = useField(name);
    return (
        <label className="flex flex-col space-y-1">
            <div>{label}</div>
            <NumberFormat
                thousandSeparator
                name={name}
                onValueChange={values => helpers.setValue(values.floatValue)}
                onChange={() => helpers.setTouched(true)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                {...props}
            />
            <p className="text-red-500 text-sm">{meta.touched && meta.error ? meta.error : <span>&nbsp;</span>}</p>
        </label>
    )
}