document.addEventListener('DOMContentLoaded', function () {
    var hideShowFormBtn = document.getElementById('main_btn'),
        form = document.getElementById('form'),

        addTaskBtn = document.getElementById('btn_submit'),
        additionDate = document.querySelector('#date'),
        authorName = document.querySelector('#name'),
        priority = document.querySelector('#priority'),
        comment = document.querySelector('#comment'),
        removeButton = document.querySelector('#removeFinishedTasksButton'),


        inputControl = document.getElementsByClassName('validation_required');

    /*Przycisk pokazuje formularz do dodawania zadania*/

    hideShowFormBtn.addEventListener('click', function (e) {
        e.preventDefault();
        form.hidden = !form.hidden;
    });


    addTaskBtn.addEventListener('click', function (e) {
        e.preventDefault();

/* walidacja danych */

        for (var i=0; i<inputControl.length; i++) {
            if(inputControl[i] === undefined)
            {
                continue;
            }
            if(!inputControl[i].value)
            {
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

            //usuwanie ukończonych zadań
            removeButton.addEventListener('click', function () {
                if (tr.className.indexOf('complete') > -1) {
                    tr.parentElement.removeChild(tr);
                    console.log('Ok');
                }

            });

    });


});



