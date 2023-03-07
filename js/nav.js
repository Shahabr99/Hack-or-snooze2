"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $("#all-stories-list").removeClass("hidden");
  $(".fav-list-container").addClass("hidden");
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function showStoryForm(e) {
  $("#story-form").toggleClass("hidden");
  // $("#story-form").slideDown("slow");
}

$(".submit-link").on("click", showStoryForm);

function showFavs() {
  $("#all-stories-list").hide();
  $(".fav-list-container").removeClass("hidden");
}

$(".fav-list").on("click", showFavs);
