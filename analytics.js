(() => {
 'use strict';
 const id = window.TILOUA_ANALYTICS_ID;
 if (!/^G-[A-Z0-9]+$/.test(id || '')) return;
 const key = 'tiloua.analytics-consent.v1';
 const maxAge = 180 * 24 * 60 * 60 * 1000;
 const privacy = new URL('privacy.html', document.querySelector('script[src*="analytics.js"]').src).href;
 let loaded = false;
 let choice = null;
 try { const saved = JSON.parse(localStorage.getItem(key)); if (saved && Date.now() - saved.time < maxAge && ['accepted','rejected'].includes(saved.value)) choice=saved.value; } catch {}
 const banner = document.createElement('section');
 banner.className = 'consent-banner'; banner.hidden = true;
 banner.setAttribute('role','region'); banner.setAttribute('aria-label','Analytics cookie choices');
 banner.innerHTML = `<h2>A little choice about cookies</h2><p>May we use Google Analytics to understand how our website is used? Analytics is optional. You can change your choice at any time. <a href="${privacy}">Privacy & cookies</a></p><div class="consent-actions"><button type="button" data-choice="rejected">Reject analytics</button><button type="button" data-choice="accepted">Accept analytics</button></div>`;
 document.body.append(banner);
 const status=document.querySelector('[data-analytics-status]');
 if(status) status.textContent='Google Analytics is available on this website, and loads only if you accept analytics cookies.';
 function enable() {
  window['ga-disable-'+id]=false;
  if(loaded) return;
  loaded=true; window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments);};
  window.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  window.gtag('js',new Date());
  window.gtag('config',id,{allow_google_signals:false,allow_ad_personalization_signals:false,cookie_expires:31536000,cookie_update:false,page_location:location.origin+location.pathname,page_referrer:document.referrer.split('?')[0].split('#')[0]});
  const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);document.head.append(script);
 }
 function clearCookies() {
  const names=document.cookie.split(';').map(c=>c.trim().split('=')[0]).filter(n=>n==='_ga'||n.startsWith('_ga_'));
  const host=location.hostname.split('.');const domains=[''];for(let i=0;i<host.length-1;i++) domains.push(host.slice(i).join('.'),'.'+host.slice(i).join('.'));
  for(const name of names) for(const domain of domains) document.cookie=name+'=; Max-Age=0; path=/'+(domain?'; domain='+domain:'');
 }
 const settings=[...document.querySelectorAll('.cookie-settings')];
 settings.forEach(button=>{button.hidden=false;button.addEventListener('click',()=>{banner.hidden=false;banner.querySelector('button').focus({preventScroll:true});});});
 banner.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>{
  choice=button.dataset.choice;
  try{localStorage.setItem(key,JSON.stringify({value:choice,time:Date.now()}));}catch{}
  if(choice==='accepted') enable();
  else {window['ga-disable-'+id]=true;clearCookies();if(loaded){location.reload();return;}}
  banner.hidden=true;settings[0]?.focus({preventScroll:true});
 }));
 if(choice==='accepted') enable(); else {window['ga-disable-'+id]=true;clearCookies();if(!choice) banner.hidden=false;}
})();
