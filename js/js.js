document.addEventListener('DOMContentLoaded', function () {
    var hideShowFormBtn = document.getElementById('main_btn'),
        form = document.getElementById('form'),

        addTaskBtn = document.getElementById('btn_submit'),
        additionDate = document.querySelector('#date'),
        authorName = document.querySelector('#name'),
        priority = document.querySelector('#priority'),
        comment = document.querySelector('#comment'),
        table = document.getElementById('table'),
        tableBody = document.getElementById('tbody'),

        inputControl = document.getElementsByClassName('validation_required');

    /* Nie wiem gdzie wszdzić */

    function showHideTable() {

        if (tableBody.children.length === 0) {
            table.hidden = true;
        } else {
            table.hidden = false;
        }
    }

    /*Przycisk pokazuje formularz do dodawania zadania*/

    hideShowFormBtn.addEventListener('click', function (e) {
        e.preventDefault();
        form.hidden = !form.hidden;
    });


    addTaskBtn.addEventListener('click', function (e) {
        e.preventDefault();

/* walidacja danych */

        for (var i=0; i<=inputControl.length; i++) {
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
            tdTask = document.createElement('td');

            tdAdditionDate.innerText = additionDate.value;
            tdAuthor.innerText = authorName.value;
            tdPriority.innerText = priority.value;
            tdTask.innerText = comment.value;

            tr.appendChild(tdAdditionDate);
            tr.appendChild(tdAuthor);
            tr.appendChild(tdPriority);
            tr.appendChild(tdTask);

            table.appendChild(tr);
/*Po dodaniu zadania, formularz się chowa.*/
            form.hidden = !form.hidden;

    });


});



