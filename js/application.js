//ATD API ID: id:108
//URL: https://altcademy-to-do-list-api.herokuapp.com/

let liveDate = function () {
  let currentTime = new Date();
  let options = { month: "long" };
  let month = new Intl.DateTimeFormat("en-GB", options).format(currentTime);
  let day = currentTime.getDate();
  let year = currentTime.getFullYear();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = week[currentTime.getDay()];
  document.getElementById(
    "datetime"
  ).innerHTML = `${weekday}, ${day} ${month} ${year}`;
};

// GET API REQUEST
var getAndDisplayAllTasks = function () {
  $.ajax({
    type: "GET",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=108",
    dataType: "json",
    success: function (response, textStatus) {
      $(".list-group").empty();
      // response is a parsed JavaScript object instead of raw JSON
      response.tasks.forEach(function (task) {
        $(".list-group").append(`<li class="list-group-item">
    <input
      class="form-check-input rounded-circle me-1"
      id="${task.id}"
      type="checkbox"
      value=""
      data-id="${task.id}"
      ${task.completed ? "checked" : ""}
    />
    <label class="form-check-label pt-2" for="${
      task.id
    }">${task.content}</label>
    <button class="btn btn-sm mt-2 mt-sm-3 remove-item border" data-id="${
      task.id
    }">Remove</button>
  </li>`);
      });
      updateListItemCount();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};

// ADD NEW TASK API REQUEST

var addNewTask = function () {
  $.ajax({
    type: "POST",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=108",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      task: {
        content: $("#newTask").val(),
      },
    }),
    success: function (response, textStatus) {
      $("#newTask").val("");
      getAndDisplayAllTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};
// DELETE API REQUEST
var removeItem = function (id) {
  $.ajax({
    type: "DELETE",
    url: `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}?api_key=108`,
    success: function (response, textStatus) {
      getAndDisplayAllTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};

//MARK COMPLETE (PUT) API REQUEST

var markComplete = function (id) {
  $.ajax({
    type: "PUT",
    url: `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}/mark_complete?api_key=108`,
    dataType: "json",
    success: function (response, textStatus) {
      getAndDisplayAllTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};

//MARK ACTIVE (PUT) API REQUEST
var markActive = function (id) {
  $.ajax({
    type: "PUT",
    url: `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}/mark_active?api_key=108`,
    dataType: "json",
    success: function (response, textStatus) {
      console.log("The API request fired successfully");
      getAndDisplayAllTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};

//Keeping count of tasks
var updateListItemCount = function () {
  $(".number-of-tasks").html($(".list-group-item").length);
};

//Add new task function - may need to adjust task numbering
$(document).ready(function () {
  //EVENT LISTENERS
  //Add new item by enter keypress
  $("#newTask").keypress(function (event) {
    if (event.keyCode === 13 && $("#newTask").val().length !== 0) {
      event.preventDefault();
      addNewTask();
      updateListItemCount();
    } else if (event.keyCode === 13 && $("#newTask").val().length === 0) {
      event.preventDefault();
      alert("Input can not be left blank");
    }
  });
  //Add new item button click
  $("#createNewTask").on("click", function (event) {
    if ($("#newTask").val().length !== 0) {
      addNewTask();
      updateListItemCount();
    } else if ($("#newTask").val().length === 0) {
      event.preventDefault();
      alert("Input can not be left blank");
    }
  });
  //Remove button working with new items too
  $(document).on("click", ".remove-item", function () {
    removeItem($(this).data("id"));
    updateListItemCount();
  });

  //Show active-only tasks
  $(".toggle-active").on("click", function () {
    $(".list-group-item").each(function (i, ele) {
      if ($(this).find(".form-check-input").prop("checked")) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
    $(this).addClass("selected");
    $(this).siblings().removeClass("selected");
  });

  //Show aompleted-only tasks
  $(".toggle-completed").on("click", function () {
    $(".list-group-item").each(function (i, ele) {
      if ($(this).find(".form-check-input").prop("checked") !== true) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
    $(this).addClass("selected");
    $(this).siblings().removeClass("selected");
  });

  //Show All tasks
  $(".toggle-all").on("click", function () {
    $(".list-group-item").each(function (i, ele) {
      $(this).show();
    });
    $(this).addClass("selected");
    $(this).siblings().removeClass("selected");
  });

  //Change event that checks the checkbox is checked / unchecked
  $(document).on("change", ".form-check-input", function () {
    if (this.checked) {
      markComplete($(this).data("id"));
    } else {
      markActive($(this).data("id"));
    }
  });

  // API POST REQUEST
  liveDate();
  getAndDisplayAllTasks();
});
