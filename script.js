// MOBILE NAVIGATION
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.site-nav ul');
if(navToggle && navList){
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('active');
    navToggle.classList.toggle('active');
    if(!expanded) navList.querySelector('a')?.focus();
  });
  // Close mobile menu on link click
  navList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click',()=>{
      navList.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded','false');
    });
  });
}

// SMOOTH SCROLL (with focus for accessibility)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.length > 1 && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        document.querySelector(href).focus({ preventScroll: true });
      }, 450);
    }
  });
});

// SCROLL-TRIGGERED FADE-IN ANIMATION
const animateEls = document.querySelectorAll('.animate-fade-up');
const io = new IntersectionObserver((entries,observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{ threshold: 0.16 });
animateEls.forEach(el => io.observe(el));

// FAQ ACCORDION
const faqQs = document.querySelectorAll('.faq-q');
faqQs.forEach(btn => {
  btn.addEventListener('click', function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    const ans = document.getElementById(this.getAttribute('aria-controls'));
    if(ans) {
      if(expanded) {
        ans.setAttribute('hidden','');
      } else {
        ans.removeAttribute('hidden');
      }
    }
    // close others
    faqQs.forEach(o=>{
      if(o!==this){
        o.setAttribute('aria-expanded','false');
        const a = document.getElementById(o.getAttribute('aria-controls'));
        if(a) a.setAttribute('hidden','');
      }
    });
  });
});

// Simple contact form feedback (no backend)
document.querySelectorAll('.contact-form').forEach(form=>{
  form.addEventListener('submit',function(e){
    e.preventDefault();
    form.reset();
    const msg=form.querySelector('.form-success');
    msg.hidden=false;
    setTimeout(()=>{msg.hidden=true;}, 4200);
  });
});

// Visible keyboard focus for tab navigation (css handled)
document.body.addEventListener('keyup', e => {
  if(e.key === 'Tab') document.body.classList.add('show-focus-outline');
});
document.body.addEventListener('mousedown', e => {
  document.body.classList.remove('show-focus-outline');
});