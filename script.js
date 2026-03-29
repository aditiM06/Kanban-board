
//DOM ref
const toDo = document.querySelector('.to-do');
const inProgress = document.querySelector('.in-progress');
const done = document.querySelector('.done');
const text = document.querySelector('.text');
const addTaskBtn = document.querySelector('.add-task-btn');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');


// State
let tasks = [];
let dragged = null;
const boards = [toDo, inProgress, done];

function openPopUp() {
    const submitBtn = document.querySelector('.modal .btn');
    addTaskBtn.addEventListener('click', () => {
        overlay.classList.remove("display");
        modal.classList.remove("display");
    });
    submitBtn.addEventListener('click', () => {
        addTask();
        modal.classList.add('display');
        overlay.classList.add('display');
    });
}

function addTask() {
    if (text.value.trim() === "") return;
    const newTaskObj = {
        id: Date.now(),
        newTask: text.value,
        status: "toDo"
    };
    tasks.push(newTaskObj);
    text.value = "";
    storeData();
    createTaskElement(newTaskObj);
    
}

function createTaskElement(taskObj) {
    

    const taskBox = document.createElement("div");
    const task = document.createElement("div");
    const deleteBtn = document.createElement("button");

    taskBox.classList.add('task-box');
    task.classList.add("task");
    deleteBtn.classList.add("cross");

    task.textContent = taskObj.newTask;
    deleteBtn.textContent = "x";
    deleteBtn.addEventListener('click', function(){
        const taskBox = this.parentElement;   // go up to task container
    const id = taskBox.dataset.id;

    // 1. remove from state
    tasks = tasks.filter(task => task.id != id);

    // 2. remove from UI
    taskBox.remove();

    // 3. update storage
    storeData();
    });
    taskBox.dataset.id = taskObj.id;

    // drag
    taskBox.draggable = true;
    taskBox.addEventListener("dragstart", () => {
        dragged = taskBox;
    });

    // append
    taskBox.appendChild(task);
    taskBox.appendChild(deleteBtn);

    // place correctly
    if (taskObj.status === "toDo") toDo.appendChild(taskBox);
    else if (taskObj.status === "inProgress") inProgress.appendChild(taskBox);
    else if (taskObj.status === "done") done.appendChild(taskBox);
}


function storeData() {
    localStorage.setItem('tasking', JSON.stringify(tasks));
}

function dragAndDrop() {
    boards.forEach(board => {

        board.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        board.addEventListener("drop", () => {
            if (!dragged) return;

            board.appendChild(dragged);

            const newStatus = board.dataset.status;
            const id = dragged.dataset.id;

            tasks.forEach(task => {
                if (task.id === Number(id)) {
                    task.status = newStatus;
                }
            });

            storeData();
            dragged = null;
        });
    });
} 

function retrieveData() {
    const stored = localStorage.getItem('tasking');
    if (!stored) return;

    tasks = JSON.parse(stored);

    tasks.forEach(e => {
        createTaskElement(e);
    });
}

openPopUp();
dragAndDrop();
retrieveData();




 



