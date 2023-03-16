import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store.js';
import { renderTodos } from './use-cases/render-todos';
import { renderPending } from './use-cases/rending-pending';


const ElementIDs = {
    clearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    todoFilters: '.filtro',
    pendingCount: '#pending-count',
};

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {


    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos );
        updatePendingCount();
    };

    const updatePendingCount = () => {
        renderPending( ElementIDs.pendingCount );
    };

    ( () => {
        const app = document.createElement( 'DIV' );
        app.innerHTML = html;
        document.querySelector( elementId ).append( app );
        displayTodos();
    } )();

    //HTML REFERENCES
    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    const todoListUL = document.querySelector( ElementIDs.TodoList );
    const clearCompletedButton = document.querySelector( ElementIDs.clearCompleted );
    const filtersUL = document.querySelectorAll( ElementIDs.todoFilters );


    //lISTENERS
    newDescriptionInput.addEventListener( 'keyup', ( event ) => {
        if ( event.keyCode !== 13 ) return;
        if ( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    } );

    todoListUL.addEventListener( 'click', ( e ) => {
        const element = e.target.closest( '[data-id]' );

        todoStore.toggleTodo( element.getAttribute( 'data-id' ) );
        displayTodos();
    } );
    todoListUL.addEventListener( 'click', ( e ) => {
        const element = e.target;
        if ( element.className !== 'destroy' ) return;

        todoStore.deleteTodo( element.closest( '[data-id]' ).getAttribute( 'data-id' ) );
        displayTodos();
    } );

    clearCompletedButton.addEventListener( 'click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    } );

    filtersUL.forEach( element => {
        element.addEventListener( 'click', () => {
            filtersUL.forEach( item => {
                item.classList.remove( 'selected' );
            } );
            element.classList.add( 'selected' );
            console.log( element.id );
            switch ( element.id ) {
                case 'Todos':
                    todoStore.setFilter( Filters.All );
                    break;
                case 'Pending':
                    todoStore.setFilter( Filters.Pending );
                    break;
                case 'Completed':
                    todoStore.setFilter( Filters.Completed );
                    break;
            }
            displayTodos();
        } );
    } );
};