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
if (cardContainer) {
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
}

//https://web-camp.io/magazine/archives/91511/より
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// ★★★ モーダル機能の修正版 ★★★
// すべてのモーダル要素を取得
const modals = document.querySelectorAll('.js-modal');
const openButtons = document.querySelectorAll('.js-modal-open');
const closeButtons = document.querySelectorAll('.js-modal-close');

// 各モーダルペアに対してイベントリスナーを設定
openButtons.forEach((openButton, index) => {
    const modal = modals[index];
    const closeButton = closeButtons[index];
    
    if (modal && closeButton) {
        // 「開くボタン」をクリックしてモーダルを開く
        function modalOpen() {
            modal.classList.add('is-active');
        }
        openButton.addEventListener('click', modalOpen);

        // 「閉じるボタン」をクリックしてモーダルを閉じる
        function modalClose() {
            modal.classList.remove('is-active');
        }
        closeButton.addEventListener('click', modalClose);

        // 「モーダルの外側」をクリックしてモーダルを閉じる
        function modalOut(e) {
            if (e.target === modal) {
                modal.classList.remove('is-active');
            }
        }
        modal.addEventListener('click', modalOut);
    }
});

/**
 * 改良版ホリゾンタルスクロール
 * シームレスなループアニメーション
 */
class SmoothHorizontalScroll {
    constructor(containerSelector, options = {}) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        
        this.scrollContent = this.container.querySelector('.scroll-content');
        
        // 設定
        this.speed = options.speed || 1;
        this.direction = options.direction || 1; // 1: 左へ, -1: 右へ
        this.isPlaying = true;
        
        // アニメーション変数
        this.position = 0;
        this.contentWidth = 0;
        
        this.init();
    }
    
    init() {
        this.setupContent();
        this.calculateDimensions();
        this.startAnimation();
        
        // リサイズ対応
        window.addEventListener('resize', () => {
            this.calculateDimensions();
        });
        
        // ホバーで一時停止
        this.container.addEventListener('mouseenter', () => {
            this.pause();
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.play();
        });
    }
    
    setupContent() {
        // 既存のHTMLの重複コンテンツを利用
        const items = this.scrollContent.children;
        const itemsArray = Array.from(items);
        
        // 3セット分に拡張（シームレスループのため）
        for (let i = 0; i < 2; i++) {
            itemsArray.forEach(item => {
                const clone = item.cloneNode(true);
                this.scrollContent.appendChild(clone);
            });
        }
    }
    
    calculateDimensions() {
        this.contentWidth = this.scrollContent.scrollWidth / 3; // 3セット中の1セット分
    }
    
    startAnimation() {
        const animate = () => {
            if (this.isPlaying) {
                this.position += this.speed * this.direction;
                
                // シームレスループ
                if (this.direction > 0 && this.position >= this.contentWidth) {
                    this.position = 0;
                } else if (this.direction < 0 && this.position <= -this.contentWidth) {
                    this.position = 0;
                }
                
                this.scrollContent.style.transform = `translateX(${-this.position}px)`;
            }
            
            requestAnimationFrame(animate);
        };
        animate();
    }
    
    // 制御メソッド
    play() {
        this.isPlaying = true;
    }
    
    pause() {
        this.isPlaying = false;
    }
    
    toggle() {
        this.isPlaying = !this.isPlaying;
    }
    
    reverse() {
        this.direction *= -1;
    }
    
    setSpeed(speed) {
        this.speed = speed;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // CSSアニメーションを無効化
    const scrollContents = document.querySelectorAll('.scroll-content');
    scrollContents.forEach(content => {
        content.style.animation = 'none';
    });
    
    // 1番目のスクロールコンテナ
    const scroll1 = new SmoothHorizontalScroll('.scroll-container:nth-of-type(1)', {
        speed: 1,
        direction: 1
    });
    
    // 2番目のスクロールコンテナ（逆方向）
    const scroll2 = new SmoothHorizontalScroll('.scroll-container:nth-of-type(2)', {
        speed: 1.2,
        direction: -1
    });
    
    // デバッグ用: グローバルに公開
    window.scrollAnimations = { scroll1, scroll2 };

    const h2About = document.querySelector('#about h2');
    if (h2About) {
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
    }
    
    const h2Work = document.querySelector('#work h2');
    if (h2Work) {
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
    }
});