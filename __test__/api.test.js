const Ajv = require('ajv');
const axios = require('axios');

let ajvInstance;

beforeAll(async () => {
  ajvInstance = new Ajv({
    allErrors: true,
    schemas: [
      require('../schemas/todo.schema.json'),
      require('../schemas/todoList.schema.json'),
    ]
  });
});


describe('ToDos endpoints match the pattern', () => {
  test('Single ToDo', async () => {
    const serverToDo = await axios({
      url: 'https://jsonplaceholder.typicode.com/todos/1/',
      method: 'get'
    });
    const validateToDo = ajvInstance.getSchema('http://example.com/todo.schema.json#');

    expect(validateToDo(serverToDo.data)).toEqual(true);
  });

  test('List of ToDo', async () => {
    const serverToDo = await axios({
      url: 'https://jsonplaceholder.typicode.com/todos/',
      method: 'get'
    });
    const validateToDoList = ajvInstance.getSchema('http://example.com/todoList.schema.json#');

    expect(validateToDoList(serverToDo.data)).toEqual(true);
  });
});
