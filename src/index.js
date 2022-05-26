class Validator {
  constructor(self = {}) {
    const {
      type = null, required = false, minLength = null, contains = null,
      positive = false, min = null, max = null, range = false,
      sizeof = null,
      shape = {},
      validators = [], test = {},
    } = self.options || {};
    this.options = { type, required, minLength, contains, positive, min, max, range, sizeof, shape, validators, test };
  }

  string() {
    this.options.type = 'string';
    return new Validator(this);
  }

  number() {
    this.options.type = 'number';
    return new Validator(this);
  }

  array() {
    this.options.type = 'array';
    return new Validator(this);
  }

  object() {
    this.options.type = 'object';
    return new Validator(this);
  }

  required() {
    this.options.required = true;
    return new Validator(this);
  }

  contains(value) {
    this.options.contains = value;
    return new Validator(this);
  }

  minLength(value) {
    this.options.minLength = value;
    return new Validator(this);
  }

  positive() {
    this.options.positive = true;
    return new Validator(this);
  }

  range(min, max) {
    this.options.min = min;
    this.options.max = max;
    this.options.range = true;
    return new Validator(this);
  }

  sizeof(value) {
    this.options.sizeof = value;
    return new Validator(this);
  }

  shape(obj) {
    this.options.shape = obj;
    return new Validator(this);
  }

  addValidator(type, name, fn) {
    this.options.validators.push({ type, name, fn });
    return new Validator(this);
  }

  test(name, value) {
    this.options.test[name] = value;
    return new Validator(this);
  }

  isValid(value) {
    if (this.options.required) {
      if (value === null || value === undefined || value === '') {
        return false;
      }
    }

    if (this.options.type === 'string') {
      if (typeof value !== 'string' && value !== null && value !== undefined) {
        return false;
      }
      if (this.options.minLength) {
        if (value === null || value === undefined || value.length < this.options.minLength) {
          return false;
        }
      }
      if (this.options.contains) {
        if (value === null || value === undefined || !value.includes(this.options.contains)) {
          return false;
        }
      }
    }

    if (this.options.type === 'number') {
      if (typeof value !== 'number' && value !== null) {
        return false;
      }
      if (this.options.positive) {
        if (value < 1 && value !== null) {
          return false;
        }
      }
      if (this.options.range) {
        if (value > this.options.max) {
          return false;
        }
        if (value < this.options.min) {
          return false;
        }
      }
    }

    if (this.options.type === 'array') {
      if (!Array.isArray(value) && value !== null) {
        return false;
      }
      if (this.options.sizeof) {
        if (value === null || value.length < this.options.sizeof) {
          return false;
        }
      }
    }

    if (this.options.type === 'object') {
      const keys = Object.keys(this.options.shape);
      return keys.every(key => this.options.shape[key].isValid(value[key]));
    }

    const typeValidators = this.options.validators.filter((validator) => validator.type === this.options.type);
    return typeValidators.every(({ name, fn }) => Object.keys(this.options.test).includes(name) ? fn(value, this.options.test[name]) : true);
  }
}

export default Validator;
