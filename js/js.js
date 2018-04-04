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

    function hideEmptyTable() {
        if (table_body.nextElementSibling.childElementCount === 6) {
            table_top.hidden = false;
            removeButton.hidden = false;
        } else {
            table_top.hidden = true;
            removeButton.hidden = true;
        }
    }

    function changeCompleteTaskColor(element, target) {
        element.addEventListener('click', function () {
            target.classList.toggle('complete');
        });
    }

    function deleteTask(element) {
        element.addEventListener('click', function () {
            this.parentElement.parentElement.removeChild(this.parentElement);
        });
    }

    function removeAllCompleteTasks(element, target) {
        element.addEventListener('click', function () {
            if (target.className.indexOf('complete') > -1) {
                target.parentElement.removeChild(target);
                hideEmptyTable();
            }

        });
    }

    /*Przycisk pokazuje formularz do dodawania zadania*/

    hideShowFormBtn.addEventListener('click', function (e) {
        e.preventDefault();
        form.hidden = !form.hidden;

    });

    /*Przycisk dodaje nowe zadanie do tablicy*/

    addTaskBtn.addEventListener('click', function (e) {
        e.preventDefault();

        table.hidden = false;
        table_top.hidden = false;
        removeButton.hidden = false;

        /* walidacja danych */

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
        /* tworzenie nowych elementow tablicy */

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

        //czyszczenie inputa po zapisaniu zadania

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


        table.appendChild(tr);


        /*Po dodaniu zadania, formularz się chowa.*/
        form.hidden = !form.hidden;

        removeAllCompleteTasks(removeButton, tr);


        /* LOCAL STORAGE -------------------------------------------------------------------------------*/
        var localStorageTasks = JSON.parse(localStorage.getItem('tasks'));
        var newTask = {
            additionDate: tdAdditionDate.innerText,
            taskName: tdAuthor.innerText,
            priority: tdPriority.innerText,
            comment: tdTask.innerText
        };

        // Jeżeli w pamięci nie ma zadań to stwórz tablice z jednym zadaniem
        if (localStorageTasks === null) {
            localStorageTasks = [newTask];

            // Jeżeli zadania już istnieją to dopchnij do tej tablicy kolejne
        } else {
            localStorageTasks.push(newTask);
        }

        // Wrzucenie wszystkiego do pamięci
        localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
        console.log(localStorageTasks);

    });

    /* Clear ALL tasks from LocalStorage */
    //localStorage.clear();

    /* Getting tasks from LocalStorage */
    var retrievedData = localStorage.getItem("tasks");
    var localStorageTasks = JSON.parse(retrievedData);

    for(var i=0; i<localStorageTasks.length; i++) {

       var newRow = table.insertRow();

        for (var info in localStorageTasks[i]) {

           var newCell = newRow.insertCell();
            newCell.innerText = localStorageTasks[i][info]
        }
    }
});

