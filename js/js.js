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

    // there occurs error with this function
    // function hideEmptyTable() {
    //     if (table_body.nextElementSibling.childElementCount === null) {
    //         table_top.hidden = false;
    //         removeButton.hidden = false;
    //     } else {
    //         table_top.hidden = true;
    //         removeButton.hidden = true;
    //     }
    // }

    function changeCompleteTaskColor(element, target) {
        element.addEventListener('click', function () {
            target.classList.toggle('complete');
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
            btnDelete = document.createElement('button'),
            btnComplete = document.createElement('button');

        btnDelete.innerText = 'Usunąć';
        btnComplete.innerText = 'Wykonane';

        table_top.setAttribute("style", "background-color: #d18040");

        btnDelete.classList.add('btnDelete');
        btnComplete.classList.add('btnComplete');

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
        // deleteTask(btnDelete);

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

        for (var j = 0; j < localStorageTasks.length; j++){
            removeAllCompleteTasks(removeButton, localStorageTasks[j], j, localStorageTasks);
        }

        for (var n = 0; n < localStorageTasks.length; n++){
            deleteTask(btnDelete, n, localStorageTasks);
        }

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
            if (target.className.indexOf('complete') > -1) {
                target.parentElement.removeChild(target);
                var newArr = array.filter(function(el, i){
                    return index !== i;
                })
                localStorage.setItem('tasks', JSON.stringify( newArr ) );
                // hideEmptyTable();
            }

        });
    }

    /* Getting and Delete tasks from LocalStorage */
    var retrievedData = localStorage.getItem("tasks");
    var localStorageTasks = JSON.parse(retrievedData);

    if(localStorageTasks.length === 0){
        console.log('local storage is empty')
    } else {
        console.log(localStorageTasks);
        for (var i = 0; i < localStorageTasks.length; i++) {
            var btnDelete = document.createElement('button');
            var btnComplete = document.createElement('button');

            btnDelete.innerText = 'Usunąć';
            btnComplete.innerText = 'Wykonane';
            btnDelete.classList.add('btnDelete');
            btnComplete.classList.add('btnComplete');

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

            if(localStorageTasks === null){
                table.hidden = true;
                table_top.hidden = true;
                removeButton.hidden = true
            } else {
                table.hidden = false;
                table_top.hidden = false;
                removeButton.hidden = false;
            }
        }
    }

})



