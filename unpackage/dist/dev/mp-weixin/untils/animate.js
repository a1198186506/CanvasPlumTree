"use strict";
const common_vendor = require("../common/vendor.js");
let ctx = null;
let canvas_width = null;
let tree_root_radius1 = 20;
const draw_init = (ctx_temp, canvas_width_temp, canvas_height_temp, text) => {
  console.log("ok1");
  ctx = ctx_temp;
  canvas_width = canvas_width_temp;
  let startX_temp = Number(canvas_width_temp) / 2;
  let startY_temp = Number(canvas_height_temp);
  let text_index = 0;
  let text_all = text;
  common_vendor.index.request({
    url: "https://v2.jinrishici.com/token",
    method: "GET",
    header: {
      "X-User-Token": "ErY0hx1iF6hNPVw3Fc4KNR1jF3KDzj+Z"
    },
    success: (e) => {
      console.log(e);
    }
  });
  document.fonts.load("24px fontmaobi").then(() => {
    let text_show = setInterval(() => {
      console.log(text_all.length, text_index);
      if (text_all.length > text_index) {
        console.log("字");
        draw_text(20, text_all[text_index], text_all.length - text_index);
        text_index++;
      } else {
        clearInterval(text_show);
      }
    }, 200);
    animate_tree_grow(8, startX_temp, startY_temp, tree_root_radius1, 2, -Math.PI / 2, tree_root_radius1);
  });
};
function animate_tree_grow(n, startX, startY, lineWidth, length, th, tree_root_radius) {
  ctx.beginPath();
  if (lineWidth - 0.08 > 0) {
    lineWidth -= 0.08;
  } else {
    lineWidth = 0;
  }
  ctx.arc(startX, startY, lineWidth, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.draw(true);
  let tree_grow_process = Number(((tree_root_radius - lineWidth) / tree_root_radius).toFixed(3));
  let th1;
  if (lineWidth < 1) {
    th1 = Math.floor(generateRandomNumber(-Math.PI / 2 - 2, -Math.PI / 2 + 2));
  } else {
    th1 = Math.floor(generateRandomNumber(th - 2, th + 2));
  }
  startX = startX + length * Math.cos(th1);
  startY = startY + length * Math.sin(th);
  if (n > 0 && tree_grow_process > 0.4) {
    console.log("长");
    let random = generateRandomNumber(0, 10);
    if (random > 2) {
      let random2 = generateRandomNumber(0, 1);
      if (random2 < 0.5) {
        animate_tree_grow(Math.floor(generateRandomNumber(0, 3)), startX, startY, lineWidth * 0.8, 2, th1 - generateRandomNumber(-Math.PI / 2 - 180, -Math.PI / 2 + 180), lineWidth * 0.8);
      } else {
        animate_tree_grow(Math.floor(generateRandomNumber(0, 3)), startX, startY, lineWidth * 0.8, 2, th1 + generateRandomNumber(80, 100), lineWidth * 0.8);
      }
      n--;
    }
  } else {
    if (tree_grow_process > 0.7) {
      let count_1 = Math.floor(generateRandomNumber(1, 7));
      for (let i = 1; i < count_1; i++) {
        let x1 = Math.floor(generateRandomNumber(startX - 14, startX + 14));
        let y1 = Math.floor(generateRandomNumber(startY - 14, startY + 14));
        draw_petal(x1, y1);
      }
    }
  }
  if (lineWidth > 0.1) {
    requestAnimationFrame(() => {
      animate_tree_grow(n, startX, startY, lineWidth, length, th, tree_root_radius);
    });
  } else {
    return;
  }
}
function draw_petal(startX, startY) {
  ctx.beginPath();
  ctx.arc(startX, startY, Math.floor(generateRandomNumber(1, 3)), 0, Math.PI * 2);
  ctx.closePath();
  let color_arr = ["#FFB6C1", "#de898d", "#ff9da2"];
  let randomIndex = Math.floor(generateRandomNumber(0, color_arr.length));
  let randomElement = color_arr[randomIndex];
  ctx.fillStyle = randomElement;
  ctx.fill();
  ctx.draw(true);
}
function draw_text(fontsize, text, index) {
  ctx.font = fontsize + 'px "fontmaobi"';
  ctx.fillStyle = "black";
  ctx.textBaseline = "top";
  ctx.fillText(text, canvas_width - index * fontsize, 90);
  ctx.draw(true);
}
function generateRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
exports.draw_init = draw_init;
