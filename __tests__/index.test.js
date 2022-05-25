import Validator from '../src/index';

describe('string', () => {
  test('empty string', async () => {
    const v = new Validator();
    const schema = v.string();

    expect(schema.isValid('')).toBe(true);
    expect(schema.isValid(null)).toBe(true);
    expect(schema.isValid(undefined)).toBe(true);
  });

  test('required', async () => {
    const v = new Validator();
    const schema = v.string().required();

    expect(schema.isValid('what does the fox say')).toBe(true);
    expect(schema.isValid('hexlet')).toBe(true);
    expect(schema.isValid(null)).toBe(false);
    expect(schema.isValid('')).toBe(false);
  });

  test('contains', async () => {
    const v = new Validator();
    const schema = v.string();

    expect(schema.contains('what').isValid('what does the fox say')).toBe(true);
    expect(schema.contains('whatthe').isValid('what does the fox say')).toBe(false);
    expect(schema.contains('hexlet').isValid(null)).toBe(false);
  });

  test('minLength', async () => {
    const v = new Validator();
    const schema = v.string();

    expect(schema.minLength(0).isValid('')).toBe(true);
    expect(schema.minLength(1).isValid('')).toBe(false);
    expect(schema.minLength(1).isValid(null)).toBe(false);
    expect(schema.minLength(1).isValid('what')).toBe(true);   
  });
});

describe('number', () => {
  test('null number', async () => {
    const v = new Validator();
    const schema = v.number();

    expect(schema.isValid(null)).toBe(true);
    expect(schema.isValid(0)).toBe(true);
  });
  
  test('required', async () => {
    const v = new Validator();
    const schema = v.number().required();

    expect(schema.isValid(null)).toBe(false);
    expect(schema.isValid(7)).toBe(true);
    });
    
  test('positive', async () => {
    const v = new Validator();
    const schema = v.number().positive();
  
    expect(schema.isValid(10)).toBe(true);
    expect(schema.isValid(0)).toBe(false);
    expect(schema.isValid(-5)).toBe(false);
  });

  test('range', async () => {
    const v = new Validator();
    const schema = v.number().range(-5, 5);
  
    expect(schema.isValid(-3)).toBe(true);
    expect(schema.isValid(5)).toBe(true);
    expect(schema.isValid(7)).toBe(false);
    expect(schema.positive().isValid(-3)).toBe(false);
  });
});
