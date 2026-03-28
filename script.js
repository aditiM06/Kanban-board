    let tasks = [];
    
    let dragged = null;

// //DOM refs
    let toDo = document.querySelector('.to-do');
    let inProgress = document.querySelector('.in-progress');
    let done = document.querySelector('.done');

    let addTaskBtn = document.querySelector('.add-task-btn');
    let overlay = document.querySelector('.overlay');
    let modal = document.querySelector('.modal');
    let text = document.querySelector('.text');
    


    function addTask(){
        let newTask ={
            id: Date.now(),
            new:"",
            status:""
        };
        
      // trims extra space
        if(text.value.trim() === "") return; 
        let taskBox = document.createElement("div");
        let task = document.createElement("div");
        let deleteBtn = document.createElement('button');
        
    
    taskBox.classList.add('task-box');
    // draggable is an html attribute.
    //taskBox.setAttribute("draggable", "true");
    taskBox.draggable = true;
    taskBox.addEventListener("dragstart", () => {
        dragged = taskBox;
    });
    task.classList.add("task");
    deleteBtn.classList.add("cross");
    deleteBtn.textContent = "x" ;
    // deleteBtn.addEventListener("click",()=>{
        //  taskBox.remove();
    // });
    
    task.textContent = text.value ;
    //saving in the new object.
    taskBox.dataset.id = newTask.id;
    newTask.new= text.value;
    newTask.status = "toDo";
    console.log(text.value);
   
    taskBox.appendChild(task);
    taskBox.appendChild(deleteBtn);
    toDo.appendChild(taskBox);
     //saving in the array.
    tasks.push(newTask);
    storeData();
    

    console.log(tasks);
    console.log(tasks[0].new);
    
}

  function openPopUp(){
    let submitBtn = document.querySelector('.modal .btn');
        addTaskBtn.addEventListener('click',()=>{
            overlay.classList.remove("display");
            modal.classList.remove("display");          
        })

       submitBtn.addEventListener('click',()=>{
           addTask();
           modal.classList.add('display');
           overlay.classList.add('display');
           text.value ="";
       }) 
      }

     openPopUp();

     function dragAndDrop(){
        
    // study it
    let boards = [toDo, inProgress, done];
    boards.forEach(board => {
        board.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        board.addEventListener("drop", (h) => {
            if (dragged) {
                board.appendChild(dragged);
                let newStatus = board.classList[1]; // where it is dropped
                let taskText = dragged.firstChild.innerText;
                // console.log(h.target.classList[1]);
                let id = dragged.dataset.id;
                tasks.forEach(obj => {
            if (obj.id === Number(id)) {
                obj.status = newStatus;
            }
            storeData();
        });
                // console.log(dragged.firstChild.innerText);
                console.dir(dragged);
                dragged = null;
            }
        });
    });
   
    
}

dragAndDrop();
function storeData(){
let tasksStrings = JSON.stringify(tasks) ;
localStorage.setItem('tasking',tasksStrings);
}




