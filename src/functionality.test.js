// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';
import Tasks from './task.js';

const dom = new JSDOM(`<!DOCTYPE html><body><ul id="addList"></body>`); // eslint-disable-line

global.document = dom.window.document;
global.window = dom.window;

const createList = document.getElementById('addList');
const elementToAdd = {
  task: 'Graduate from Microverse',
  completed: false,
  index: 1,
};

Tasks.myTasksView(elementToAdd, createList);

describe('Add for exactly one element', () => {
  test("Add exactly one 'li' element in the list", () => {
    expect(createList.childElementCount).toBe(1);
  });
});

Tasks.addTask(elementToAdd);
describe('Test remove an add methods in the Tasks class', () => {
  test('Add elements properties in the LocalStorage', () => {
    expect(Tasks.getFromLocalStore()[0].task).toBe('Graduate from Microverse');
  });
  test('Remove element from the DOM and from LocalStorage', () => {
    const target = document.getElementById('1 trash');
    const childcount = createList.childElementCount;
    Tasks.deleteTask(target, 0);
    expect(createList.childElementCount).toBeLessThan(childcount);
  });
});