/* ==========================================================================
   ADRIANA HORTIFRUTTI — main.js
   Responsável por: menu mobile, header scroll, animações de entrada,
   integração com WhatsApp, Swiper.js, formulário de contato (Table API),
   filtros de portfólio/galeria e lightbox.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------
     1. HEADER: efeito de sombra ao rolar + menu hambúrguer mobile
     ------------------------------------------------------------------ */
  var header = document.querySelector('.site-header');
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-active');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Fecha o menu mobile ao clicar em um link (melhora a navegação)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Fecha o menu com a tecla Escape (acessibilidade / navegação por teclado)
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     2. ANIMAÇÕES DE ENTRADA (fade-up) usando IntersectionObserver
     ------------------------------------------------------------------ */
  var animatedEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && animatedEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    animatedEls.forEach(function (el) { observer.observe(el); });
  } else {
    animatedEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ------------------------------------------------------------------
     3. SWIPER.JS — Depoimentos e Galeria (inicializados se existirem)
     ------------------------------------------------------------------ */
  if (typeof Swiper !== 'undefined') {
    var testimonialsEl = document.querySelector('.testimonials-swiper');
    if (testimonialsEl) {
      new Swiper(testimonialsEl, {
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        spaceBetween: 24,
        pagination: { el: '.testimonials-swiper .swiper-pagination', clickable: true },
        navigation: {
          nextEl: '.testimonials-swiper .swiper-button-next',
          prevEl: '.testimonials-swiper .swiper-button-prev'
        },
        slidesPerView: 1,
        breakpoints: {
          768: { slidesPerView: 2 },
          1100: { slidesPerView: 3 }
        }
      });
    }

    var galleryEl = document.querySelector('.gallery-swiper');
    if (galleryEl) {
      new Swiper(galleryEl, {
        loop: true,
        spaceBetween: 20,
        pagination: { el: '.gallery-swiper .swiper-pagination', clickable: true },
        navigation: {
          nextEl: '.gallery-swiper .swiper-button-next',
          prevEl: '.gallery-swiper .swiper-button-prev'
        },
        slidesPerView: 1.15,
        breakpoints: {
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 }
        }
      });
    }

    var productsEl = document.querySelector('.products-swiper');
    if (productsEl) {
      new Swiper(productsEl, {
        loop: true,
        spaceBetween: 20,
        pagination: { el: '.products-swiper .swiper-pagination', clickable: true },
        navigation: {
          nextEl: '.products-swiper .swiper-button-next',
          prevEl: '.products-swiper .swiper-button-prev'
        },
        slidesPerView: 1.1,
        breakpoints: {
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 4 }
        }
      });
    }
  }

  /* ------------------------------------------------------------------
     4. FILTROS de Portfólio / Galeria
     ------------------------------------------------------------------ */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var filterItems = document.querySelectorAll('[data-category]');
  if (filterButtons.length && filterItems.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        var filter = btn.getAttribute('data-filter');
        filterItems.forEach(function (item) {
          var show = filter === 'all' || item.getAttribute('data-category') === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     5. LIGHTBOX simples para Galeria
     ------------------------------------------------------------------ */
  var lightbox = document.querySelector('.lightbox-overlay');
  if (lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    var lightboxCaption = lightbox.querySelector('.lightbox-caption');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach(function (img) {
      img.addEventListener('click', function () {
        lightboxImg.src = img.getAttribute('src');
        lightboxImg.alt = img.getAttribute('alt') || '';
        lightboxCaption.textContent = img.getAttribute('alt') || '';
        lightbox.classList.add('is-open');
        closeBtn.focus();
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightboxImg.src = '';
    }
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
  }

  /* ------------------------------------------------------------------
     6. FORMULÁRIO DE CONTATO / PEDIDO — usa a RESTful Table API
     ------------------------------------------------------------------ */
  var contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    var feedbackEl = contactForm.querySelector('.form-feedback');

    function showFeedback(type, message) {
      feedbackEl.className = 'form-feedback is-' + type;
      feedbackEl.textContent = message;
    }

    function validateField(field) {
      var errorEl = field.parentElement.querySelector('.field-error');
      var isValid = field.checkValidity();
      if (errorEl) {
        errorEl.classList.toggle('is-visible', !isValid);
      }
      field.classList.toggle('is-invalid', !isValid);
      return isValid;
    }

    contactForm.querySelectorAll('.form-control[required]').forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var requiredFields = contactForm.querySelectorAll('.form-control[required]');
      var allValid = true;
      requiredFields.forEach(function (field) {
        if (!validateField(field)) allValid = false;
      });

      if (!allValid) {
        showFeedback('error', 'Por favor, corrija os campos destacados antes de enviar.');
        return;
      }

      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando...';
      showFeedback('loading', 'Enviando sua solicitação, aguarde um instante...');

      var payload = {
        nome: contactForm.querySelector('#nome').value.trim(),
        telefone: contactForm.querySelector('#telefone').value.trim(),
        email: contactForm.querySelector('#email') ? contactForm.querySelector('#email').value.trim() : '',
        bairro: contactForm.querySelector('#bairro') ? contactForm.querySelector('#bairro').value.trim() : '',
        tipo_solicitacao: contactForm.querySelector('#tipo_solicitacao') ? contactForm.querySelector('#tipo_solicitacao').value : 'Dúvida',
        mensagem: contactForm.querySelector('#mensagem').value.trim(),
        status: 'novo'
      };

      fetch('tables/pedidos_contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Falha ao enviar');
          return response.json();
        })
        .then(function () {
          showFeedback('success', 'Recebemos sua solicitação! Em breve a Adriana Hortifrutti entrará em contato. Você também pode falar agora pelo WhatsApp usando o botão verde.');
          contactForm.reset();
        })
        .catch(function () {
          showFeedback('error', 'Não foi possível enviar agora. Tente novamente ou fale diretamente pelo WhatsApp.');
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        });
    });
  }

  /* ------------------------------------------------------------------
     7. Ano atual no rodapé
     ------------------------------------------------------------------ */
  var yearEl = document.querySelector('#current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
