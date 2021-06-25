//Live date
window.onload = function() {
    let currentTime = new Date();
    let options = {month: 'long'};
    let month = new Intl.DateTimeFormat('en-GB', options).format(currentTime)
    let day = currentTime.getDate();
    let year = currentTime.getFullYear();
    let week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let weekday = week[currentTime.getDay()];
    document.getElementById("datetime").innerHTML = `${weekday}, ${day} ${month} ${year}`;
  };