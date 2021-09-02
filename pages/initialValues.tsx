export function initialValues(data: any, schema: any) {
    const ret: any = {};
    Object
        .keys(schema.fields).map(key => {
        if (data[key] != undefined) {
            ret[key] = data[key];
        } else {
            ret[key] = undefined;
        }
    });
    return ret;
}