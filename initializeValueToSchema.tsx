/**
 *
 * @param value
 * @param schema
 */
export function initializeValueToSchema(value: any, schema: any) {
    const ret: any = {};
    Object
        .keys(schema.fields).map(key => {
        if (value[key] != undefined) {
            ret[key] = value[key];
        } else {
            ret[key] = undefined;
        }
    });
    return ret;
}