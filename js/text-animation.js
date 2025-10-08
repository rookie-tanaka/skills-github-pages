/**
 * 効率的なテキストアニメーション実装
 * 既存のHTMLを自動的に一文字ずつspanで分割し、CSS変数で遅延を制御
 */

class TextAnimationManager {
    constructor() {
        this.animations = new Map();
        this.observedElements = new Set();
    }

    /**
     * テキストアニメーションをセットアップ
     * @param {string} selector - 対象要素のセレクター
     * @param {Object} options - アニメーション設定
     */
    setupAnimation(selector, options = {}) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            this.processElement(element, options);
        });
    }

    /**
     * 単一要素を処理
     * @param {HTMLElement} element - 対象要素
     * @param {Object} options - アニメーション設定
     */
    processElement(element, options = {}) {
        const text = element.textContent.trim();
        const {
            stagger = 0.1,        // 文字間の遅延（秒）
            animation = 'wave',   // アニメーション名
            duration = 2,         // アニメーション時間（秒）
            preserveSpaces = true // スペースを保持するか
        } = options;

        // 既存のspanがある場合は一旦削除
        if (element.querySelector('span')) {
            element.textContent = text;
        }

        // 文字を分割してspanで包む
        const chars = text.split('');
        element.innerHTML = chars.map((char, index) => {
            const delay = index * stagger;
            const safeChar = char === ' ' && preserveSpaces ? '&nbsp;' : char;
            
            return `<span style="
                --char-index: ${index}; 
                --delay: ${delay}s;
                --animation-duration: ${duration}s;
                --animation-name: ${animation};
                animation-delay: var(--delay);
                animation-duration: var(--animation-duration);
                animation-name: var(--animation-name);
                animation-iteration-count: infinite;
                animation-timing-function: ease-in-out;
                display: inline-block;
            ">${safeChar}</span>`;
        }).join('');

        // アニメーション情報を保存
        this.animations.set(element, { text, options });
    }

    /**
     * スクロールトリガー付きアニメーション
     * @param {string} selector - 対象要素のセレクター  
     * @param {Object} options - アニメーション設定
     */
    setupScrollAnimation(selector, options = {}) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            // 初期状態では非表示
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            
            // Intersection Observer でスクロール検知
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.observedElements.has(entry.target)) {
                        this.observedElements.add(entry.target);
                        
                        // 要素を表示
                        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // テキストアニメーションを開始
                        setTimeout(() => {
                            this.processElement(entry.target, options);
                        }, 300);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '-20px'
            });
            
            observer.observe(element);
        });
    }

    /**
     * アニメーションを制御
     * @param {string} selector - 対象要素のセレクター
     * @param {string} action - 'play', 'pause', 'restart'
     */
    controlAnimation(selector, action) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            const spans = element.querySelectorAll('span');
            
            switch (action) {
                case 'play':
                    spans.forEach(span => {
                        span.style.animationPlayState = 'running';
                    });
                    break;
                    
                case 'pause':
                    spans.forEach(span => {
                        span.style.animationPlayState = 'paused';
                    });
                    break;
                    
                case 'restart':
                    spans.forEach(span => {
                        span.style.animation = 'none';
                        span.offsetHeight; // reflow
                        span.style.animation = null;
                    });
                    break;
            }
        });
    }

    /**
     * 動的にテキストを変更
     * @param {string} selector - 対象要素のセレクター
     * @param {string} newText - 新しいテキスト
     */
    updateText(selector, newText) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            const savedOptions = this.animations.get(element)?.options || {};
            element.textContent = newText;
            this.processElement(element, savedOptions);
        });
    }

    /**
     * レスポンシブ対応のリサイズ処理
     */
    handleResize() {
        // 必要に応じてアニメーションを再計算
        this.animations.forEach((data, element) => {
            if (window.innerWidth < 768) {
                // モバイル用の設定
                data.options.stagger = Math.min(data.options.stagger, 0.05);
            }
        });
    }
}

// グローバルインスタンス
const textAnimationManager = new TextAnimationManager();

// あなたのサイト用の初期化関数
function initializeTextAnimations() {
    // aboutセクションのh2
    textAnimationManager.setupScrollAnimation('#about h2', {
        stagger: 0.3,
        animation: 'waveCalm',
        duration: 4
    });

    // workセクションのh2
    textAnimationManager.setupScrollAnimation('#work h2', {
        stagger: 0.3,
        animation: 'waveCalm', 
        duration: 4
    });

    // footerのwave-text（常時アニメーション）
    textAnimationManager.setupAnimation('.wave-text', {
        stagger: 0.1,
        animation: 'wave',
        duration: 2
    });

    // リサイズイベント
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            textAnimationManager.handleResize();
        }, 250);
    });
}

// DOM読み込み完了後に実行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTextAnimations);
} else {
    initializeTextAnimations();
}

// デバッグ用: グローバルに公開
window.textAnimationManager = textAnimationManager;

// 使用例とユーティリティ関数
window.TextAnimationUtils = {
    // ホバー時の特殊効果
    addHoverEffect: (selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                textAnimationManager.controlAnimation(selector, 'restart');
            });
        });
    },

    // クリック時のリアニメーション
    addClickRestart: (selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.cursor = 'pointer';
            element.addEventListener('click', () => {
                textAnimationManager.controlAnimation(selector, 'restart');
            });
        });
    },

    // カスタムアニメーション追加
    addCustomAnimation: (name, keyframes) => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ${name} {
                ${keyframes}
            }
        `;
        document.head.appendChild(style);
    }
};
