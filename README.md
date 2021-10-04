# fmiddlewares
It is a library for nodejs that allows to make validations to the routes in a simpler way

- [Installing](#installing)
- [Import](#import)
- [Use](#use)
    - [Use in Body](#use-in-body)
    - [Use in Query](#use-in-query)
    - [Use in Headers](#use-in-headers)
    - [Use with env](#use-with-env)
- [Validate](#validate)
    - [String](#string)
        - [String, allow empty](#string-allow-empty)
    - [Email](#email)
    - [Password](#password)
    - [List](#list)
    - [Object](#object)
    - [Number](#number)
        - [Number with min](#number-with-min)
        - [Number with max](#number-with-max)
    - [Boolean](#boolean)
    - [Array](#array)
    - [Compare](#compare)
    - [Leave Undefined](#leave-undefined)
- [Developer](#developer)
- [Repositories](#repositories)


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

### Use in Body
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

### Use in Query
```javascript
router.post(
    rute,
    [
        fmiddlewares.validateItem({
            config
        },"query")
    ], 
    controller
)
```

### Use in Headers
```javascript
router.post(
    rute,
    [
        fmiddlewares.validateItem({
            config
        },"headers")
    ], 
    controller
)
```

### Use with env
```javascript
router.post(
    rute,
    [
        fmiddlewares.validateItem({
            key : {
                type:"compare",
                value: env.KEY
            }
        },"headers")
    ], 
    controller
)
```
## Validate

### String
```javascript
fmiddlewares.validateItem({
    name : {
        type:"string"
    }
})
```

#### String, allow empty
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

#### Number with min
```javascript
fmiddlewares.validateItem({
    age : {
        type:"number",
        min: 10
    }
})
```

#### Number with max
```javascript
fmiddlewares.validateItem({
    age : {
        type:"number",
        max: 20
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

### Compare
```javascript
fmiddlewares.validateItem({
    element : {
        type:"compare",
        value:"value"
    }
})
```

### Leave Undefined
```javascript
fmiddlewares.validateItem({
    company : {
        type:"string",
        isUndefined:true
    }
})
```


## Developer
[Francisco Blanco](https://franciscoblanco.vercel.app/)

[Gitlab franciscoblancojn](https://gitlab.com/franciscoblancojn)

[Email blancofrancisco34@gmail.com](mailto:blancofrancisco34@gmail.com)

## Repositories

- [Gitlab](https://gitlab.com/npmjs_packages/fmiddlewares)
- [Github](https://github.com/franciscoblancojn/fmiddlewares)