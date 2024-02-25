import todoStore, {Filters} from "../../stores/todo.store";


let element;

export const renderPending = (elementId) => {

    if(!element)
        element = document.querySelector(elementId);

    if(!element)
        throw new Error('Element does not exists');

    element.innerText = todoStore.getTodos(Filters.Pending).length;

}