  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCcVcsgZRf9mUkty8fi2opVtguSbeo7v0I",
    authDomain: "fir-click-counter-a83cb.firebaseapp.com",
    databaseURL: "https://fir-click-counter-a83cb.firebaseio.com",
    projectId: "fir-click-counter-a83cb",
    storageBucket: "fir-click-counter-a83cb.appspot.com",
    messagingSenderId: "462168696600",
    appId: "1:462168696600:web:f92c0e95cb6f78ce17a06d",
    measurementId: "G-TC0LWCVWNY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

  var database = firebase.database();

    // 2. Button for adding Employees
$("#submit-bid").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = moment($("#first-train").val().trim(), "MM/DD/YYYY").format("X");
    var freq = $("#freq").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: destination,
      time: trainTime,
      freq: freq
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.freq);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#freq").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainTime= childSnapshot.val().time;
    var freq = childSnapshot.val().freq;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(freq);
  
    // Prettify the employee start
    var trainTimePretty = moment.unix(trainTime).format("HH:MM");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var trainMin = moment().diff(moment(trainTime, "X"), "minutes");
    console.log(trainMin);
  
    // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(trainTimePretty),
      $("<td>").text(freq),
      $("<td>").text(trainMin)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  