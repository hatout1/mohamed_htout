$(document).ready(function () {
  // firebase
  var firebaseConfig = {
    apiKey: "AIzaSyCTIveb-o4xcpNsQX-Zf1NfDCKHlM_zjnA",
    authDomain: "profile-38836.firebaseapp.com",
    databaseURL: "https://profile-38836.firebaseio.com",
    projectId: "profile-38836",
    storageBucket: "profile-38836.appspot.com",
    messagingSenderId: "812008865031",
    appId: "1:812008865031:web:acd4221c14e09629b699a2",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  $("#closeNavBtn").on("click", function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  });

  $("#sandwichBar").on("click", function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  });

  $("#mySidenav").on("click", function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  });

  const db = firebase.database();
  console.log(db);

  $("a").click(function (event) {
    let nav = event.target.id;
    console.log(nav);
    switch (nav) {
      case (nav = "home"):
        $("html, body").animate(
          {
            scrollTop: $("#homeTitle").offset().top,
          },
          1000
        );
        break;
      case (nav = "about"):
        $("html, body").animate(
          {
            scrollTop: $("#aboutTitle").offset().top,
          },
          1000
        );
        break;
      case (nav = "projects"):
        $("html, body").animate(
          {
            scrollTop: $("#projectsTitle").offset().top,
          },
          1000
        );
        break;
      case (nav = "hire"):
        $("html, body").animate(
          {
            scrollTop: $("#hireTitle").offset().top,
          },
          1000
        );
        break;
      case (nav = "contact"):
        $("html, body").animate(
          {
            scrollTop: $("#contactTitle").offset().top,
          },
          1000
        );
        break;
      case (nav = "others"):
        $("html, body").animate(
          {
            scrollTop: $("#othersTitle").offset().top,
          },
          1000
        );
        break;
    }
  });

  $("#others-btn").on("click", function (e) {
    e.preventDefault();

    var otherName = $("#name-others-form").val();
    var otherMessage = $("#message-others-form").val();

    var newReview = {
      Name: otherName,
      Message: otherMessage,
    };

    db.ref().push(newReview);

    $("#name-others-form").val("");
    $("#message-others-form").val("");
  });
  db.ref().on("child_added", function (snap) {
    var otherNameDisp = snap.val().Name;
    var otherMessageDisp = snap.val().Message;

    // function to avoid multi entries of data.
    $("#name-others-form").empty();
    $("#messgae-others-form").empty();

    $("#others-container > othersDisplay").append(
      `<div class="firebase-show"><h1>${otherMessageDisp}</h1><h2>"${otherNameDisp}"</h2></div>`
    );
  });

  // ----------------- Projects Slide Show-----------------------------------------

  var slideIndex = 0;

  function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot2");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 3000); // Change image every 2 seconds
  }

  showSlides();

  $(".carousel").carousel({
    interval: 1000,
  });

  function Hello() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }
});
$("#contactEmailSend").on("click", function sendEmail(e) {
  // function sendEmail(){
  e.preventDefault();
  // console.log("Hello");
  const Name = $("#comment").val();
  const subject = $("#email").val();
  const Subject = Name + " (" + subject + ")";
  const Body = $("#contact-message").val();

  console.log(Name + " " + Subject + " sent you this: " + Body);

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "hatout1@gmail.com",
    Password: "FEAA3CB52C3AFCC4C7C928B611882956EEC8",
    To: "hatout1@gmail.com",
    From: "keepnotes10@gmail.com",
    Subject: Subject,
    Body: Body,
  }).then((message) => {
    alert("Thank you for contacting me, I will reply as soon as possible");
    $("#comment").val("");
    $("#email").val("");
    $("#contact-message").val("");
  });
});
