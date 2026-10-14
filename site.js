// FV案の切替（制作確認用）とスクロール表示
(function(){
  var d=document,root=d.documentElement;root.classList.add('js');
  var FV=['fv-s1','fv-s3','fv-s4'];
  function setFv(v){
    if(FV.indexOf(v)<0)v='fv-s1';
    FV.forEach(function(c){d.body.classList.toggle(c,c===v);});
    d.querySelectorAll('[data-fv]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.fv===v));});
  }
  var saved=null;try{saved=sessionStorage.getItem('akazawa-fv2');}catch(e){}
  var q=location.search.match(/fv=([a-z0-9-]+)/);if(q)saved=q[1];
  setFv(saved||'fv-s1');
  d.querySelectorAll('[data-fv]').forEach(function(b){b.addEventListener('click',function(){setFv(b.dataset.fv);try{sessionStorage.setItem('akazawa-fv2',b.dataset.fv);}catch(e){}});});

  // 受付準備中のボタンは押しても移動しない
  d.querySelectorAll('[aria-disabled=true]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();});});

  var items=d.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){items.forEach(function(el){el.classList.add('on');});return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});
  items.forEach(function(el){io.observe(el);});
  // 念のため：読み込み3秒後に画面内で消えたままのものを出す
  setTimeout(function(){items.forEach(function(el){var r=el.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)el.classList.add('on');});},3000);
})();
