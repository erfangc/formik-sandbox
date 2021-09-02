import {Form, Formik, useField} from 'formik'
import React, {useState} from 'react'
import NumberFormat, {NumberFormatProps} from 'react-number-format';
import * as yup from 'yup';
import {SchemaOf} from 'yup';
import {FieldAttributes} from "formik/dist/Field";
import {initialValues} from "./initialValues";

interface Person {
    firstName?: string
    lastName?: string
    email?: string
    amount?: number
    anotherField?: number | undefined
}

export default function Home() {

    const [data, setData] = useState<Person>({amount: 18888.222});

    const schema: SchemaOf<Person> = yup.object({
        firstName: yup.string().max(64).min(2).required(),
        lastName: yup.string().max(64).min(2).required(),
        email: yup.string().required(),
        amount: yup.number().required(),
        anotherField: yup.number().required(),
    });

    function handleSubmit(values: Person) {
        setData(values);
    }

    const iv = initialValues(data, schema);

    return (
        <div>
            <main className="flex-col flex items-center justify-center min-h-screen container mx-auto">
                <Formik
                    initialValues={iv}
                    onSubmit={handleSubmit}
                    validationSchema={schema}
                >
                    <Form className="grid gap-2 grid-cols-2 w-full">
                        <TextInput label="First Name" name="firstName" type="text"/>
                        <TextInput label="Last Name" name="lastName" type="text"/>
                        <TextInput label="Address" name="address" type="text"/>
                        <TextInput label="City" name="city" type="text"/>
                        <TextInput label="State" name="state" type="text"/>
                        <TextInput label="Country" name="country" type="text"/>
                        <TextInput label="Zipcode" name="zipcode" type="text"/>
                        <TextInput label="Email" name="email" type="email"/>
                        <NumberField label="Phone" type="tel" name="phone" format="(###) ###-####" mask="_"/>
                        <NumberField label="Amount" name="amount"/>
                        <NumberField label="Another Field" name="anotherField"/>
                        <button
                            type="submit"
                            className="px-4 py-1 rounded bg-blue-500 text-white font-bold col-span-2"
                        >
                            Submit
                        </button>
                    </Form>
                </Formik>
                <br/>
                <pre>{JSON.stringify(data)}</pre>
            </main>
        </div>
    )
}

interface TextInputProps extends FieldAttributes<any> {
    label: string
}

function TextInput({label, name, ...props}: TextInputProps) {
    const [field, meta] = useField(name);
    return (
        <label className="flex flex-col space-y-1">
            <div>{label}</div>
            <input {...props} {...field}/>
            <p className="text-red-500 text-sm">{meta.touched && meta.error ? meta.error : <span>&nbsp;</span>}</p>
        </label>
    )
}

interface MyNumberInputProps extends NumberFormatProps {
    label: string
}

function NumberField({label, name, ...props}: MyNumberInputProps) {
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
