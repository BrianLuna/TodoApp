import todoStore, { Filters } from "../stores/todo.store";
import html from "./app.html?raw";
import { renderPending, renderTodos } from "./use-cases";

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    Filters: '.filtro',
    Pending: '#pending-count'
}

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        renderPending(ElementIDs.Pending);
    }

    (() => {
        const app = document.createElement("div");
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const clearCompleted = document.querySelector(ElementIDs.ClearCompleted);
    const filtersUL = document.querySelectorAll(ElementIDs.Filters);

    newDescriptionInput.addEventListener('keyup', (event) => {
        if(event.keyCode !== 13) return;
        if(event.target.value.trim().lenght === 0) return;
        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        if(event.target.getAttribute('class') === 'destroy'){
            const element = event.target.closest('[data-id]');
            todoStore.deleteTodo(element.getAttribute('data-id'));
            displayTodos();
        }
    });

    clearCompleted.addEventListener('click', (event) => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersUL.forEach(element => {
        element.addEventListener('click', (event) => {
            filtersUL.forEach(el => el.classList.remove('selected'));
            event.target.classList.add('selected');
            let selectedFilter = Filters.All;
            switch (event.target.text) {
                case 'Todos':
                    selectedFilter = Filters.All;
                    break;
                case 'Pendientes':
                    selectedFilter = Filters.Pending;
                    break;
                case 'Completados':
                    selectedFilter = Filters.Completed;
                    break;
                default:
                    selectedFilter = Filters.All;
                    break;
            }
            todoStore.setFilter(selectedFilter);
            displayTodos();
        });
    });

    
};
