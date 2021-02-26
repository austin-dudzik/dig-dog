$(document).ready(function() {

  let counter = 1;
  let count = 0;

  // Set the number of bones
  const NUM_BONES = 5;

  // Set initial bones remaining
  let bonesRemaining = NUM_BONES;

  // Add bones remaining to page
  $("span#bonesRemain").text(bonesRemaining);

  // Create rows based on bone count
  for (let rows = 0; rows < NUM_BONES; rows++) {

    // Create squares based on bone count
    for (let squares = 0; squares < NUM_BONES; squares++) {
      createSquare();
    }

    // Add line breaks to grid
    $("div#board").append("<br>");

  }

  // Create a square function
  function createSquare() {

    // Initiate the square
    let square = $("<span>");

    // Add "square" class to square
    square.addClass("square");

    // Assign a unique ID to square
    square.attr("id", counter++);

    // Append square to board
    $("div#board").append(square);

  }

  // Generate random numbers using an array to to make sure they're
  // unique. While the array length is less than the number of bones,
  // generate a new number that doesn't already exist in the array
  let numbers = [];
  while (numbers.length < NUM_BONES) {
    let r = Math.floor(Math.random() * NUM_BONES * NUM_BONES) + 1;
    if (numbers.indexOf(r) === -1) numbers.push(r);
  }

  // Loop through the random numbers array and assign "boneHere"
  // class to unique, randomly selected squares
  for (let i = 0; i < numbers.length; i++) {
    $(`#${numbers[i]}`).addClass("boneHere");
  }

  // Generate a random number for the meter
  function updateMeter() {
    randMeter = Math.floor(Math.random() * ((NUM_BONES * 2) - NUM_BONES + 1)) + NUM_BONES;
    count += randMeter;
  }

  // On click of square...
  $("div#board").on("click", "span.square", function(event) {

    // Detect the clicked square
    $target = $(event.target);

    // Disable clicking again
    $target.click(false);

    // Set the bg color to dirt
    $target.addClass("dug");

    // Generate random # and update meter
    updateMeter();

    // Set the width of the meter
    $("#meter").width(`${count}%`);

    // Set the percentage on the meter
    $("#meter").text(`${count}%`);

    // Run function to check game status
    checkStatus();

  });

  // On click of square with bone...
  $("div#board").on("click", "span.boneHere", function(event) {

    // Add "bone" class to square
    $target.addClass("bone");

    // Subtract 1 from bonesRemaining
    bonesRemaining = bonesRemaining - 1;

    // Updates bones remaining text
    $("span#bonesRemain").text(bonesRemaining);

    // Run function to check game status
    checkStatus();

  });

  // Check the current status of game
  function checkStatus() {

    // If no bones are left...
    if (bonesRemaining == 0) {
      // Update the game message text
      $("#message").text("Congrats, you found all the bones!");
      // Disable clicking on reamining squares
      $(document.getElementsByTagName("span")).click(false);
    }

    // Check if meter is equal to or over 100
    else if (count >= 100) {
      // Update the game message text
      $("#message").text("Bad dog! Shoo! Get off my lawn!");
      // Disable clicking on remaining squares
      $(document.getElementsByTagName("span")).click(false);
    }

  }

});