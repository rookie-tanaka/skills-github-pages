gsap.registerPlugin(ScrollTrigger);
//https://web-camp.io/magazine/archives/91511/より
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
//要素を取得
const modal = document.querySelector('.js-modal'),
      open = document.querySelector('.js-modal-open'),
      close = document.querySelector('.js-modal-close');

//「開くボタン」をクリックしてモーダルを開く
function modalOpen() {
  modal.classList.add('is-active');
}
open.addEventListener('click', modalOpen);

//「閉じるボタン」をクリックしてモーダルを閉じる
function modalClose() {
  modal.classList.remove('is-active');
}
close.addEventListener('click', modalClose);

//「モーダルの外側」をクリックしてモーダルを閉じる
function modalOut(e) {
  if (e.target == modal) {
    modal.classList.remove('is-active');
  }
}
addEventListener('click', modalOut);
document.addEventListener('DOMContentLoaded', () => {
  const h2About = document.querySelector('#about h2');
  gsap.fromTo(h2About, {y: 150, opacity: 0},{
    duration:1,
    opacity: 1,
    ease: "power4.out",
    y: 0,
    scrollTrigger: {
      trigger: 'h2',
      start: 'top 80%',
      end: 'top 30%',
      once: false,
    }
    });
    const h2Work = document.querySelector('#work h2');
    gsap.fromTo(h2Work, {y: 150, opacity: 0},{
      duration:1,
      opacity: 1,
      ease: "power4.out",
      y: 0,
      scrollTrigger: {
        trigger: '#work h2',
        start: 'top 80%',
        end: 'top 30%',
        once: false,
      }
      });
  });