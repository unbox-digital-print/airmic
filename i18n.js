'use strict';
(() => {
  const supported = ['de', 'en', 'fr', 'es'];
  const storageKey = 'airmic-site-language';
  const dictionary = window.AIRMIC_TRANSLATIONS;
  const assets = new URL('assets/', document.currentScript.src);
  const texts = [], attributes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (node.parentElement.closest('script,style,svg,[data-no-i18n],#demo-state,#mute,#support-status')) continue;
    const source = node.nodeValue.trim();
    if (dictionary[source]) texts.push({node, source, leading:node.nodeValue.match(/^\s*/)[0], trailing:node.nodeValue.match(/\s*$/)[0]});
  }
  document.querySelectorAll('[aria-label],img[alt]').forEach(element => {
    if (element.closest('[data-no-i18n]')) return;
    for (const attribute of ['aria-label', 'alt']) {
      const source = element.getAttribute(attribute);
      if (source && dictionary[source]) attributes.push({element,attribute,source});
    }
  });
  let language = 'de';
  const title = document.title;
  const metadata = [...document.querySelectorAll('meta[name="description"],meta[property="og:description"],meta[property="og:title"]')].map(element=>({element,source:element.content}));
  function t(source) { return language === 'de' ? source : dictionary[source]?.[supported.indexOf(language)-1] ?? source; }
  function normalize(value) { return String(value || '').toLowerCase().split(/[-_]/)[0]; }
  function updateLinks() {
    // Keep the selected language between HTML pages; binary downloads stay untouched.
    document.querySelectorAll('a[href]').forEach(link=>{
      const url = new URL(link.getAttribute('href'),location.href);
      if (url.origin !== location.origin || !url.pathname.startsWith(assets.pathname.slice(0,-7))) return;
      if (!(url.pathname.endsWith('.html') || url.pathname.endsWith('/'))) return;
      if (url.pathname === location.pathname && url.hash) return;
      url.searchParams.set('lang',language);
      link.href = url.href;
    });
  }
  function setLanguage(next, remember = false) {
    if (!supported.includes(next)) return;
    language = next;
    document.documentElement.lang = next;
    texts.forEach(({node,source,leading,trailing})=>{node.nodeValue=leading+t(source)+trailing;});
    attributes.forEach(({element,attribute,source})=>element.setAttribute(attribute,t(source)));
    document.title = t(title);
    metadata.forEach(({element,source})=>{element.content=t(source);});
    document.querySelector('#language-code').textContent=next.toUpperCase();
    document.querySelector('#language-flag').src=new URL(`flags/${next}.svg`,assets).href;
    document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===next)));
    document.querySelector('.language-menu').open=false;
    if (remember) {
      try { localStorage.setItem(storageKey,next); } catch { /* Language selection also works without storage. */ }
      const url=new URL(location.href);url.searchParams.set('lang',next);history.replaceState(null,'',url);
    }
    updateLinks();
    document.dispatchEvent(new CustomEvent('languagechange',{detail:next}));
  }
  window.SiteLanguage={t,set:setLanguage,get:()=>language};
  const requested=normalize(new URL(location.href).searchParams.get('lang'));
  let saved;try{saved=localStorage.getItem(storageKey);}catch{ /* Optional browser storage. */ }
  const detected=(navigator.languages || [navigator.language]).map(normalize).find(code=>supported.includes(code));
  setLanguage(supported.includes(requested)?requested:supported.includes(saved)?saved:detected || 'en');
  document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.language,true)));
  document.addEventListener('click',event=>{if(!event.target.closest('.language-menu'))document.querySelector('.language-menu').open=false;});
  document.querySelector('.language-menu').addEventListener('keydown',event=>{if(event.key==='Escape'){event.currentTarget.open=false;event.currentTarget.querySelector('summary').focus();}});
})();
