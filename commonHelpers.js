import{a as y,S as h,i as d}from"./assets/vendor-64b55ca9.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const m="gallery-link";function b({largeImageURL:r,tags:o,webformatURL:i,likes:s,views:e,comments:t,downloads:n}){return`
    <a href="${r}" class="${m}">
      <figure>
        <img src="${i}" alt="${o}" class="gallery-image">
        <figcaption class="gallery__figcaption">
          <div class="image-item">Likes <span class="image-elem">${s}</span></div>
          <div class="image-item">Views <span class="image-elem">${e}</span></div>
          <div class="image-item">Comments <span class="image-elem">${t}</span></div>
          <div class="image-item">Downloads <span class="image-elem">${n}</span></div>
        </figcaption>
      </figure>
    </a>
  `}const f=document.querySelector("#gallery"),u=document.querySelector(".search-form"),L=document.querySelector(".loader"),p=document.getElementById("loadMoreBtn"),w=document.getElementById("endMessage");let a=1,l="";function E(){f.innerHTML=""}function c(){p.style.display="none"}function M(){p.style.display="block"}function S(){w.style.display="none"}function q(){w.style.display="block"}function $(){L.style.display="inline-block"}function v(){L.style.display="none"}function g(r){d.info({title:"Information",message:r,position:"topRight"})}u.addEventListener("submit",async function(r){if(r.preventDefault(),l=r.target.elements.query.value,l!==""){a=1,E(),S(),$();try{const{data:o}=await y.get(`https://pixabay.com/api/?key=42404284-d1db8811507a6ab98b0e3f497&q=${l}&image_type=photo&orientation=horizontal&safeSearch=true&page=${a}&per_page=15`),{hits:i,totalHits:s}=o;if(i.length>0){const e=i.map(b).join("");f.innerHTML=e,new h(`.${m}`).refresh(),M(),window.scrollBy({top:window.innerHeight,behavior:"smooth"})}else g("Sorry, there are no images matching your search query. Please try again!"),c()}catch(o){console.error("Error fetching images:",o),d.error({title:"Error",message:`Error fetching images: ${o.message}`,position:"topRight"})}finally{v(),u.reset()}}});p.addEventListener("click",async function(){$();try{const{data:r}=await y.get(`https://pixabay.com/api/?key=42404284-d1db8811507a6ab98b0e3f497&q=${l}&image_type=photo&orientation=horizontal&safeSearch=true&page=${a}&per_page=15`),{hits:o,totalHits:i}=r;if(o.length>0){const s=o.map(b).join("");f.innerHTML+=s,new h(`.${m}`).refresh(),a++,window.scrollBy({top:window.innerHeight,behavior:"smooth"}),a*15>=i&&(q(),c(),g("Sorry, there are no more images to load."))}else g("Sorry, there are no more images to load."),c()}catch(r){console.error("Error fetching images:",r),d.error({title:"Error",message:`Error fetching images: ${r.message}`,position:"topRight"})}finally{v()}});
//# sourceMappingURL=commonHelpers.js.map
