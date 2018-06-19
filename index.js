'use strict';
/* global $*/

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = 'AIzaSyAh6bzjJbXfT9SOpaIk4RrIg5dpz51eeio';
function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      part: 'snippet',
      key: API_KEY,
      q: `${searchTerm} in:title`
    },
    dataType: 'json',
    type: 'GET',
    sucess: callback
  };

  $.ajax(settings);
}

function renderResult(result) {
  return `
  <div>
    <h2>
    <a class="js-result-title" href="${result.html_url}" target="_blank">${result.title}</a></h2>
    <p>Description<span class="js-description">${result.description}</span></p>
    <p>Thumbnail<span class="js-thumbnail-url">${result.thumbnail.url}</span></p>
  </div>
  `;
}