document.addEventListener('DOMContentLoaded', function () {
    var hideShowFormBtn = document.getElementById('main_btn'),
        form = document.getElementById('form'),

        addTaskBtn = document.getElementById('btn_submit'),
        additionDate = document.querySelector('#date'),
        authorName = document.querySelector('#name'),
        priority = document.querySelector('#priority'),
        comment = document.querySelector('#comment'),
        removeButton = document.getElementById('removeFinishedTasksButton'),
        table_top = document.getElementById('table_top'),
        table = document.getElementById('table'),
        table_body = document.getElementById('table_body'),

        inputControl = document.getElementsByClassName('validation_required');

    table.hidden = true;
    removeButton.hidden = true;
    form.hidden = true;

    // function hideEmptyTable() {
    //     if (table_body.nextElementSibling.childElementCount === 6) {
    //         table_top.hidden = false;
    //         removeButton.hidden = false;
    //     } else {
    //         table_top.hidden = true;
    //         removeButton.hidden = true;
    //     }
    // }


    function changeCompleteTaskColor(element, target) {
        element.addEventListener('click', function () {
            console.log('dziala')
            target.classList.toggle('complete');
        });
    }
    function deleteTask(element, index, array) {
        element.addEventListener('click', function () {
            var removeItem = this.parentElement;
            removeItem.parentElement.removeChild(this.parentElement);
            var newArr = array.filter(function(el, i){
                return index !== i;
            })
            localStorage.setItem('tasks', JSON.stringify( newArr ) );
        });
    }

    function removeAllCompleteTasks(element, target, index, array) {
        element.addEventListener('click', function () {

            //it shows all newRows, because they are not distinguished
            //console.log(target);

            if (target.className.indexOf('complete') > -1) {

                //it shows target(newRow) with class 'complete'
                //console.log(target);

                target.parentElement.removeChild(target);

                var newArr = array.filter(function(el, i){
                    return index !== i;
                })
                localStorage.setItem('tasks', JSON.stringify( newArr ) );
                // hideEmptyTable();
            }

        });
    }

    /*Show and Hide form for tasks*/
    hideShowFormBtn.addEventListener('click', function (e) {
        e.preventDefault();
        form.hidden = !form.hidden;

    });

    /*Button adds a new task to the table*/
    addTaskBtn.addEventListener('click', function (e) {
        e.preventDefault();

        table.hidden = false;
        table_top.hidden = false;
        removeButton.hidden = false;

        /*Validation*/
        for (var i = 0; i < inputControl.length; i++) {
            if (inputControl[i] === undefined) {
                continue;
            }
            if (!inputControl[i].value) {
                table_top.hidden = true;
                removeButton.hidden = true;

                return false;

            }
        }
        /*Creating new elements of the table*/
        var tr = document.createElement('tr'),
            tdAdditionDate = document.createElement('td'),
            tdAuthor = document.createElement('td'),
            tdPriority = document.createElement('td'),
            tdTask = document.createElement('td'),
            tdForButtons = document.createElement('td'),
            btnDelete = document.createElement('button'),
            btnComplete = document.createElement('button');


        btnDelete.innerText = 'Usunąć';
        btnComplete.innerText = 'Wykonane';

        btnDelete.setAttribute("style", "background-color: rgba(255, 3, 21, 0.65);");
        btnComplete.setAttribute("style", "background-color: rgba(0, 128, 0, 0.65);");
        removeButton.setAttribute("style", "width: 100%");
        table_top.setAttribute("style", "background-color: #d18040");

        tdAdditionDate.innerText = additionDate.value;
        tdAuthor.innerText = authorName.value;
        tdPriority.innerText = priority.value;
        tdTask.innerText = comment.value;

        /* clear inputs after task added */
        additionDate.value = '';
        authorName.value = '';
        priority.value = '';
        comment.value = '';


        changeCompleteTaskColor(btnComplete, tr);

        deleteTask(btnDelete);

        tr.appendChild(tdAdditionDate);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdPriority);
        tr.appendChild(tdTask);
        tr.appendChild(btnComplete);
        tr.appendChild(btnDelete);

        table_body.appendChild(tr);

        /*Form hides after task was added*/
        form.hidden = !form.hidden;

        /* LOCAL STORAGE -------------------------------------------------------------------------------*/
        var localStorageTasks = JSON.parse(localStorage.getItem('tasks'));
        var newTask = {
            additionDate: tdAdditionDate.innerText,
            taskName: tdAuthor.innerText,
            priority: tdPriority.innerText,
            comment: tdTask.innerText
        };

        /*If there's nothing in the memory, create array with one task*/
        if (localStorageTasks === null) {
            localStorageTasks = [newTask];

            /* If there's sth in the table, add task to the array*/
        } else {
            localStorageTasks.push(newTask);
        }

        /* Adding to the Local Storage */
        localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
        console.log(localStorageTasks);

        function displayLocalStorage() {
            if (localStorageTasks === null) {
                table.hidden = true;
                table_top.hidden = true;
                removeButton.hidden = true
            } else {
                table.hidden = false;
                table_top.hidden = false;
                removeButton.hidden = false;
            }
        }
        displayLocalStorage();

    });

    /* Getting and Delete tasks from LocalStorage */
    var retrievedData = localStorage.getItem("tasks");
    var localStorageTasks = JSON.parse(retrievedData);

    console.log(localStorageTasks);

    for (var i = 0; i < localStorageTasks.length; i++) {
        var btnDelete = document.createElement('button');
        var btnComplete = document.createElement('button');

        btnDelete.innerText = 'Usunąć';
        btnComplete.innerText = 'Wykonane';
        btnDelete.setAttribute("style", "background-color: rgba(255, 3, 21, 0.65);");
        btnComplete.setAttribute("style", "background-color: rgba(0, 128, 0, 0.65);");


        var newRow = table_body.insertRow();

        for (var info in localStorageTasks[i]) {
            var newCell = newRow.insertCell();
            newCell.innerText = localStorageTasks[i][info]
        }

        newRow.append(btnComplete);
        newRow.append(btnDelete);

        changeCompleteTaskColor(btnComplete, newRow);
        deleteTask(btnDelete, i, localStorageTasks);
        removeAllCompleteTasks(removeButton, newRow, i, localStorageTasks);
    }

})


/*
function displayLocalStorage() {
            if (localStorageTasks === null) {
                table.hidden = true;
                table_top.hidden = true;
                removeButton.hidden = true
            } else {
                table.hidden = false;
                table_top.hidden = false;
                removeButton.hidden = false;
            }
        }
        displayLocalStorage();

changeCompleteTaskColor(btnComplete, newRow);
        deleteTask(btnDelete, i, localStorageTasks);
        removeAllCompleteTasks(removeButton, newRow, i, localStorageTasks);*/




