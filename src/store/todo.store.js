import { Todo } from "../todos/Models/todo";

export const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending',
};


const state = {
    todos: [
        // new Todo( 'Rock of soul' ),
        // new Todo( 'Rock of infinite' ),
        // new Todo( 'Rock of time' ),
        // new Todo( 'Rock of power' ),
        // new Todo( 'Rock of reality' ),

    ],
    filter: Filters.All,
}


const initStore = () => {
    loadStore();
}

const loadStore = () => {
    if ( !localStorage.getItem( 'state' ) ) return;

    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem( 'state' ) );
    state.todos = todos;
    state.filter = filter;
};

const saveStateToLocalStorage = () => {
    localStorage.setItem( 'state', JSON.stringify( state ) );
};

const getTodos = ( filter = Filters.All ) => {

    switch ( filter ) {
        case Filters.All:
            return [ ...state.todos ];

        case Filters.Completed:
            return state.todos.filter( todo => todo.done );

        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );

        default:
            throw new Error( `Option: ${ filter }, is not valid` );
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if ( !description ) throw new Error( 'Description is required' );

    state.todos.push( new Todo( description ) );
    saveStateToLocalStorage();
};
/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = ( todoId ) => {
    state.todos.find( todo => {
        if ( todo.id === todoId ) {
            todo.done = !todo.done;

            return todo;
        }
    } );
    saveStateToLocalStorage();

};

const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );
    saveStateToLocalStorage();

};

const deleteCompleted = ( todoId ) => {
    state.todos = state.todos.filter( todo => !todo.done );
    saveStateToLocalStorage();

};

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
    saveStateToLocalStorage();

};

const getCurrentFilter = () => {
    return state.filter;
    saveStateToLocalStorage();

}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}








