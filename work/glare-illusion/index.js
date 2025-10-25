// javascript
console.log('Happy developing ✨')

let bulbX, bulbY;
let circleSize = 100;
let dragging = false;
let offsetX = 0;
let offsetY = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    bulbX = windowWidth / 2;
    bulbY = windowHeight / 2;
}

function draw() {
    background(0);
    drawLightBulb(windowWidth / 2 , windowHeight / 5, circleSize);
    drawBlurLightBulb(bulbX, bulbY, circleSize);
}

// ウィンドウサイズが変更されたときに実行される関数
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// マウス押下で電球内ならドラッグ開始
function mousePressed() {
    if (dist(mouseX, mouseY, bulbX, bulbY) < circleSize / 2) {
        dragging = true;
        offsetX = bulbX - mouseX;
        offsetY = bulbY - mouseY;
        return false; // p5 のデフォルト動作を抑制
    }
}

// マウスドラッグで位置更新
function mouseDragged() {
    if (dragging) {
        bulbX = mouseX + offsetX;
        bulbY = mouseY + offsetY;
    }
}

// マウスを離したらドラッグ終了
function mouseReleased() {
    dragging = false;
}

// 電球描画
function drawBlurLightBulb(x, y, size) {
    push(); // 現在の描画状態を保存
    drawingContext.strokeStyle = 'rgba(0,0,0,0)';
    drawingContext.shadowColor = color(255, 255, 120);
    drawingContext.shadowBlur = 50;

    ellipse(x, y, size);
    ellipse(x, y, size);
    ellipse(x, y, size);
    ellipse(x, y, size);
    ellipse(x, y, size);
    ellipse(x, y, size);

    drawingContext.shadowColor = color(255);
    drawingContext.shadowBlur = 150;
    ellipse(x, y, size);
    ellipse(x, y, size);
    ellipse(x, y, size);
    ellipse(x, y, size);
    ellipse(x, y, size);
    ellipse(x, y, size);
    ellipse(x, y, size);

    pop(); // 描画状態を復元
}

// 電球描画
function drawLightBulb(x, y, size) {
    push(); // 現在の描画状態を保存
    drawingContext.strokeStyle = 'rgba(0,0,0,0)';

    fill(255, 255, 120);
    ellipse(x, y, size *3);

    fill(255);
    ellipse(x, y, size);

    pop(); // 描画状態を復元
}