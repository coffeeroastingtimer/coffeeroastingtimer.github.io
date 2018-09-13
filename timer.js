window.onload=function() {
  var start = 0;
  var stop = 0;
  var interval = 0;
  var fcInterval = 0;
  var timerRunning = 0;
  var firstCrack = 0;
  
  $("#start-button").click(function() {
    if (interval == 0) {
      start = new Date().getTime();
    }
  
    if (timerRunning == 1) {
      timerRunning = 2;
      stop = new Date().getTime();
      $(this).text("Reset");
      $(this).removeClass("btn-danger");
      $(this).addClass("btn-warning");
  
      clearInterval(interval);
      clearInterval(fcInterval);
    } else if (timerRunning == 2) {
      start = 0;
      stop = 0;
      interval = 0;
      fcInterval = 0;
      timerRunning = 0;
      firstCrack = 0;
      $(this).text("Start");
      $(this).removeClass("btn-warning");
      $(this).addClass("btn-primary");
      $(".jumbotron h1#timer").text("00:00");
      $("#first-crack").text("First Crack: ");
      $("#development-time").text("Development %: ");
      $("#development-time").removeClass("label-warning");
      $("#development-time").removeClass("label-danger");
      $("#lowest").text("15.0%: ");
      $("#lower").text("17.5%: ");
      $("#low").text("20.0%: ");
      $("#mid").text("22.5%: ");
      $("#high").text("25.0%: ");
    } else {
      timerRunning = 1;
      $(this).text("Stop");
      $(this).removeClass("btn-primary");
      $(this).addClass("btn-danger");
  
      interval = setInterval(function() {
        $(".jumbotron h1#timer").text(timeToString(new Date().getTime() - start));
      }, 100)
    }
  });
  
  $("#first-crack-button").click(function() {
    if (start != 0 && timerRunning == 1) {
      firstCrack = new Date().getTime();
      $("#first-crack").addClass("label-success");
      $("#first-crack").text("First Crack: " + timeToString(firstCrack - start));
      $("#firstCrackButtons").toggle();
      $("#development-time").removeClass("label-warning");
      $("#development-time").removeClass("label-danger");
  
      if (fcInterval != 0) {
        clearInterval(fcInterval); 
      }
      fcInterval = setInterval(function() {
        var firstCrackMillis = firstCrack - start;
        var firstCrackSeconds = Math.floor(firstCrackMillis / 1000);
        var currentTimeMillis = new Date().getTime() - start;
        var currentTimeSeconds = Math.floor(currentTimeMillis / 1000);
        var developmentTime = ((1 - (firstCrackSeconds / currentTimeSeconds)) * 100).toFixed(2);
  
        $("#development-time").text("Development %: " + developmentTime + "%");
        if (developmentTime > 15) {
          $("#development-time").addClass("label-warning");
        }
        if (developmentTime > 20) {
          $("#development-time").addClass("label-danger");
        }
      }, 1000)
  
      var developmentTimeMillis = firstCrack - start;
      $("#lowest").text("15.0%: " + timeToString(developmentTimeMillis / .85));
      $("#lower").text("17.5%: " + timeToString(developmentTimeMillis / .825));
      $("#low").text("20.0%: " + timeToString(developmentTimeMillis / .8));
      $("#mid").text("22.5%: " + timeToString(developmentTimeMillis / .775));
      $("#high").text("25.0%: " + timeToString(developmentTimeMillis / .75));
    }
  });

  $("#calc-button").click(function() {
    var greenWeight = $("#green-weight").val() || 0;
    var roastWeight = $("#roast-weight").val() || 0;
    $("#weight-loss").text("Weight Loss: " + calcWeightLoss(greenWeight, roastWeight) + "%");
    $("#date-timestamp").text("Date: " + new moment().format('MMM Do YYYY, h:mm:ss a'));
  });

  function calcWeightLoss(greenWeight, roastWeight) {
    var weightLoss = 0;

    if (greenWeight != 0 && roastWeight !=0) {
      weightLoss = 100*((greenWeight - roastWeight)/greenWeight);
    }

    return weightLoss.toFixed(2);
  }
  
  function timeToString(millis) {
    millis = Math.round(millis);
    var timeSeconds = Math.floor(millis / 1000);
    var timeMinutes = Math.floor(timeSeconds / 60);

    if (timeSeconds > 59) {
      timeSeconds = timeSeconds - (timeMinutes * 60);
    }
    if (timeSeconds < 10) {
      timeSeconds = "0" + timeSeconds;
    }
    if (timeMinutes < 10) {
      timeMinutes = "0" + timeMinutes;
    }
  
    return timeMinutes + ":" + timeSeconds;
  }
}
