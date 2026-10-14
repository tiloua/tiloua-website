const lightbox = document.querySelector('#lightbox');
if (lightbox) {
 document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
  const img = lightbox.querySelector('img');
  img.src = button.dataset.image;
  img.alt = button.querySelector('img').alt;
  lightbox.querySelector('p').textContent = button.dataset.caption;
  lightbox.showModal();
 }));
 lightbox.querySelector('.close-dialog').addEventListener('click', () => lightbox.close());
 lightbox.addEventListener('click', event => { if (event.target === lightbox) { const r=lightbox.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) lightbox.close(); }});
}
