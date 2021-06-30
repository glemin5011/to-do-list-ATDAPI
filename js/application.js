//Live date
window.onload = function () {
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
//Event handlers for add button, remove button, etc.

//Add new task (button) - may need to adjust task numbering
$(document).ready(function () {
  var addNewTask = function () {
    $(".list-group").append(`<li class="list-group-item">
    <input
      class="form-check-input rounded-circle me-1"
      id="task1"
      type="checkbox"
      value=""
    />
    <label class="form-check-label pt-2" for="task1">${$(
      "#newTask"
    ).val()}</label>
    <button class="btn btn-sm remove-item border">Remove</button>
  </li>`);
  };

  //Enter in form
  $("#newTask").keypress(function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      addNewTask();
    }
  });
  //Button click
  $("#createNewTask").on("click", function (event) {
    addNewTask();
  });

  //Remove button working with new items too
  $(document).on("click", ".remove-item", function () {
    $(this).parentsUntil(".list-group").remove();
    console.log("Remove button was hit.");
  });

  //Form check styling change

  //Is active button is hit
  // form-check-input is checked
  //then hide the item

  //May need .each()
  /*
  $(".toggle-active").on("click", function () {
    if ($(".form-check-input").prop("checked")) {
      $(".list-group-item").prop("hidden", true);
    }
  });*/

  //Show active-only tasks
  $(".toggle-active").on("click", function () {
    $(".list-group-item").each(function (i, ele) {
      if ($(this).find(".form-check-input").prop("checked")) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
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
  });

  //Show All tasks
  $(".toggle-all").on("click", function () {
    $(".list-group-item").each(function (i, ele) {
      $(this).show();
    });
  });
});
/*

});


});
*/
