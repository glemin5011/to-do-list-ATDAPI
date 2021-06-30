//Add new task function - may need to adjust task numbering
$(document).ready(function () {
  //LIVE DATE
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

  //Keeps count of number of items on the list to assign unique IDs
  var itemAccumulator = $(".list-group-item").length;

  var updateListItemCount = function () {
    $(".number-of-tasks").html($(".list-group-item").length);
  };
  updateListItemCount();
  var addNewTask = function () {
    $(".list-group").append(`<li class="list-group-item">
    <input
      class="form-check-input rounded-circle me-1"
      id="${itemAccumulator + 1}"
      type="checkbox"
      value=""
    />
    <label class="form-check-label pt-2" for="${itemAccumulator + 1}">${$(
      "#newTask"
    ).val()}</label>
    <button class="btn btn-sm remove-item border">Remove</button>
  </li>`);
    return (itemAccumulator += 1);
  };

  //Add new item by enter keypress
  $("#newTask").keypress(function (event) {
    if (event.keyCode === 13 && $("#newTask").val().length !== 0) {
      event.preventDefault();
      addNewTask();
      updateListItemCount();
    } else if (event.keyCode === 13 && $("#newTask").val().length === 0) {
      alert("Input can not be left blank");
    }
  });
  //Add new item button click
  $("#createNewTask").on("click", function (event) {
    if ($("#newTask").val().length !== 0) {
      addNewTask();
      updateListItemCount();
    } else if ($("#newTask").val().length === 0) {
      alert("Input can not be left blank");
    }
  });

  //Remove button working with new items too
  $(document).on("click", ".remove-item", function () {
    $(this).parentsUntil(".list-group").remove();
    updateListItemCount();
    console.log("Remove button was hit.");
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
});
