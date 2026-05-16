import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

document.querySelector('#app').innerHTML = `
  <div class="custom-cursor"></div>
  <div class="cursor-follower"></div>

  <section class="hero-section">
    <header class="top-nav">
      <div class="nav-left">
        <a href="/models.html">All models</a>
        <a href="#">Electric</a>
      </div>
      <div class="nav-center">
        <img src="/images/bmw_logo.webp" alt="BMW Logo" class="bmw-logo" />
      </div>
      <div class="nav-right">
        <a href="/tech.html">Innovation</a>
        <a href="#">more BMW</a>
      </div>
    </header>
    <div class="hero-right">
      <video class="hero-video" autoplay muted loop playsinline>
        <source src="/video/bmw_hero_video.mp4" type="video/mp4" />
      </video>
    </div>
  </section>

  <div class="models-showcase-container">
    <section class="model-card">
      <a href="/models.html?category=SUV" class="model-link">
        <img src="/images/gemini_generated_image_639kn8639kn8639k.webp" class="model-image" />
        <div class="model-overlay">
          <span>Explore SUV Series</span>
        </div>
      </a>
    </section>
    <section class="model-card">
      <a href="/models.html?category=Sedan" class="model-link">
        <img src="/images/gemini_generated_image_dydnledydnledydn.webp" class="model-image" />
        <div class="model-overlay">
          <span>Explore Sedan Series</span>
        </div>
      </a>
    </section>
    <section class="model-card">
      <a href="/models.html?category=Coupe" class="model-link">
        <img src="/images/gemini_generated_image_gj1bk8gj1bk8gj1b.webp" class="model-image" />
        <div class="model-overlay">
          <span>Explore Coupe Series</span>
        </div>
      </a>
    </section>
    <section class="model-card">
      <a href="/models.html?category=Convertible" class="model-link">
        <img src="/images/gemini_generated_image_n2dth1n2dth1n2dt.webp" class="model-image" />
        <div class="model-overlay">
          <span>Explore Convertible Series</span>
        </div>
      </a>
    </section>
  </div>

  <section class="performance-section">
    <h2 class="stat-label">Engineering Excellence</h2>
    <div class="performance-grid">
      <div class="stat-item">
        <div class="stat-number" data-target="3.4">0</div>
        <div class="stat-label">0-100 KM/H (SEC)</div>
      </div>
      <div class="stat-item">
        <div class="stat-number" data-target="510">0</div>
        <div class="stat-label">Maximum HP</div>
      </div>
      <div class="stat-item">
        <div class="stat-number" data-target="290">0</div>
        <div class="stat-label">Top Speed (KM/H)</div>
      </div>
    </div>
    <div class="brand-quote">The Ultimate Driving Machine</div>
  </section>

  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-col">
        <h4>Models</h4>
        <ul>
          <li><a href="/models.html">All Models</a></li>
          <li><a href="#">Electric</a></li>
          <li><a href="#">M Series</a></li>
          <li><a href="#">X Series</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Shopping</h4>
        <ul>
          <li><a href="#">Build Your BMW</a></li>
          <li><a href="#">Search Inventory</a></li>
          <li><a href="#">Special Offers</a></li>
          <li><a href="#">Find a Dealer</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Experience</h4>
        <ul>
          <li><a href="#">BMW M Performance</a></li>
          <li><a href="#">Sustainability</a></li>
          <li><a href="#">Innovation</a></li>
          <li><a href="#">BMW News</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Cookies</a></li>
          <li><a href="#">Terms of Use</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-logo">
        <img src="/images/bmw_logo.webp" alt="BMW" />
        BMW
      </div>
      <div class="copyright">
        © 2026 BMW OF NORTH AMERICA, LLC.
      </div>
      <div class="social-links">
        <a href="#">Instagram</a>
        <a href="#">Twitter</a>
        <a href="#">YouTube</a>
      </div>
    </div>
  </footer>
`;

// Animations
window.addEventListener('load', () => {
  // Cinematic video reveal
  gsap.to('.hero-video', {
    scale: 1,
    opacity: 1,
    duration: 2.5,
    ease: 'power2.out',
    delay: 0.2
  });

  // Performance Counter Animations
  document.querySelectorAll('.stat-number').forEach(stat => {
    const target = parseFloat(stat.getAttribute('data-target'));
    gsap.to(stat, {
      innerHTML: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: stat,
        start: 'top 90%',
        toggleActions: "play none none none"
      },
      onUpdate: function() {
        if (target % 1 !== 0) {
          stat.innerHTML = parseFloat(stat.innerHTML).toFixed(1);
        } else {
          stat.innerHTML = Math.round(stat.innerHTML);
        }
      }
    });
  });

  // Refresh ScrollTrigger after elements are loaded
  ScrollTrigger.refresh();
});

// Custom Cursor Logic
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  if (cursor && follower) {
    gsap.to(cursor, { x: e.clientX - 10, y: e.clientY - 10, duration: 0.1 });
    gsap.to(follower, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.3 });
  }
});

// Hover effects for links
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor && follower) {
      gsap.to(cursor, { scale: 1.5, duration: 0.2 });
      gsap.to(follower, { scale: 2, opacity: 0, duration: 0.2 });
    }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor && follower) {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.2 });
    }
  });
});
