$(document).ready(() => {
    const $form = $("#addTaskForm");
    const $modal = new bootstrap.Modal("#addTaskModal");
    const $descriptionInput = $("#descriptionInput");
    const $date = $("#date");
    const $hide = $("#hide")
    const $searchInput = $("#form1")

    $hide.click(() => {
        if (!$hide.hasClass("is-hidden")) {
            $hide.addClass("is-hidden")
            $("#icon-show-button").removeClass("bi bi-caret-down")
            $("#icon-show-button").addClass("bi bi-caret-up")
            $("#todoDiv").removeClass("col-md-4")
            $("#todoDiv").addClass("col-md-8")
            $("#dateExpirationDiv").removeClass("col-md-2")
            $("#dateExpirationDiv").addClass("col-md-4")
            $("#finished").hide()
            $("#dateConclusion").hide()
            $("#dateConclusionWord").hide()
            $("#finishedWord").hide()
        } else {
            $hide.removeClass("is-hidden")
            $("#icon-show-button").removeClass("bi bi-caret-up")
            $("#icon-show-button").addClass("bi bi-caret-down")
            $("#todoDiv").removeClass("col-md-8")
            $("#todoDiv").addClass("col-md-4")
            $("#dateExpirationDiv").removeClass("col-md-4")
            $("#dateExpirationDiv").addClass("col-md-2")
            $("#finished").show()
            $("#dateConclusion").show()
            $("#dateConclusionWord").show()
            $("#finishedWord").show()
        }
})
    

    const createIconButton = (iconClass, btnClasses, clickHandler) => {
        const $button = $("<button></button>").addClass(btnClasses);
        const $icon = $("<i></i>").addClass(iconClass);
        $button.append($icon);
        $button.click(clickHandler);

        return $button;
    };


    $date.datepicker({
        format: 'dd/mm/yyyy', 
        language: 'pt-BR'    
    });

    const addTaskToBoard = (description, date) => {
        const $newTask = $("<div></div>").addClass("taskboard-item")
        const $taskText = $("<span></span>").text(description);
        const $dateText = $("<div></div>").text(date).addClass("taskboard-item").addClass("date-padding").addClass("filter-aux")
        const $today = $("<div></div>").text(`${(new Date()).toLocaleDateString('pt-BR')}`).addClass("taskboard-item").addClass("filter-aux")

        const $editButton = createIconButton("bi bi-pencil", "btn btn-warning btn-sm", () => {
            const editedText = prompt("Nova descrição", description);
            if (editedText !== null) {
                $taskText.text(editedText);
            }
        });

        const $deleteButton = createIconButton("bi bi-x", "btn btn-danger btn-sm", () => {
            $newTask.remove()
            $dateText.remove()
            $today.remove()
            
        });

        const $editDateButton = createIconButton("bi bi-calendar-date", "btn btn-warning btn-sm", () => {
                
                alert("Por favor, clique na data para alterá-la.")
                const $dateInput = $("<input>").addClass("form-control").attr("type", "text");
                $dateInput.datepicker({
                    format: 'dd/mm/yyyy',
                    language: 'pt-BR'
                });
            
                $dateInput.val($dateText.text());
                $dateText.replaceWith($dateInput);
            
                $dateInput.datepicker().on("hide", () => {
                    const editedDate = $dateInput.val();
                    $dateText.text(editedDate);
                    $dateInput.datepicker("remove");
                    $dateInput.replaceWith($dateText);
                });
            ;
        });

        const $concludedButton = createIconButton("bi bi-check", "btn btn-success btn-sm", () => {
        $(`#finished`).append($newTask)
        $(`#dateConclusion`).append($today)
        $dateText.remove()
        $editButton.remove()
        $editDateButton.remove()
        $concludedButton.remove()
        })

        const $buttonsContainer = $("<div></div>").addClass("d-flex column-gap-2");
        $buttonsContainer.append($editButton, $editDateButton, $deleteButton, $concludedButton);
        $newTask.append($taskText, $buttonsContainer);

        $(`#todo`).append($newTask);
        $(`#dateExpiration`).append($dateText)

    }

    $form.submit(event => {
        event.preventDefault();

        if ($form[0].checkValidity()) {
            addTaskToBoard($descriptionInput.val(), $date.val());
            $form[0].reset(); 
            $modal.hide(); 
            $form.removeClass("was-validated"); 
        } else {
            $form.addClass("was-validated"); 
        }
    });

    $searchInput.on("input", () => {
        const searchTerm = $searchInput.val().toLowerCase();
    
        $(".taskboard-item").each(function () {
            const $task = $(this);
            const $description = $task.find("span").text().toLowerCase();
            const $dateAux = $task.find(".filter-aux") 
    
            if (!$description.startsWith(searchTerm)) {
                $task.hide(); 
                $dateAux.hide()
            } else {
                $task.show(); 
                $dateAux.show()
            }
        });
    });
    

});