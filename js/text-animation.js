document.addEventListener('DOMContentLoaded', function () {
  const targetElement = document.getElementById('text-animation-target');
  if (targetElement) {
    // pre要素のテキストを取得し、改行とスペースを維持する
    const originalText = targetElement.innerHTML;
    targetElement.innerHTML = ''; // テキストを一旦空にする
    let i = 0;

    // テキストが空でない場合のみアニメーションを実行
    if (originalText.trim().length > 0) {
      const typing = () => {
        if (i < originalText.length) {
          targetElement.innerHTML += originalText.charAt(i);
          i++;
          setTimeout(typing, 1); // 次の文字を表示するまでの時間（ミリ秒）
        }
      };
      typing();
    } else {
      // テキストがもともと空の場合は、元の内容（空）をそのまま表示
      targetElement.innerHTML = originalText;
    }
  }
});