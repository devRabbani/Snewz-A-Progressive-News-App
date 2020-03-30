const main=document.querySelector('.main');
const selector=document.querySelector('#srcselect');
const btn=document.querySelector('.searchButton');
const headtag=document.querySelector('.hdrtag');
const body=document.querySelector('body');
const sortselector=document.querySelector('.sort');
let mainNav = document.querySelector('.js-menu');
let navBarToggle = document.querySelector('.js-nav');
const api="471a578390434f8cada92ab15e4e8812";
const defsrc="google-news-in";
const defsort="publishedAt";
var deferredPrompt;


// document.addEventListener('touchstart', (evt) => {
//  // ... do stuff with evt
// }, {
//  capture: true,
//  passive: true
// });


window.addEventListener('load',async ()=>{
  updateNews();
  await updateSrc();
  selector.value=defsrc;
  selector.addEventListener('change',a=>{
    updateNews(a.target.value);
  })
  sortselector.addEventListener('change',b=>{
    updateSearch(b.target.value);
  })
 
document.querySelector('input').onkeyup=e=>{
  if(e.keyCode===13)
    {
     updateSearch(); 
     mainNav.classList.toggle('active');
    }
      
}
btn.onclick=()=>{
  updateSearch();
  mainNav.classList.toggle('active');
}
  async function updateSearch(srtby=defsort){
     const srsTerm=document.querySelector('.searchTerm').value;
      selector.style.display="none"; 
     headtag.innerHTML=`Search Results for <strong>${srsTerm}</strong>`;
    if(sortselector.style.display==='none'){
      sortselector.style.display="block";
    }
     const res= await fetch(`https://newsapi.org/v2/everything?q=${srsTerm}&sortBy=${srtby}&pageSize=18&language=en&apiKey=${api}`);
     const json=await res.json();
    if(json.totalResults===0){
       headtag.innerHTML=`No Search Results found for <strong>${srsTerm}</strong>`;
    }else{
       headtag.innerHTML=`Search Results for <strong>${srsTerm}</strong>`;
    }
    main.innerHTML=json.articles.map(createArticles).join('\n');
}


navBarToggle.addEventListener('click', function () {
  mainNav.classList.toggle('active');
});
  
window.addEventListener('beforeinstallprompt', function (e) { // Prevent Chrome 67 and earlier from automatically showing the prompt 
    e.preventDefault();
    // Stash the event so it can be triggered later. 
    deferredPrompt = e;
    showAddToHomeScreen();
  });
  
   
   

registerSw();

});



//Functions
async function registerSw(){
  if('serviceWorker' in navigator){
    try{
      await navigator.serviceWorker.register('./sw.js');
    }
    catch(e){
      console.log("SW registration failed");
    }
  }
}


async function updateSrc(){
  const res= await fetch(`https://newsapi.org/v2/sources?apiKey=${api}`);
  const json=await res.json();
  selector.innerHTML=json.sources.map(src=>
    `<option value="${src.id}">${src.name}</option>`
  ).join('\n');  
}
async function updateNews(source=defsrc){
  const res= await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${api}`);
  const json=await res.json();
  main.innerHTML=json.articles.map(createArticles).join('\n');
}

function createArticles(article){
      return `
   <div class="article">
    <a href="${article.url}" rel="noreferrer" target="_blank">
      <h2>${article.title}</h2>
      <img alt="${article.title}" src="${article.urlToImage}">
      <p>${article.description}</p>
    </a>
   </div>
`; 
}

function showAddToHomeScreen() {
  var a2hs = document.querySelector(".promo");
  var a2hsbtn=document.querySelector(".bt");
  a2hs.style.display = "block";
  a2hsbtn.addEventListener("click", addToHomeScreen);
}


function addToHomeScreen() {
  var a2hs = document.querySelector(".promo");

  // hide our user interface that shows our A2HS button 
  a2hs.style.display = 'none';

  // Show the prompt 
  deferredPrompt.prompt();

  // Wait for the user to respond to the prompt 
  deferredPrompt.userChoice
    .then(function (choiceResult) {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
}
