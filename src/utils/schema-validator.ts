
export const getErrorMessageByPropertyName = (obj: Record<string,any>,name:string)=>{
    // console.log(obj);
    // console.log(name);
    const properties = name.split(".")
    let value = obj;

    for( let prop of properties){
        // console.log(prop);
        if(value[prop]){
            value = value[prop]
        }else {
            return undefined;
        }
    }
    return value.message
}