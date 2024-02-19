import{a as m,S as d,i as u}from"./assets/vendor-64b55ca9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const c="gallery-link";function g({largeImageURL:a,tags:r,webformatURL:s,likes:i,views:e,comments:t,downloads:o}){return`
    <a href="${a}" class="${c}">
      <figure>
        <img src="${s}" alt="${r}" class="gallery-image">
        <figcaption class="gallery__figcaption">
          <div class="image-item">Likes <span class="image-elem">${i}</span></div>
          <div class="image-item">Views <span class="image-elem">${e}</span></div>
          <div class="image-item">Comments <span class="image-elem">${t}</span></div>
          <div class="image-item">Downloads <span class="image-elem">${o}</span></div>
        </figcaption>
      </figure>
    </a>
  `}const f=document.querySelector("#gallery"),n=document.querySelector(".search-form"),l=document.querySelector(".loader"),p=document.querySelector(".no-results-message");n.addEventListener("submit",async function(a){a.preventDefault();const r=a.target.elements.query.value;if(r!==""){l.style.display="block";try{const s=await m.get(`https://pixabay.com/api/?key=42404284-d1db8811507a6ab98b0e3f497&q=${r}`);if(s.data.hits&&Array.isArray(s.data.hits)&&s.data.hits.length>0){const i=s.data.hits.map(g).join("");f.innerHTML=i,new d(`.${c}`).refresh()}else p.style.display="block"}catch(s){console.error("Error fetching images:",s),u.error({title:"Error",message:`Error fetching images: ${s.message}`,position:"topRight"})}finally{l.style.display="none",n.reset()}}});
//# sourceMappingURL=commonHelpers.js.map
