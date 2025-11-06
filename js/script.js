// ASCII artを配列として定義
const asciiArts = [
    `
_/_/_/_/_/    _/_/    _/      _/    _/_/    _/    _/    _/_/        _/_/_/_/    _/_/    _/        _/_/_/    _/_/
   _/      _/    _/  _/_/    _/  _/    _/  _/  _/    _/    _/      _/        _/    _/  _/          _/    _/    _/
  _/      _/_/_/_/  _/  _/  _/  _/_/_/_/  _/_/      _/_/_/_/      _/_/_/    _/    _/  _/          _/    _/    _/
 _/      _/    _/  _/    _/_/  _/    _/  _/  _/    _/    _/      _/        _/    _/  _/          _/    _/    _/
_/      _/    _/  _/      _/  _/    _/  _/    _/  _/    _/      _/          _/_/    _/_/_/_/  _/_/_/    _/_/
  `,
    `
░▀█▀░█▀█░█▀█░█▀█░█░█░█▀█░░░█▀▀░█▀█░█░░░▀█▀░█▀█
░░█░░█▀█░█░█░█▀█░█▀▄░█▀█░░░█▀▀░█░█░█░░░░█░░█░█
░░▀░░▀░▀░▀░▀░▀░▀░▀░▀░▀░▀░░░▀░░░▀▀▀░▀▀▀░▀▀▀░▀▀▀
  `,
    `
 _____ _____ _____ _____ _____ _____    _____ _____ __    _____ _____
|_   _|  _  |   | |  _  |  |  |  _  |  |   __|     |  |  |     |     |
  | | |     | | | |     |    -|     |  |   __|  |  |  |__|-   -|  |  |
  |_| |__|__|_|___|__|__|__|__|__|__|  |__|  |_____|_____|_____|_____|
  `
];

// ランダムにASCII artを選択する関数
function getRandomAsciiArt(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// ページ読み込み時に実行
window.addEventListener('DOMContentLoaded', function() {
    const randomArt = getRandomAsciiArt(asciiArts);
    document.getElementById('ascii-display').textContent = randomArt;
});