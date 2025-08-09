// --- Header scroll logic ---
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// --- Menu toggle & footer year ---
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("nav-active");
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
      });
    });
  }

  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// --- Spotify embed preloader ---
function preloadSpotifyEmbeds() {
  const placeholders = document.querySelectorAll('.spotify-placeholder');

  placeholders.forEach((placeholder) => {
    const url = placeholder.getAttribute('data-spotify-url');
    if (!url) return;

    const wrapper = placeholder.closest('.spotify-embed-wrapper');
    if (!wrapper) return;

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.className = 'spotify-embed preloaded';
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '80');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
    iframe.setAttribute('loading', 'lazy');

    let iframeError = false;
    iframe.addEventListener('error', () => {
      iframeError = true;
    });

    document.body.appendChild(iframe);

    placeholder.addEventListener('click', () => {
      wrapper.innerHTML = '';

      if (iframeError) {
        const fallbackLink = document.createElement('a');
        fallbackLink.href = url;
        fallbackLink.textContent = 'Listen on Spotify';
        fallbackLink.className = 'button-link';
        fallbackLink.target = '_blank';
        wrapper.appendChild(fallbackLink);
      } else {
        iframe.classList.remove('preloaded');
        iframe.classList.add('fade-in');
        wrapper.appendChild(iframe);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(preloadSpotifyEmbeds);
  } else {
    window.addEventListener('load', preloadSpotifyEmbeds);
  }
});
