# MOBOフォント 実装完了 🎉

## 📁 追加されたもの

### 1. @font-face 定義（style.css）
4つのMOBOフォントウェイトが使用可能になりました：

- **MOBO ExtraLight** (font-weight: 200)
- **MOBO Regular** (font-weight: 400) 
- **MOBO SemiBold** (font-weight: 600)
- **MOBO Bold** (font-weight: 700)

### 2. ユーティリティクラス
すぐに使える便利なCSSクラスを追加しました。

### 3. サンプルページ
`mobo-font-example.html` - インタラクティブなMOBOフォントのデモページ

## 🚀 すぐに使える方法

### HTML に直接クラスを追加
```html
<!-- ウェイト別 -->
<h1 class="font-mobo-bold">太字のタイトル</h1>
<h2 class="font-mobo-semibold">中太の見出し</h2>
<p class="font-mobo-regular">標準の本文</p>
<small class="font-mobo-extralight">軽い補足テキスト</small>

<!-- サイズ＆ウェイト込み -->
<h1 class="mobo-title">大きなタイトル</h1>
<h2 class="mobo-heading">見出し</h2>
<h3 class="mobo-subheading">小見出し</h3>
<p class="mobo-body">本文テキスト</p>
<caption class="mobo-caption">キャプション</caption>
```

### CSS で指定
```css
/* 基本の使い方 */
.my-title {
    font-family: 'MOBO', sans-serif;
    font-weight: 700; /* Bold */
}

/* 既存要素にMOBOフォントを適用 */
h1, h2, h3 {
    font-family: 'MOBO', 'Hiragino Sans', sans-serif;
}
```

## 🎨 あなたのサイトに適用する例

### 現在のh2タイトルをMOBOフォントに
```css
h2 {
    font-family: 'MOBO', sans-serif;
    font-weight: 700; /* よりインパクトのあるBold */
    /* または font-weight: 600; でSemiBold */
}
```

### フッターのwave-textをMOBOフォントに
```css
.wave-text {
    font-family: 'MOBO', sans-serif;
    font-weight: 600; /* 角丸が美しいSemiBold */
}
```

### ナビゲーションをMOBOフォントに
```css
.nav ul li a {
    font-family: 'MOBO', sans-serif;
    font-weight: 600;
}
```

## 📖 利用可能なクラス一覧

### ウェイト別クラス
| クラス名 | ウェイト | 用途 |
|---------|---------|------|
| `.font-mobo-extralight` | 200 | 本文・キャプション |
| `.font-mobo-regular` | 400 | 標準テキスト |
| `.font-mobo-semibold` | 600 | 見出し・強調 |
| `.font-mobo-bold` | 700 | タイトル・ロゴ |

### 用途別クラス（サイズ＆ウェイト込み）
| クラス名 | 説明 | レスポンシブサイズ |
|---------|------|------------------|
| `.mobo-title` | メインタイトル (Bold) | 2rem〜4rem |
| `.mobo-heading` | 見出し (SemiBold) | 1.5rem〜2.5rem |
| `.mobo-subheading` | 小見出し (Regular) | 1.2rem〜1.8rem |
| `.mobo-body` | 本文 (Regular) | 1rem〜1.2rem |
| `.mobo-caption` | キャプション (ExtraLight) | 0.8rem〜1rem |

## 🎯 おすすめの使い分け

### ExtraLight (200)
- **用途**: 本文の補足、キャプション、フッター情報
- **特徴**: 軽やかで読みやすい

### Regular (400)
- **用途**: メインの本文、説明文
- **特徴**: 標準的で汎用性が高い

### SemiBold (600)
- **用途**: セクション見出し、ナビゲーション、重要な情報
- **特徴**: 適度な存在感、角丸が美しく表現される

### Bold (700)
- **用途**: メインタイトル、ロゴ、強いインパクトが必要な場所
- **特徴**: 角丸処理が最も効果的、レトロ感が強い

## 🔧 カスタマイズ例

### グラデーションタイトル
```css
.gradient-title {
    font-family: 'MOBO', sans-serif;
    font-weight: 700;
    font-size: 3rem;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

### アニメーション付きボタン
```css
.mobo-button {
    font-family: 'MOBO', sans-serif;
    font-weight: 600;
    padding: 12px 24px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    transition: transform 0.2s ease;
}

.mobo-button:hover {
    transform: translateY(-2px);
}
```

## 📱 レスポンシブ対応

すべてのユーティリティクラスは `clamp()` を使用してレスポンシブ対応済みです。
画面サイズに応じて自動的にフォントサイズが調整されます。

## 🎮 デモページ

`mobo-font-example.html` を開くと、以下が確認できます：
- 4つのウェイトの比較
- サイズバリエーション
- カラーサンプル
- インタラクティブなフォント調整機能
- 実用例

## 💡 次のステップ

1. **デモページで確認**: `mobo-font-example.html` を開いて各ウェイトを確認
2. **少しずつ適用**: まずはh2やタイトルから始める
3. **ブランディング強化**: ロゴやメインビジュアルでMOBOの角丸を活かす
4. **統一感を作る**: ナビゲーションや見出しを統一してサイト全体の印象を向上

MOBOフォントでサイトにレトロで親しみやすい印象を与えましょう！🌟
