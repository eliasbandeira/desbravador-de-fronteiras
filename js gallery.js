// js/gallery.js — filtros e lightbox (YouTube + local MP4)
document.addEventListener('DOMContentLoaded', function () {
  const filters = document.querySelectorAll('.filter-btn');
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const backdrop = document.getElementById('lightbox-backdrop');
  const lbMedia = document.getElementById('lightbox-media');
  const lbTitle = document.getElementById('lightbox-title');
  const lbDesc = document.getElementById('lightbox-desc');
  const lbClose = document.getElementById('lightbox-close');

  // FILTROS
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.dataset.filter;
      items.forEach(item => {
        if (type === 'all' || item.classList.contains(type)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ABRIR LIGHTBOX
  items.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
  });

  function openLightbox(item) {
    const kind = item.dataset.kind; // 'photo' or 'video'
    const title = item.dataset.title || '';
    const desc = item.dataset.description || '';
    lbMedia.innerHTML = '';

    if (kind === 'photo') {
      const img = document.createElement('img');
      img.src = item.dataset.full || item.querySelector('img').src;
      img.alt = title;
      lbMedia.appendChild(img);
    } else if (kind === 'video') {
      const vtype = item.dataset.videoType || 'youtube'; // youtube or local
      if (vtype === 'youtube') {
        const id = item.dataset.videoId;
        const iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.src = `https://www.youtube.com/embed/${id}?rel=0&showinfo=0&autoplay=1`;
        iframe.frameBorder = '0';
        iframe.allow = 'autoplay; encrypted-media';
        lbMedia.appendChild(iframe);
      } else {
        const video = document.createElement('video');
        video.src = item.dataset.videoSrc;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        lbMedia.appendChild(video);
      }
    }

    lbTitle.textContent = title;
    lbDesc.textContent = desc;
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // FECHAR LIGHTBOX
  function closeLightbox() {
    backdrop.classList.remove('open');
    lbMedia.innerHTML = '';
    lbTitle.textContent = '';
    lbDesc.textContent = '';
    document.body.style.overflow = '';
  }

  lbClose.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeLightbox();
  });

  // keyboard ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeLightbox();
    }
  });
});
