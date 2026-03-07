
  const cur=document.getElementById('cur');
  document.addEventListener('mousemove',e=>{cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px'});
  document.querySelectorAll('a,button').forEach(el=>{
    el.addEventListener('mouseenter',()=>cur.classList.add('big'));
    el.addEventListener('mouseleave',()=>cur.classList.remove('big'));
  });
  const nav=document.getElementById('nav');
  window.addEventListener('scroll',()=>nav.classList.toggle('on',scrollY>40));
  const obs=new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){e.target.style.transitionDelay=(i*.05)+'s';e.target.classList.add('on');obs.unobserve(e.target)}
    });
  },{threshold:.08});
  document.querySelectorAll('.rev').forEach(el=>obs.observe(el));