document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const closeMenu = (restoreFocus = false) => {
  toggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
  if (restoreFocus) toggle.focus();
};
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
matchMedia('(min-width:701px)').addEventListener('change', () => closeMenu());
