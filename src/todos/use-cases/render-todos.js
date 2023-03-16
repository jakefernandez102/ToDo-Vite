import { Todo } from '../Models/todo.js';
import { createTodoHTML } from './create-todo-html.js';

let element;

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = ( elementId, todos = [] ) => {

    if ( !element ) {
        element = document.querySelector( elementId );
    }

    if ( !element ) throw new Error( `${ element } not found!!` );

    element.innerHTML = '';

    todos.forEach( todo => {
        element.append( createTodoHTML( todo ) );
    } );

};