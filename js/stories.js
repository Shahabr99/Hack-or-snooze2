"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      
      <li id="${story.storyId}">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 star">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>

        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function submitStory(e) {
  e.preventDefault();

  //Getting data from the DOM
  const author = $("#author").val();
  const title = $("#title").val();
  const url = $("#url").val();
  console.log(author, url, title);
  const user = currentUser.username;
  const data = { title, url, author, user };

  const story = await storyList.addStory(currentUser, data);

  const $template = generateStoryMarkup(story);
  $allStoriesList.prepend($template);

  $("#story-form").slideUp("slow");
  $("#story-form").reset();
}

$("#story-form").on("submit", submitStory);

async function addUIFavorite(e) {
  const user = currentUser.username;
  const el = e.target.closest("li");
  const storyID = el.getAttribute("id");

  const stories = await User.addFavorite(user, storyID);
  console.log(stories);
  stories.forEach((story) => {
    const $template = generateStoryMarkup(story);
    console.log($template);
    $(".fav-list-container").prepend($template);
  });
}

$("#all-stories-list").on("click", ".star", addUIFavorite);
