const menuToggle=document.querySelector('.menu-toggle');
const navLinks=document.querySelector('.nav-links');
menuToggle.addEventListener('click',()=>navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
document.getElementById('contactForm').addEventListener('submit',e=>{e.preventDefault();alert('Thank you! Your message has been prepared successfully.');e.target.reset();});
document.getElementById('resumeBtn').addEventListener('click',e=>{e.preventDefault();alert('Add your CV PDF to this folder and connect its filename to this button.');});
