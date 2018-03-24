document.addEventListener('DOMContentLoaded', function () {
    var hideShowFormBtn = document.getElementById('main_btn'),
        form = document.getElementById('form'),
        addTaskBtn = document.getElementById('btn_submit'),
        additionDate = document.querySelector('#date'),
        authorName = document.querySelector('#name'),
        priority = document.querySelector('#priority'),
        comment = document.querySelector('#comment'),
        removeButton = document.querySelector('#removeFinishedTasksButton'),
        inputControl = document.getElementsByClassName('validation_required'),
        ul = document.querySelector('ul');

    /**hideShowFormBtn
     * Przycisk pokazuje formularz do dodawania zadania**/
    form.hidden = true;
    hideShowFormBtn.addEventListener('click', function (e) {
        e.preventDefault();
        form.hidden = !form.hidden;
    });

    /**btnDelete**/
    function checkboxDel(element, divToDelete){
        var btnDelete = document.createElement('input'),
            label = document.createElement('label');
        btnDelete.setAttribute('type', 'checkbox');
        label.classList.add('delete');
        element.appendChild(label);
        label.appendChild(btnDelete);

        //usuwanie zadania z listy
        btnDelete.addEventListener('change', function () {
            divToDelete.parentElement.removeChild(divToDelete);
            localStorage.removeItem('divToDelete');
        });
    }

    /**usuwanie ukończonych zadań**/
    function removeCompleteTasks(btnCom){
        var labelCom = btnCom.parentElement;
        var divToDelete = labelCom.parentElement.parentElement.parentElement;

        removeButton.addEventListener('click', function () {
            if(labelCom.className.indexOf('complete') > -1){
                divToDelete.parentElement.removeChild(divToDelete);
                localStorage.removeItem('divToDelete');
            }
        });
    }

    /**btnComplete**/
    function checkboxCom(element){
        var btnComplete = document.createElement('input'),
            label = document.createElement('label');
        btnComplete.setAttribute('type', 'checkbox');
        label.classList.add('done');
        element.appendChild(label);
        label.appendChild(btnComplete);

        //zadanie wykonane
        btnComplete.addEventListener('change', function () {
            this.parentElement.classList.toggle('complete');
        });

        removeCompleteTasks(btnComplete);
    }

    var counter = 0;

    /**Dodaj zadanie do listy z formularza**/
    addTaskBtn.addEventListener('click', function (e) {
        e.preventDefault();
        form.hidden = false;

        //savingListItem();

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

        var mainContainer = document.createElement('div'),
            liAdditionDate = document.createElement('li'),
            liAuthor = document.createElement('li'),
            liPriority = document.createElement('li'),
            liTask = document.createElement('li'),
            liForButtons = document.createElement('li'),
            labelForBtnCom = document.createElement('label'),
            labelForBtnDel = document.createElement('label');

        counter++;

        liAdditionDate.innerText = "Czas wykonania zadania: " + additionDate.value;
        liAuthor.innerText = "Nazwa zadania: " + authorName.value;
        liPriority.innerText = "Priorytet: " + priority.value;
        liTask.innerText = "Opis: " + comment.value;
        liForButtons.setAttribute('data-id', 'counter');
        labelForBtnCom.innerText = "Wykonane";
        labelForBtnDel.innerText = "Usuń";

        //czyszczenie inputa po zapisaniu zadania
        additionDate.value = '';
        authorName.value = '';
        priority.value = '';
        comment.value = '';

        ul.appendChild(mainContainer);
        mainContainer.appendChild(liAdditionDate);
        mainContainer.appendChild(liAuthor);
        mainContainer.appendChild(liPriority);
        mainContainer.appendChild(liTask);
        mainContainer.appendChild(liForButtons);
        liForButtons.appendChild(labelForBtnCom);
        liForButtons.appendChild(labelForBtnDel);

        checkboxDel(labelForBtnDel, mainContainer);
        checkboxCom(labelForBtnCom);

        /*Po dodaniu zadania, formularz się chowa.*/
        form.hidden = !form.hidden;

        //LOCAL STORAGE
        var localStorageTasks = JSON.parse( localStorage.getItem( 'tasks' ) );
        var newTask = {
            id: 'counter',
            additionDate : 'liAdditionDate',
            authorName : 'liAuthor',
            priority : 'liPriority',
            comment : 'liTask'
        };

        // Jeżeli w pamięci nie ma zadań to stwórz tablice z jednym zadaniem
        if( localStorageTasks === null ){
            localStorageTasks = [newTask];

        // Jeżeli zadania już istnieją to dopchnij do tej tablicy kolejne
        } else {
            localStorageTasks.push(newTask);
        }

        // Wrzucenie wszystkiego do pamięci
        localStorage.setItem( 'tasks', JSON.stringify(localStorageTasks) );
        console.log(localStorageTasks);


        // var task = [
        //     {
        //         id: 'counter',
        //         additionDate : 'liAdditionDate',
        //         authorName : 'liAuthor',
        //         priority : 'liPriority',
        //         comment : 'liTask'
        //     }
        // ];

            /**
             * set - get - parse
             * **/
            // Put the object into storage
            //localStorage.setItem('task', JSON.stringify(taskStringified));

            // Retrieve the object from storage
            //var retrievedObject = localStorage.getItem('task');

            //console.log('retrievedObject: ', JSON.parse(retrievedObject));

            // parsing
            //var taskStringified = JSON.parse(localStorage.getItem('task'));
            //console.log(taskStringified);
        //}

        /**
         * Zapis
         localStorage.setItem('todo_list', JSON.strigify( tasks ) );
         Odczyt:
         var tasks = JSON.parse( localStorage.getItem('todo_list') );
         * **/

    });

    /**ToDoList**/
    // function savingListItem(){
    //     /* walidacja danych */
    //     for (var i=0; i<inputControl.length; i++) {
    //         if(inputControl[i] === undefined)
    //         {
    //             continue;
    //         }
    //         if(!inputControl[i].value)
    //         {
    //             return false;
    //         }
    //     }
    //
    //     var mainContainer = document.createElement('div'),
    //         liAdditionDate = document.createElement('li'),
    //         liAuthor = document.createElement('li'),
    //         liPriority = document.createElement('li'),
    //         liTask = document.createElement('li'),
    //         liForButtons = document.createElement('li'),
    //         labelForBtnCom = document.createElement('label'),
    //         labelForBtnDel = document.createElement('label');
    //
    //     counter++;
    //
    //     liAdditionDate.innerText = "Czas wykonania zadania: " + additionDate.value;
    //     liAuthor.innerText = "Nazwa zadania: " + authorName.value;
    //     liPriority.innerText = "Priorytet: " + priority.value;
    //     liTask.innerText = "Opis: " + comment.value;
    //     liForButtons.setAttribute('data-id', 'counter');
    //     labelForBtnCom.innerText = "Wykonane";
    //     labelForBtnDel.innerText = "Usuń";
    //
    //     //czyszczenie inputa po zapisaniu zadania
    //     additionDate.value = '';
    //     authorName.value = '';
    //     priority.value = '';
    //     comment.value = '';
    //
    //     ul.appendChild(mainContainer);
    //     mainContainer.appendChild(liAdditionDate);
    //     mainContainer.appendChild(liAuthor);
    //     mainContainer.appendChild(liPriority);
    //     mainContainer.appendChild(liTask);
    //     mainContainer.appendChild(liForButtons);
    //     liForButtons.appendChild(labelForBtnCom);
    //     liForButtons.appendChild(labelForBtnDel);
    //
    //     checkboxDel(labelForBtnDel, mainContainer);
    //     checkboxCom(labelForBtnCom);
    // }

});