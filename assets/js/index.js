import {
    saveTask,
    getTasks,
    onGetTask,
    updateTask,
    deleteTask,
    getTask
} from "./firebase.js";

const taskForm = document.getElementById('task-form');
const tasksContainer = document.getElementById('tasks-container');
let taskText = document.getElementById('task-text');

let editStatus = false;
let editId = '';

window.addEventListener('DOMContentLoaded', async () => {
    onGetTask((querySnapshot) => {
        let html = '';

        querySnapshot.forEach(doc => {
            const data = doc.data();

            html += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${data.title}</h4>
                        <p class="card-text">${data.description}</p>
                        <div class="row">
                            <button class='btn btn-danger btn-delete-custom mx-auto col-5' data-id='${doc.id}'>Delete</button>
                            <button class='btn btn-info btn-edit-custom mx-auto col-5' data-id='${doc.id}'>Edit</button>
                        </div>
                    </div>
                </div>
            `;
        });

        tasksContainer.innerHTML = html;

        const btnsDelete = tasksContainer.querySelectorAll(".btn-delete-custom");

        btnsDelete.forEach(btn => {
            btn.addEventListener("click", ({target: { dataset }}) => {
                deleteTask(dataset.id);
            });
        });

        const btnsEdit = tasksContainer.querySelectorAll(".btn-edit-custom");

        btnsEdit.forEach(btn => {
            btn.addEventListener('click', async ({target: { dataset }}) => {
                const doc = await getTask(dataset.id);
                const task = doc.data();

                taskForm['task-title'].value = task.title;
                taskForm['task-description'].value = task.description;

                editStatus = true;
                editId = doc.id;

                taskForm['btn-task-save'].innerHTML = 'Update';
                taskText.innerHTML = 'Edit Task';
            });
        });
    });
});


taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = taskForm["task-title"];
    const description = taskForm["task-description"];

    if (!editStatus) {
        saveTask(title.value, description.value);
    }
    else {
        updateTask(editId, {
            title: title.value,
            description: description.value
        });

        editStatus = false;

        taskForm['btn-task-save'].innerHTML = 'Save';
        taskText.innerHTML = 'New Task';
    }

    taskForm.reset();
});