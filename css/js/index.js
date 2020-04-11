const main=document.querySelector('.main');const selector=document.querySelector('#srcselect');const btn=document.querySelector('.searchButton');const headtag=document.querySelector('.hdrtag');const body=document.querySelector('body');const sortselector=document.querySelector('.sort');const loader=document.querySelector('.loader');let mainNav=document.querySelector('.js-menu');let navBarToggle=document.querySelector('.js-nav');const api="471a578390434f8cada92ab15e4e8812";const defsrc="google-news-in";const defsort="publishedAt";const a2hs=document.querySelector(".promo");const a2hsbtn=document.querySelector(".bt");let deferredPrompt;navBarToggle.addEventListener('click',function(){mainNav.classList.toggle('active')});window.addEventListener('load',async()=>{updateNews();await updateSrc();selector.value=defsrc;selector.addEventListener('change',a=>{updateNews(a.target.value)})
sortselector.addEventListener('change',b=>{updateSearch(b.target.value)})
document.querySelector('input').onkeyup=async e=>{if(e.keyCode===13){main.style.filter='blur(8px)';mainNav.classList.toggle('active');await updateSearch();main.style.filter='none'}}
btn.onclick=async()=>{main.style.filter='blur(8px)';mainNav.classList.toggle('active');await updateSearch();main.style.filter='none'}
async function updateSearch(srtby=defsort){topFunction();const srsTerm=document.querySelector('.searchTerm').value;selector.style.display="none";headtag.innerHTML=`Search Results for <strong>${srsTerm}</strong>`;if(sortselector.style.display==='none'){sortselector.style.display="block"}
const res=await fetch(`https://newsapi.org/v2/everything?q=${srsTerm}&sortBy=${srtby}&pageSize=18&language=en&apiKey=${api}`);const json=await res.json();if(json.totalResults===0){headtag.innerHTML=`No Search Results found for <strong>${srsTerm}</strong>`}else{headtag.innerHTML=`Search Results for <strong>${srsTerm}</strong>`}
main.innerHTML=json.articles.map(createArticles).join('\n')}
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferredPrompt=e;showAddToHomeScreen()})});function topFunction(){document.body.scrollTop=0;document.documentElement.scrollTop=0}
async function updateSrc(){const res=await fetch(`https://newsapi.org/v2/sources?apiKey=${api}`);const json=await res.json();selector.innerHTML=json.sources.map(src=>`<option value="${src.id}">${src.name}</option>`).join('\n')}
async function updateNews(source=defsrc){const res=await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${api}`);const json=await res.json();main.innerHTML=json.articles.map(createArticles).join('\n')}
function createArticles(article){return `
   <div class="article">
    <a href="${article.url}" rel="noreferrer" target="_blank">
      <h2>${article.title}</h2>
      <img loading="lazy" alt="${article.title}" src="${article.urlToImage}">
      <p>${article.description}</p>
    </a>
   </div>
`}
function showAddToHomeScreen(){a2hs.style.display="block";loader.style.top="50%";a2hsbtn.addEventListener("click",addToHomeScreen)}
function addToHomeScreen(){a2hs.style.display='none';loader.style.top="40%";deferredPrompt.prompt();deferredPrompt.userChoice.then(function(choiceResult){if(choiceResult.outcome==='accepted'){console.log('User accepted the A2HS prompt')}else{console.log('User dismissed the A2HS prompt')}
deferredPrompt=null})}