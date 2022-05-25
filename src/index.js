class Validator {
    constructor(self = {}) {
      const {
        type = null, required = false, minLength = null, contains = null,
        positive = false, min = null, max = null, range = false,
        } = self.options || {};
      this.options = { type, required, minLength, contains, positive, min, max, range, };
    }
  
    string() {
      this.options.type = 'string';
      return new Validator(this);
    }

    number() {
      this.options.type = 'number';
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

      return true;
  }
}

export default Validator;