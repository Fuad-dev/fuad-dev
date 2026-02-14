(function() {
  // loader
  window.addEventListener('load', function() {
    document.getElementById('loader').classList.add('fade-out');
  });

  // custom cursor
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
  });

  // typing animation (SWE Undergrad, Content Creator)
  const typingElement = document.getElementById('typing-text');
  const roles = ['SWE Undergrad', 'Content Creator'];
  let roleIndex = 0, charIndex = 0, isDeleting = false;
  function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex--);
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex++);
    }
    if (!isDeleting && charIndex === currentRole.length) { isDeleting = true; setTimeout(typeEffect, 1500); }
    else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeEffect, 300); }
    else { setTimeout(typeEffect, isDeleting ? 50 : 100); }
  }
  typeEffect();

  // scroll progress & back to top
  const progressBar = document.getElementById('progressBar');
  const backTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
    if (scrollTop > 500) backTop.classList.add('show'); else backTop.classList.remove('show');
  });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  reveals.forEach(el => observer.observe(el));

  // theme toggle
  const toggle = document.getElementById('themeToggle');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    toggle.textContent = document.body.classList.contains('light-theme') ? '🌙 Dark' : '🌓 Light';
  });

  // form validation
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name === '' || message === '' || !emailRegex.test(email)) {
      alert('Please fill all fields with valid email.');
      return;
    }
    successMsg.style.display = 'block';
    form.reset();
    setTimeout(() => successMsg.style.display = 'none', 4000);
  });

  // initial theme toggle text (if body has light-theme class, set correctly)
  if (document.body.classList.contains('light-theme')) {
    document.getElementById('themeToggle').innerHTML = '🌙 Dark';
  } else {
    document.getElementById('themeToggle').innerHTML = '🌓 Light';
  }
})();