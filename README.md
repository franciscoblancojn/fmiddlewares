# fmiddlewares
It is a library for nodejs that allows to make validations to the routes in a simpler way

## Installing
Using npm:
```bash
npm install fmiddlewares
```

## Import
```javascript
const fmiddlewares = require('fmiddlewares')
```

## Use
```javascript
router.post(
    rute,
    [
        fmiddlewares.validateItem({
            config
        })
    ], 
    controller
)
```

### String
```javascript
fmiddlewares.validateItem({
    name : {
        type:"string"
    }
})
```

### String, allow empty
```javascript
fmiddlewares.validateItem({
    name : {
        type:"string",
        isEmpty:true
    }
})
```

### Email
```javascript
fmiddlewares.validateItem({
    email : {
        type:"email"
    }
})
```

### Password
```javascript
fmiddlewares.validateItem({
    password:{
        type:"password",
        regexs:[
            {
                regex:/^.{8,}$/,
                msj:"minimum of 8 characters"
            },
            {
                regex:/[a-z]/,
                msj:"must contain lowercase letters"
            },
            {
                regex:/[A-Z]/,
                msj:"must contain capital letters"
            },
        ]
    }
})
```

### List
```javascript
fmiddlewares.validateItem({
    sex : {
        type:"list",
        list:[
            "male",
            "feminine"
        ]
    }
})
```

### Object
```javascript
fmiddlewares.validateItem({
    user:{
        type:"object",
        items:{
            id:{
                type:"string"
            },
            name:{
                type:"string"
            },
            email : {
                type:"email"
            },
            password:{
                type:"password",
                regexs:[
                    {
                        regex:/^.{8,}$/,
                        msj:"minimum of 8 characters"
                    },
                    {
                        regex:/[a-z]/,
                        msj:"must contain lowercase letters"
                    },
                    {
                        regex:/[A-Z]/,
                        msj:"must contain capital letters"
                    },
                ]
            }
        }
    }
})
```

### Number
```javascript
fmiddlewares.validateItem({
    age : {
        type:"number"
    }
})
```

### Boolean
```javascript
fmiddlewares.validateItem({
    married : {
        type:"boolean"
    }
})
```


### Array
```javascript
fmiddlewares.validateItem({
    items : {
        type:"array"
    }
})
```



## Developer
[Francisco Blanco](https://franciscoblanco.vercel.app/)

[Gitlab franciscoblancojn](https://gitlab.com/franciscoblancojn)

[Email blancofrancisco34@gmail.com](mailto:blancofrancisco34@gmail.com)
