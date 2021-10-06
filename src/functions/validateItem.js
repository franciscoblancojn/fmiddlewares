
const validateTipeOf = (type,value) => {
    if(typeof value !== type){
        throw "type Invalid, expected "+type
    }
}
const validateNull = (value) => {
    if(value === null || value === undefined){
        throw "is null"
    }
}
const validateEmpty = (value) => {
    if(value == ""){
        throw "is empty"
    }
}
const validateArray = (value) => {
    if(!Array.isArray(value)){
        throw "type Invalid, expected Array"
    }
}
const validateList = (value,list) => {
    if(!list.includes(value)){
        throw "value invalid, expected ["+list.join(",")+"]"
    }
}
const validateEmail = (value) => {
    if (!(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(value))){
        throw "is not email"
    }
}
const validatePassword = (value,regexs) => {
    regexs.forEach(element => {
        if(!element.regex.test(value)){
            throw element.msj
        }
    });
}
const validateMinMax = (element,settings) => {
    if(settings.min){
        if(element < min){
            throw ", min "+ min
        }if(element > max){
            throw ", max "+ max
        }
    }
}
const validateCompare = (element,settings) => {
    if(element !== settings.value){
        throw ", invalid value"
    }
}

const validateForType = (settings,value) => {
    if(settings.isUndefined === true){
        if(value === undefined){
            return;
        }
    }
    if(!settings.isNull){
        validateNull(value)
    }
    const switchSettings = {
        "boolean" : (element) => {validateTipeOf("boolean",element)},
        "string" : (element) =>  {validateTipeOf("string",element)},
        "number" : (element) =>  {
            validateTipeOf("number",element)
            validateMinMax(element,settings)
        },
        "object" : (element) =>  {validateTipeOf("object",element)},
        "array" : (element) =>   {validateArray(element)},
        "list" : (element) =>    {validateList(element,settings.list)},
        "email" : (element) =>    {validateEmail(element)},
        "password" : (element) =>    {validatePassword(element,settings.regexs)},
        "compare": (element) =>   {validateCompare(element,settings)},
    }
    if(switchSettings[settings.type]){
        switchSettings[settings.type](value)
    }
    if(!settings.isEmpty){
        validateEmpty(value)
    }
    return true
}

const validateExactItems = (items,values) => {
    delete items.exactItems
    const keysExact = Object.keys(items)
    const keys = Object.keys(values).filter((element)=>{
        return !keysExact.includes(element)
    })
    
    if(keys.length > 0){
        throw `data not allowed, [${keys.join(",")}]`
    }
}

const validateItemsRecursive = (items,values) => {
    if(items.exactItems){
        validateExactItems(items,values)
        delete items.exactItems
        return;
    }
    const keys = Object.keys(items)
    keys.forEach(key => {
        const value = values[key]
        const item = items[key]
        try {
            validateForType(item,value)
        } catch (error) {
            throw key + ", "+ error
        }
        if(item.type == "object" && item.items != undefined){
            validateItemsRecursive(item.items,value)
        }
    })
}
const validateItem = (items,body="body") => (req,res,next) => {
    try {
        const values = req[body]
        validateItemsRecursive(items,values)
    } catch (error) {
        return res.status(400).send({
            "type":"error",
            error,
            "msj":`${error}`
        })  
    }
    next()
}
module.exports = validateItem