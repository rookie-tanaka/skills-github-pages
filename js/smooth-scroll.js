/**
 * 改良版スクロールコンテナ
 * 既存のHTMLに対応したシームレススクロール
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

// 使用方法
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
});

/**
 * GSAP版のより高度なスクロールアニメーション
 * GSAPを使った場合の例
 */
function initGSAPScroll() {
    const containers = document.querySelectorAll('.scroll-container');
    
    containers.forEach((container, index) => {
        const content = container.querySelector('.scroll-content');
        const direction = index % 2 === 0 ? 1 : -1;
        
        // GSAPタイムライン
        const tl = gsap.timeline({ repeat: -1, ease: "none" });
        
        tl.to(content, {
            x: direction * -content.scrollWidth / 3,
            duration: 20,
            ease: "none",
            onComplete: () => {
                gsap.set(content, { x: 0 });
            }
        });
        
        // ホバーエフェクト
        container.addEventListener('mouseenter', () => {
            tl.pause();
        });
        
        container.addEventListener('mouseleave', () => {
            tl.play();
        });
    });
}