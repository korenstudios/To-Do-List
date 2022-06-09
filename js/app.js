function createTaskElement({ content = "", isComplete = false } = {}) {
  const $newTask = $("<div></div>", {
    class: "task",
  }).append(
    $(
      `<input type="checkbox" class="is-complete" ${
        isComplete ? "checked" : ""
      }/>`
    )
  );

  $("<div>")
    .addClass("task-content")
    .attr("contenteditable", true)
    .text(content)
    .appendTo($newTask);

  return $newTask;
}

// add the .task to the .task-container and apply
function addTask() {
  const $newTask = createTaskElement();
  $(".tasks-container").prepend($newTask);

  $newTask.find(".task-content").trigger("focus");
}

// remove all .task from the .task-container
function removeAllTasks() {
  if (confirm("All Tasks Will Delete. Are You Sure?")) {
    $(".tasks-container").empty();
  }
}

// remove completed .task from the .task-container
function removeCompletedTasks() {
  $("input.is-complete:checked").parent().remove();
}

// change .task Status
function taskStatusChanged() {
  const $elem = $(this);

  if ($elem.is(":checked")) {
    // add .red to .task
    $elem.parent().addClass("red");

    // add .strike to .task-content
    $elem.next().addClass("strike");

    // move the element to the end
    $elem.parent().detach().appendTo(".tasks-container");
  } else {
    // remove red class from .task
    $elem.parent().removeClass("red");

    // remove strike class from .task-content
    $elem.next().removeClass("strike");

    // move after last checked
    const $task = $elem.parent().detach();
    $("input.is-complete:not(:checked)").parent().last().after($task);
  }
}

// initialization the events
function init() {
  $(".add-task-container").on("click", addTask);
  $(".remove-tasks-container")
    .on("click", removeCompletedTasks)
    .on("click", removeAllTasks);
  $(".tasks-container").on(
    "change",
    "input.is-complete:checkbox",
    taskStatusChanged
  );

  $("body").on("keyup", (e) => {
    if ((e.key === "n" || e.key === "N") && e.altKey) {
      addTask();
    }
  });
}

$(init);
