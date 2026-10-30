(() => {
 const button=document.querySelector('.keep-card'),help=document.querySelector('.install-help');
 if(!button||!help)return;
 let installPrompt;
 const ios=/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
 const share='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3m-4 4 4-4 4 4M7 10H4v11h16V10h-3"/></svg>';
 function guideLabel(){button.textContent='How to add to Home Screen';}
 guideLabel();
 help.innerHTML='<span class="install-guide-label">QUICK GUIDE</span><div class="install-guide-steps">'+(ios?'<span class="install-guide-step">'+share+'<span>Tap Share</span></span><span class="install-separator" aria-hidden="true">/</span><span>Add to Home Screen</span><span class="install-separator" aria-hidden="true">/</span><strong>Add</strong>':'<span>Open browser menu</span><span class="install-separator" aria-hidden="true">/</span><span>Add to Home Screen</span>')+'</div>';
 if(matchMedia('(display-mode: standalone)').matches||navigator.standalone)button.hidden=true;
 window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;button.textContent='Add to Home Screen';help.hidden=true;button.setAttribute('aria-expanded','false');});
 window.addEventListener('appinstalled',()=>{button.hidden=true;help.hidden=true;installPrompt=null;});
 button.addEventListener('click',async()=>{if(installPrompt){const event=installPrompt;installPrompt=null;try{await event.prompt();}finally{guideLabel();}}else{help.hidden=!help.hidden;button.setAttribute('aria-expanded',String(!help.hidden));}});
 if('serviceWorker' in navigator)navigator.serviceWorker.register('./card-sw.js').catch(()=>{});
})();