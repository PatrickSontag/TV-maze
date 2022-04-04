// root url:  https://api.tvmaze.com/
// endpoint search shows url:  /singlesearch/shows?q=:query
//        example:  https://api.tvmaze.com/search/shows?q=girls
// endpoint shows main information url:  /shows/:id
//        example:  https://api.tvmaze.com/shows/1
// endpoint episode list url:  /shows/:id/episodes
//        example:  https://api.tvmaze.com/shows/1/episodes


"use strict";

console.log("is this working?");


const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");



/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(searchTerm) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  console.log("is this working 2?");

  const response = await axios.get('https://api.tvmaze.com/search/shows?', { params: { q: searchTerm}});
  const data = response.data
  const showsArr = [];


  console.log(response);

  for (let item of data) {
    let nextShow = {
      id: `${item.show.id}`,
      name: `${item.show.name}`,
      summary: `${item.show.summary}`,
      image: `${item.show.image.medium}`
    };

    showsArr.push(nextShow);
    nextShow = {};
  }

  console.log(showsArr);

  populateShows(showsArr);
  // return example:
  // return [
  //   {
  //     id: 1767,
  //     name: "The Bletchley Circle",
  //     summary:
  //       `<p><b>The Bletchley Circle</b> follows the journey of four ordinary 
  //          women with extraordinary skills that helped to end World War II.</p>
  //        <p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their 
  //          normal lives, modestly setting aside the part they played in 
  //          producing crucial intelligence, which helped the Allies to victory 
  //          and shortened the war. When Susan discovers a hidden code behind an
  //          unsolved murder she is met by skepticism from the police. She 
  //          quickly realises she can only begin to crack the murders and bring
  //          the culprit to justice with her former friends.</p>`,
  //     image:
  //         "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
  //   }
  // ]
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  const defaultImg = "http://static.tvmaze.com/uploads/images/medium_portrait/160/401704.jpg";

  for (let show of shows) {
    const $nextShow = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src="${show.image}" 
              alt="Bletchly Circle San Francisco" 
              class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);

    console.log("show: ", show);
    console.log("show.id: ", show.id);
    console.log("show.name: ", show.name);
    console.log("$nextShow: ", $nextShow)

    $showsList.append($nextShow);  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }
