import{i as l,S as u}from"./assets/vendor-5b791d57.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const m="gallery-link",f="https://pixabay.com/api/";async function g(a){const r=`?${new URLSearchParams({key:"42404284-d1db8811507a6ab98b0e3f497",q:a,image_type:"photo",orientation:"horizontal",safeSearch:!0})}`,o=f+r;try{const e=await fetch(o);if(!e.ok)throw new Error("Failed to fetch images");return await e.json()}catch(e){throw l.error({title:"Error",message:`Error fetching images: ${e}`,position:"topRight"}),e}}function d({largeImageURL:a,tags:s,webformatURL:r,likes:o,views:e,comments:t,downloads:i}){return`
    <a href="${a}" class="${m}">
      <figure>
        <img src="${r}" alt="${s}" class="gallery-image">
        <figcaption class="gallery__figcaption">
          <div class="image-item">Likes <span class="image-elem">${o}</span></div>
          <div class="image-item">Views <span class="image-elem">${e}</span></div>
          <div class="image-item">Comments <span class="image-elem">${t}</span></div>
          <div class="image-item">Downloads <span class="image-elem">${i}</span></div>
        </figcaption>
      </figure>
    </a>
  `}const p=document.querySelector("#gallery"),n=document.querySelector(".search-form"),c=document.querySelector(".loader"),y=document.querySelector(".no-results-message");n.addEventListener("submit",async function(a){a.preventDefault();const s=a.target.elements.query.value;if(s!==""){c.style.display="block";try{const{hits:r}=await g(s);if(r.length>0){const o=r.map(d).join("");p.innerHTML=o,new u(`.${m}`).refresh()}else y.style.display="block"}catch(r){console.error("Error fetching images:",r),l.error({title:"Error",message:`Error fetching images: ${r.message}`,position:"topRight"})}finally{c.style.display="none",n.reset()}}});
//# sourceMappingURL=commonHelpers.js.map
