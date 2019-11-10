  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCe4oV6-6FFnbR3fBG6nw3gSIqFVzPCQIk",
    authDomain: "trains-d927b.firebaseapp.com",
    databaseURL: "https://trains-d927b.firebaseio.com",
    projectId: "trains-d927b",
    storageBucket: "trains-d927b.appspot.com",
    messagingSenderId: "311311714271",
    appId: "1:311311714271:web:127b6cbb285d7e1683e66a",
    measurementId: "G-CVTNXKZS9Q"
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
    var trainTime = moment($("#first-train").val().trim(), "HH:mm").format("X");
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
  
    // Prettify the train time
    var trainTimePretty = moment.unix(trainTime).format("LT");

    var trainMin = moment().diff(moment(trainTime, "X"), "minutes");
    console.log(trainMin);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(freq),
      $("<td>").text(trainTimePretty),
      $("<td>").text(trainMin)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
