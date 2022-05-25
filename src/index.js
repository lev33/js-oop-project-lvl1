class Validator {
    constructor(self = {}) {
      const { type = null, required = false, minLength = null, contains = null } = self.options || {};
      this.options = { type, required, minLength, contains };
    }
  
    string() {
      this.options.type = 'string';
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

      return true;
  }
}

export default Validator;