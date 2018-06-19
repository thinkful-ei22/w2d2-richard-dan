'use strict';
/* global $*/

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyDtpcRxCtBx08yzU0hlQAV71vfNVbeo2n8';
function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      part: 'snippet',
      key: API_KEY,
      q: `${searchTerm}`,
      maxResults: 10
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
  };

  $.ajax(settings);
}

function renderResult(result) {
  return `
  <div>
    <h2>
    <a href="https://www.youtube.com/watch?v=${result.id.videoId}"><img class="js-result-images" src="${result.snippet.thumbnails.medium.url}}" alt="" width="100px"></a>
    <a class="js-result-title" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a></h2>
    <p>Description: <span class="js-description">${result.snippet.description}</span></p>
  </div>
  `;
}

function displayYouTubeSearchData(data) {
  console.log(data);
  const results = data.items.map(item => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit(){
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val('');
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);