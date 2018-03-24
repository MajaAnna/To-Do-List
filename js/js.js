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
        if(table_body.children.length === 0) {
            table_top.hidden = true;
            removeButton.hidden = true;
        } else {
            table_top.hidden = false;
            removeButton.hidden = false;
        }
    }



    /*Przycisk pokazuje formularz do dodawania zadania*/

    hideShowFormBtn.addEventListener('click', function (e) {
        e.preventDefault();
        form.hidden = !form.hidden;

        if(tr.parentNode == table_top) {
            table.hidden = false;
            removeButton.hidden = false;
        }
    });


    addTaskBtn.addEventListener('click', function (e) {
        e.preventDefault();

        table.hidden = false;
        table_top.hidden = false;
        removeButton.hidden = false;


        /* walidacja danych */

        for (var i=0; i<inputControl.length; i++) {
            if(inputControl[i] === undefined)
            {
                continue;
            }
            if(!inputControl[i].value)
            {
                table_top.hidden = true;
                removeButton.hidden = true;

                return false;

            }
        }

        var tr = document.createElement('tr'),
            tdAdditionDate = document.createElement('td'),
            tdAuthor = document.createElement('td'),
            tdPriority = document.createElement('td'),
            tdTask = document.createElement('td'),
            btnDelete = document.createElement('button'),
            btnComplete = document.createElement('button');

        btnDelete.innerText = 'Usunąć';
        btnComplete.innerText = 'Wykonane';


        btnDelete.setAttribute("style", "background-color: rgba(255, 3, 21, 0.65);");
        btnComplete.setAttribute("style", "background-color: rgba(0, 128, 0, 0.65);");
        removeButton.setAttribute("style", "background-color: rgba(217, 213, 0, 0.65)");

        tdAdditionDate.innerText = additionDate.value;
        tdAuthor.innerText = authorName.value;
        tdPriority.innerText = priority.value;
        tdTask.innerText = comment.value;

        //czyszczenie inputa po zapisaniu zadania

        additionDate.value = '';
        authorName.value = '';
        priority.value = '';
        comment.value = '';

        //zadanie wykonane
        btnComplete.addEventListener('click', function () {
            tr.classList.toggle('complete');
        });

        //usuwanie zadania z listy
        btnDelete.addEventListener('click', function () {
            this.parentElement.parentElement.removeChild(this.parentElement);
            hideEmptyTable();
        });

        tr.appendChild(tdAdditionDate);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdPriority);
        tr.appendChild(tdTask);
        tr.appendChild(btnComplete);
        tr.appendChild(btnDelete);

        table.appendChild(tr);

        /*Po dodaniu zadania, formularz się chowa.*/
        form.hidden = !form.hidden;

        //usuwanie wszystkich ukończonych zadań
        removeButton.addEventListener('click', function () {
            if (tr.className.indexOf('complete') > -1) {
                tr.parentElement.removeChild(tr);
                hideEmptyTable();
            }
        });
    });




});