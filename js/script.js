gsap.registerPlugin(ScrollTrigger);

const cardContainer = document.querySelector('.card-container');
const card = document.querySelector('.card');
let isFlipped = false;

// マウスの動きでボックスを傾ける関数
function tiltCard(e) {
    // ボックスの位置を取得
    const rect = cardContainer.getBoundingClientRect();
    const cardX = rect.left + rect.width / 2;
    const cardY = rect.top + rect.height / 2;
    
    // マウスの位置からボックスまでの距離を計算
    const mouseX = e.clientX - cardX;
    const mouseY = e.clientY - cardY;
    
    // 傾く角度を計算（距離に応じて調整）
    // 画面の端まで15度で傾くように計算
    const tiltX = -(mouseY / window.innerHeight * 30);
    const tiltY = (mouseX / window.innerWidth * 30);
    
    // ボックスに角度を適用
    gsap.to(card, {
        rotationX: tiltX,
        rotationY: isFlipped ? tiltY + 180 : tiltY,
        duration: 0.5,
        
    });
}

// クリックでボックスをひっくり返す関数
function flipCard() {
    isFlipped = !isFlipped;
    
    gsap.to(card, {
        rotationY: isFlipped ? 180 : 0,
        duration: 1.2,
        ease: "back.out(1.5)"
    });
}

// イベントリスナーを設定
window.addEventListener('mousemove', tiltCard);
cardContainer.addEventListener('click', flipCard);

// タッチデバイス対応
window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        tiltCard(e.touches[0]);
    }
}, { passive: true });

// 初期表示時のアニメーション
gsap.fromTo(card, 
    { rotationX: -20, rotationY: 10, scale: 0.8, opacity: 0 },
    { rotationX: 0, rotationY: 0, scale: 1, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" }
);
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

    class InertiaScroll {
      constructor() {
        // DOM要素
        this.container = document.querySelector('.scroll-container');
        this.content = document.querySelector('.scroll-content');
        
        // スクロール関連の変数
        this.scrollHeight = 0;
        this.windowHeight = 0;
        this.maxScrollY = 0;
        
        // 現在位置と目標位置
        this.currentY = 0;
        this.targetY = 0;
        
        // イナーシャ効果のパラメータ
        this.ease = 0.1; // 小さいほど滑らかで遅い
        
        // イベントリスナーのバインド
        this.onResize = this.onResize.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.update = this.update.bind(this);
        
        // 初期化
        this.init();
      }
      
      init() {
        // サイズの設定
        this.onResize();
        
        // イベントリスナーの設定
        window.addEventListener('resize', this.onResize);
        this.container.addEventListener('wheel', this.onWheel);
        this.container.addEventListener('touchstart', this.onTouchStart);
        this.container.addEventListener('touchmove', this.onTouchMove);
        
        // アニメーションループの開始
        this.update();
      }
      
      onResize() {
        // コンテンツの高さを計算
        this.scrollHeight = this.content.scrollHeight;
        this.windowHeight = window.innerHeight;
        this.maxScrollY = this.scrollHeight - this.windowHeight;
      }
      
      onWheel(e) {
        // デフォルトのスクロール動作を防止
        e.preventDefault();
        
        // ターゲット位置を更新（ホイールの移動量を加算）
        this.targetY += e.deltaY * 1.5; // 係数で感度調整可能
        
        // 範囲を制限
        this.targetY = Math.max(0, Math.min(this.targetY, this.maxScrollY));
      }
      
      // タッチ関連の変数
      touchStartY = 0;
      lastTouchY = 0;
      
      onTouchStart(e) {
        // タッチ開始位置を記録
        this.touchStartY = e.touches[0].clientY;
        this.lastTouchY = this.touchStartY;
      }
      
      onTouchMove(e) {
        // デフォルトのスクロール動作を防止
        e.preventDefault();
        
        // 現在のタッチ位置
        const currentTouchY = e.touches[0].clientY;
        
        // 前回のタッチ位置との差分を計算
        const deltaY = this.lastTouchY - currentTouchY;
        
        // ターゲット位置を更新
        this.targetY += deltaY * 2; // 係数で感度調整可能
        
        // 範囲を制限
        this.targetY = Math.max(0, Math.min(this.targetY, this.maxScrollY));
        
        // 前回のタッチ位置を更新
        this.lastTouchY = currentTouchY;
      }
      
      update() {
        // 現在位置をターゲット位置に徐々に近づける（イナーシャ効果）
        this.currentY += (this.targetY - this.currentY) * this.ease;
        
        // 小さすぎる変化は四捨五入して停止させる（パフォーマンス向上）
        if (Math.abs(this.targetY - this.currentY) < 0.1) {
          this.currentY = this.targetY;
        }
        
        // transformでY位置を設定
        this.content.style.transform = `translateY(${-this.currentY}px)`;
        
        // 次のフレームで再度実行
        requestAnimationFrame(this.update);
      }
    }
addEventListener('click', modalOut);
document.addEventListener('DOMContentLoaded', () => {
  new InertiaScroll();

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

