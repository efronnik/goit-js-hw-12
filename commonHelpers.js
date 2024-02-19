import{a as c,S as u,i as m}from"./assets/vendor-64b55ca9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const d="gallery-link";function g({largeImageURL:i,tags:t,webformatURL:r,likes:o,views:e,comments:s,downloads:a}){return`
    <a href="${i}" class="${d}">
      <figure>
        <img src="${r}" alt="${t}" class="gallery-image">
        <figcaption class="gallery__figcaption">
          <div class="image-item">Likes <span class="image-elem">${o}</span></div>
          <div class="image-item">Views <span class="image-elem">${e}</span></div>
          <div class="image-item">Comments <span class="image-elem">${s}</span></div>
          <div class="image-item">Downloads <span class="image-elem">${a}</span></div>
        </figcaption>
      </figure>
    </a>
  `}const f=document.querySelector("#gallery"),n=document.querySelector(".search-form"),l=document.querySelector(".loader"),p=document.querySelector(".no-results-message");n.addEventListener("submit",async function(i){i.preventDefault();const t=i.target.elements.query.value;if(t!==""){l.style.display="block";try{const r=await c.get(`https://api.unsplash.com/search/photos?query=${t}&client_id=42404284-d1db8811507a6ab98b0e3f497`),{results:o}=r.data;if(o.length>0){const e=o.map(g).join("");f.innerHTML=e,new u(`.${GALLERY_LINK}`).refresh()}else p.style.display="block"}catch(r){console.error("Error fetching images:",r),m.error({title:"Error",message:`Error fetching images: ${r.message}`,position:"topRight"})}finally{l.style.display="none",n.reset()}}});
//# sourceMappingURL=commonHelpers.js.map
