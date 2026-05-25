"use strict";
let size_triangle = 50;
let numOf_triangle = 14; // canvasの枚数（n + 1個のcanvas）
let animationTime = 3; // ｎ秒のアニメーション

// htmlが読み込まれたら自動実行
window.onload = function init() {
  console.log(size_triangle);
  // htmlタグの取得
  const $button_start = document.querySelector("#button_start");
  const $input_range = document.querySelector("#input_range");
  const $num_range = document.querySelector("#num_range");

  // input:rangeを動かすと数値が変わる
  $input_range.addEventListener("input", () => {
    $num_range.textContent = `${$input_range.value}`;
  });

  $button_start.addEventListener("click", () => {
    size_triangle = Number($input_range.value);
    refreshCanvas();
  });

  refreshCanvas();

  setInterval(() => {
    mainLoop();
  }, 1000);
};

function refreshCanvas() {
  // なんか細かい設定
  const width_canvas = size_triangle * 2.8; // canvasの横幅
  const height_canvas = width_canvas; // canvasの縦幅

  const animationDelaySet = new Array(numOf_triangle);
  let setDelayTime = 0; // Delayを設定するための仮変数
  for (let i = 0; i < animationDelaySet.length; i++) {
    setDelayTime += animationTime / numOf_triangle;
    animationDelaySet[i] = setDelayTime;
  }

  // 唐突な高さ設定。
  const $wrap_canvas = document.querySelector("#wrap_canvas");
  $wrap_canvas.style.height = `${height_canvas}px`;

  $wrap_canvas.replaceChildren();

  // canvasを生成する関数。id番号とアニメーションの遅延を受け取る
  function createCanvas(nun_id, anime_delay) {
    const tag_canvas = document.createElement("canvas");
    tag_canvas.className = `canvas${nun_id}`;
    tag_canvas.id = "canvas";
    tag_canvas.width = width_canvas;
    tag_canvas.height = height_canvas;

    // アニメーション設定
    tag_canvas.style.animation = `animeTriangle 3s linear ${anime_delay}s infinite`;

    $wrap_canvas.appendChild(tag_canvas);
  }

  // canvasの生成
  createCanvas(0, 0); // 必ず一つはcanvas0でdelayも0sのものを入れる
  for (let i = 0; i < numOf_triangle; i++) {
    createCanvas(i + 1, animationDelaySet[i]);
  }

  // 以下canvas
  const canvases = document.querySelectorAll("#canvas"); // canvasを全て取得
  const ctxes = []; // 各canvasのconTextを格納する
  canvases.forEach((canvas) => {
    ctxes.push(canvas.getContext("2d"));
  });
  const W = width_canvas;
  const H = height_canvas;
  console.log(`${W}:${H}`);

  ctxes.forEach((ctx) => {
    ctx.clearRect(0, 0, W, H);

    console.log(size_triangle);
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(60, 255, 0)";
    ctx.moveTo(W / 2, H / 2 - size_triangle);
    ctx.lineTo(W / 2 - size_triangle, H / 2 + size_triangle);
    ctx.lineTo(W / 2 + size_triangle, H / 2 + size_triangle);
    ctx.lineTo(W / 2, H / 2 - size_triangle);
    ctx.stroke();
  });
}

function mainLoop() {
  // ctx.clearRect(0, 0, W, H)
}
