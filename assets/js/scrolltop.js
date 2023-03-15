const THRESHOLD = 50;
const top = document.querySelector(".back-to-top");
const count = document.querySelector("#scrollpercent>span");

window.addEventListener('scroll', function () {
  if (!top) {
    return;
  }

  if (window.pageYOffset > THRESHOLD) {
    top.classList.add('back-to-top-on');
  } else {
    top.classList.remove('back-to-top-on');
  }

  var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';

  count.innerHTML = Math.round((h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100);
});

top.addEventListener('click', function () {
  window.scrollTo({top: 0, behavior: 'smooth'});
});