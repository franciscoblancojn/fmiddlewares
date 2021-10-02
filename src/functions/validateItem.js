
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

const validateForType = (settings,value) => {
    if(!settings.isNull){
        validateNull(value)
    }
    const switchSettings = {
        "boolean" : (element) => {validateTipeOf("boolean",element)},
        "string" : (element) =>  {validateTipeOf("string",element)},
        "number" : (element) =>  {validateTipeOf("number",element)},
        "object" : (element) =>  {validateTipeOf("object",element)},
        "array" : (element) =>   {validateArray(element)},
        "list" : (element) =>    {validateList(element,settings.list)},
    }
    if(switchSettings[settings.type]){
        switchSettings[settings.type](value)
    }
    if(!settings.isEmpty){
        validateEmpty(value)
    }
    return true
}

const validateItemsRecursive = (items,values) => {
    const keys = Object.keys(items)
    keys.forEach(key => {
        const value = values[key]
        const item = items[key]
        try {
            validateForType(item,value)
        } catch (error) {
            throw key + ", "+ error
        }
        if(item.type == "object"){
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