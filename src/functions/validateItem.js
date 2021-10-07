
const validateTipeOf = (type, value) => {
    const _type = typeof value
    if (_type !== type) {
      throw new Error('type Invalid, expected ' + type)
    }
  }
  const validateNull = (value) => {
    if (value === null || value === undefined) {
      throw new Error('is null')
    }
  }
  const validateEmpty = (value) => {
    if (value === '') {
      throw new Error('is empty')
    }
  }
  const validateArray = (value, settings) => {
    if (!Array.isArray(value)) {
      throw new Error('type Invalid, expected Array')
    }
    if (settings.min) {
      if (value.length < settings.min) {
        throw new Error('min elemets ' + settings.min)
      }
    }
    if (settings.max) {
      if (value.length > settings.max) {
        throw new Error('max elemets ' + settings.max)
      }
    }
    if (settings.typeElemets) {
      for (let i = 0; i < value.length; i++) {
        const element = value[i]
        const _typeElement = typeof element
        if (_typeElement !== settings.typeElemets) {
          throw new Error(`, element invalid [${element}], expected ${settings.typeElemets}`)
        }
      }
    }
  }
  const validateList = (value, list) => {
    if (!list.includes(value)) {
      throw new Error('value invalid, expected [' + list.join(',') + ']')
    }
  }
  const validateEmail = (value) => {
    if (!(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(value))) {
      throw new Error('is not email')
    }
  }
  const validatePassword = (value, regexs) => {
    regexs.forEach(element => {
      if (!element.regex.test(value)) {
        throw new Error(element.msj)
      }
    })
  }
  const validateMinMax = (element, settings) => {
    if (settings.min) {
      if (element < settings.min) {
        throw new Error(', min ' + settings.min)
      }
    }
    if (settings.max) {
      if (element > settings.max) {
        throw new Error(', max ' + settings.max)
      }
    }
  }
  const validateCompare = (element, settings, key) => {
    if (settings.function) {
      if (!settings.function({ value: element, key })) {
        throw new Error(', invalid value')
      }
      return
    }
    if (element !== settings.value) {
      throw new Error(', invalid value')
    }
  }
  const validateGroup = (values, settings) => {
    const keys = settings.items
    const newSettings = {
      ...settings,
      type: settings.groupType
    }
    delete newSettings.items
    delete newSettings.groupType
  
    if (newSettings.exactItems) {
      validateExactItems(keys, values)
    }
  
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      try {
        validateForType(newSettings, values[key], values, key)
      } catch (error) {
        throw new Error(key + ' ' + error)
      }
    }
  }
  
  const validateForType = (settings, value, values, key) => {
    if (settings.isUndefined === true && settings.type !== 'group') {
      if (value === undefined) {
        return
      }
    }
    if (!settings.isNull && settings.type !== 'group') {
      validateNull(value)
    }
    const switchSettings = {
      boolean: (element) => { validateTipeOf('boolean', element) },
      string: (element) => { validateTipeOf('string', element) },
      number: (element) => {
        validateTipeOf('number', element)
        validateMinMax(element, settings)
      },
      object: (element) => { validateTipeOf('object', element) },
      array: (element) => { validateArray(element, settings) },
      list: (element) => { validateList(element, settings.list) },
      email: (element) => { validateEmail(element) },
      password: (element) => { validatePassword(element, settings.regexs) },
      compare: (element) => { validateCompare(element, settings, key) },
      group: (element) => { validateGroup(values, settings) }
    }
    if (switchSettings[settings.type]) {
      switchSettings[settings.type](value)
    }
    if (!settings.isEmpty) {
      validateEmpty(value)
    }
    return true
  }
  
  const validateExactItems = (items, values) => {
    let keysExact
    if (Array.isArray(items)) {
      keysExact = items
    } else {
      keysExact = Object.keys(items)
    }
  
    const keys = Object.keys(values).filter((element) => {
      return !keysExact.includes(element)
    })
  
    if (keys.length > 0) {
      throw new Error(`data not allowed, [${keys.join(',')}]`)
    }
  }
  
  const validateItemsRecursive = (items, values) => {
    if (items.exactItems) {
      validateExactItems(items, values)
    }
    const keys = Object.keys(items)
    keys.forEach(key => {
      const value = values[key]
      const item = items[key]
      try {
        if (key !== 'exactItems') {
          validateForType(item, value, values, key)
        }
      } catch (error) {
        throw new Error(key + ', ' + error)
      }
      if (item.type === 'object' && item.items !== undefined) {
        validateItemsRecursive(item.items, value)
      }
    })
  }
  const validateItem = (items, body = 'body') => (req, res, next) => {
    try {
      const values = req[body]
      validateItemsRecursive(items, values)
    } catch (error) {
      return res.status(400).send({
        type: 'error',
        error,
        msj: `${error}`
      })
    }
    next()
  }
  module.exports = validateItem
  