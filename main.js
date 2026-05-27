"use strict";
let size_triangle = 50;
let numOf_triangle = 7; // canvasの枚数（n + 1個のcanvas）
let animationTime_pendulum = 3; // ｎ秒のアニメーション
let animationTime_rotateSpeed = 3; // ｎ秒のアニメーション
let animePendulum_deg = 53;

// htmlが読み込まれたら自動実行
window.onload = function init() {
  console.log(size_triangle);
  // htmlタグの取得

  const $button_start = document.querySelector("#button_start");
  const $input_range = document.querySelector("#input_range");
  const $input_deg = document.querySelector("#input_deg");
  const $input_numOfTriangle = document.querySelector("#input_numOfTriangle");
  const $input_rotateSpeed = document.querySelector("#input_rotateSpeed");
  const $num_range = document.querySelector("#num_range");
  const $num_deg = document.querySelector("#num_deg");
  const $num_numOfTriangle = document.querySelector("#num_numOfTriangle");
  const $num_rotateSpeed = document.querySelector("#num_rotateSpeed");
  const $wrap_canvas = document.querySelector(".wrap_canvas");

  // input:rangeを動かすと数値が変わる
  $input_range.addEventListener("input", () => {
    $num_range.textContent = `${$input_range.value}`;
  });
  $input_deg.addEventListener("input", () => {
    $num_deg.textContent = `${$input_deg.value}`;
  });
  $input_numOfTriangle.addEventListener("input", () => {
    $num_numOfTriangle.textContent = `${$input_numOfTriangle.value}`;
  });
  $input_rotateSpeed.addEventListener("input", () => {
    $num_rotateSpeed.textContent = `${$input_rotateSpeed.value}`;
  });

  // ユーザー入力の受け取りと反映させての再生成
  $button_start.addEventListener("click", () => {
    // 三角形のサイズ変更
    size_triangle = Number($input_range.value);

    // 三角形の数を変更
    numOf_triangle = Number(input_numOfTriangle.value);

    // 三角形の回転速度を変更
    animationTime_rotateSpeed = Number($input_rotateSpeed.value);

    // 振り子アニメーションの角度変更
    animePendulum_deg = Number($input_deg.value);
    animation_set_pendulum(
      animePendulum_deg,
      animationTime_pendulum,
      $wrap_canvas,
    );

    // 再生成
    refreshCanvas();
  });

  animation_set_pendulum(
    animePendulum_deg,
    animationTime_pendulum,
    $wrap_canvas,
  );
  refreshCanvas();

  setInterval(() => {
    mainLoop();
  }, 1000);
};

function animation_set_pendulum(numBeg, animationTime, htmlTag) {
  // 振り子運動の角度変更
  const anime_pendulum = [
    { transform: `rotateZ(${numBeg}deg)` },
    { transform: `rotateZ(${numBeg * -1}deg)` },
  ];
  const anime_option = {
    duration: animationTime * 1000, //  ミリ秒
    iterations: Infinity,
    delay: 0,
    easing: "ease-in-out",
    direction: "alternate",
  };

  // アニメーションをjsから設定する
  htmlTag.animate(anime_pendulum, anime_option);
}

function refreshCanvas() {
  // なんか細かい設定
  const width_canvas = size_triangle * 2.8; // canvasの横幅
  const height_canvas = width_canvas; // canvasの縦幅

  // 各三角形のアニメーション遅延を格納
  const animationDelaySet = new Array(numOf_triangle);
  let setDelayTime = 0; // Delayを設定するための仮変数
  for (let i = 0; i < animationDelaySet.length; i++) {
    setDelayTime += animationTime_pendulum / numOf_triangle;
    animationDelaySet[i] = setDelayTime;
  }

  // 唐突な高さ設定。
  const $wrap_canvas = document.querySelector("#wrap_canvas");
  $wrap_canvas.style.height = `${height_canvas}px`;

  $wrap_canvas.replaceChildren();

  // canvasを生成する関数。id番号とアニメーションの遅延を引数として受け取る
  function createCanvas(nun_id, animationTime_rotate, anime_delay) {
    const tag_canvas = document.createElement("canvas");
    tag_canvas.className = `canvas${nun_id}`;
    tag_canvas.id = "canvas";
    tag_canvas.width = width_canvas;
    tag_canvas.height = height_canvas;

    // アニメーション設定
    tag_canvas.style.animation = `animeTriangle ${animationTime_rotate}s linear ${anime_delay}s infinite`;

    $wrap_canvas.appendChild(tag_canvas);
  }

  // canvasの生成
  createCanvas(0, animationTime_rotateSpeed, 0); // 必ず一つはcanvas0でdelayも0sのものを入れる
  for (let i = 0; i < numOf_triangle; i++) {
    createCanvas(i + 1, animationTime_rotateSpeed, animationDelaySet[i]);
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
