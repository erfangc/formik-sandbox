import {Form, Formik} from 'formik'
import React, {useState} from 'react'
import * as yup from 'yup';
import {SchemaOf} from 'yup';
import {initializeValueToSchema} from "../initializeValueToSchema";
import {Submit} from "../components/Submit";
import {TextInput} from "../components/TextInput";
import {NumberField} from "../components/NumberField";

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

    const initialValue = initializeValueToSchema(data, schema);

    return (
        <div>
            <main className="flex-col flex items-center justify-center min-h-screen container mx-auto">
                <Formik
                    initialValues={initialValue}
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
                        <Submit/>
                    </Form>
                </Formik>
                <br/>
                <pre>{JSON.stringify(data)}</pre>
            </main>
        </div>
    )
}

