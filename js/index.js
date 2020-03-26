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

});

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
    <a href="${article.url}" target="_blank">
      <h2>${article.title}</h2>
      <img src="${article.urlToImage}">
      <p>${article.description}</p>
    </a>
   </div>
`;
  
}