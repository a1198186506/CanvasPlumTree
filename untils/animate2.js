// 初始位置和结束位置
const deltaX = 2;
const deltaY = 25;

//画布对象
let canvas = null
let ctx = null
let canvas_width = null;
let canvas_height = null;
let tree_root_radius1 = 20
export const draw_init = (ctx_temp, canvas_width_temp, canvas_height_temp, text) => {
	console.log("ok1")
	//canvas=canvas_temp
	ctx = ctx_temp
	
	canvas_width = canvas_width_temp
	canvas_height = canvas_height_temp
	let startX_temp = Number(canvas_width_temp) / 2
	let startY_temp = Number(canvas_height_temp)
	let endX_temp = startX_temp + deltaX
	let endY_temp = parseInt(startY_temp) - deltaY
	let text_index = 0 //诗文渲染索引
	let text_all = text //诗文所有字
	
	ctx.fillStyle = '#dcdcdc';
	ctx.fillRect(0, 0, canvas_width, canvas_height);
	ctx.draw(true)

	uni.request({
		url: 'https://v2.jinrishici.com/token',
		method: "GET",
		header: {
			"X-User-Token": "ErY0hx1iF6hNPVw3Fc4KNR1jF3KDzj+Z"
		},
		success: (e) => {
			console.log(e)
		}
	})

	document.fonts.load('24px fontmaobi').then(() => {


		let text_show = setInterval(() => {
			console.log(text_all.length, text_index)
			if (text_all.length > text_index) {
				console.log("字")
				draw_text(20, text_all[text_index], text_all.length - text_index)
				text_index++
			} else {
				clearInterval(text_show)
			}
		}, 200)


		animate_tree_grow(8, startX_temp, startY_temp, tree_root_radius1, 2, -Math.PI / 2,
			tree_root_radius1, true, 0)
	})

	// uni.loadFontFace({
	//   family: 'fontmaobi',
	//   source: 'url("https://sungd.github.io/Pacifico.ttf")',
	//   success() {
	// 	  console.log('success')
	//   }
	// })		


}

// 开始动画

function animate_tree_grow(n, startX, startY, lineWidth, length, th, tree_root_radius, isroot, rootmainway) {
	ctx.beginPath();
	if (lineWidth - 0.08 > 0) {
		lineWidth -= 0.08
	} else {
		lineWidth = 0
	}

	ctx.arc(startX, startY, lineWidth, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.draw(true);

	let tree_grow_process = Number(((tree_root_radius - lineWidth) / tree_root_radius).toFixed(3))

	//移动x轴使树枝绘画时左右摇晃更逼真一些
	let th1;
	//树枝末端角度向上修正
	if(tree_grow_process > 0.9){
		th1 = Math.floor(generateRandomNumber( (-Math.PI / 2) - 2, (-Math.PI / 2) + 2))
	}
	else if (tree_grow_process > 0.4 && isroot) {
		//Math.floor(generateRandomNumber(),(-Math.PI/2)+150)
		let radom_11 = generateRandomNumber(0, 1)
		//主枝弯曲的偏向，左右各一半几率
		if (rootmainway == 0) {
			if (radom_11 > 0.5) {
				rootmainway = Math.floor(generateRandomNumber(10,20))*-1
			} else {
				rootmainway = Math.floor(generateRandomNumber(10,20))
			}
		}
		
		let temp_x=(-Math.PI / 2) +(tree_grow_process * rootmainway)
		th1 = Math.floor(generateRandomNumber(temp_x - 0.2, temp_x + 0.2))
	} else {
		th1 = Math.floor(generateRandomNumber(th - 1.7, th + 1.7))
	}
	startX = startX + length * Math.cos(th1)
	startY = startY + length * Math.sin(th)


	//长细枝
	if (n > 0 && tree_grow_process > 0.5) {
		console.log("长")
		//枝丫生长间隙(random大于的数值越大间隙越大)
		let random = generateRandomNumber(0, 10)
		if (random > 8) {
			//确定生长方向(一半几率)
			let random2 = generateRandomNumber(0, 1)
			if (random2 < 0.5) {
				animate_tree_grow(Math.floor(generateRandomNumber(0, 3)), startX, startY, lineWidth * 0.8, 2, th1 -
					generateRandomNumber((-Math.PI / 2) - 180, (-Math.PI / 2) + 180), lineWidth * 0.8, false,
					rootmainway)
			} else {
				animate_tree_grow(Math.floor(generateRandomNumber(0, 3)), startX, startY, lineWidth * 0.8, 2, th1 +
					generateRandomNumber(80, 100), lineWidth * 0.8, false, rootmainway)
			}

			n--
		}

	} else {
		//如果树枝绘制超过%几即开始绘制花瓣
		if (tree_grow_process > 0.8) {
			let count_1 = Math.floor(generateRandomNumber(1, 7))
			for (let i = 1; i < count_1; i++) {
				//随机在树枝两侧散布花瓣
				let x1 = Math.floor(generateRandomNumber(startX - 14, startX + 14))
				let y1 = Math.floor(generateRandomNumber(startY - 14, startY + 14))
				draw_petal(x1, y1)
			}

		}
	}
	if (lineWidth > 0.1) {
		// 继续下一帧动画
		requestAnimationFrame(() => {
			//console.log(startX_1)
			animate_tree_grow(n, startX, startY, lineWidth, length, th, tree_root_radius, isroot,
				rootmainway)


		});
	} else {
		return
	}

}

/* 绘制花瓣 */
function draw_petal(startX, startY) {
	ctx.beginPath();
	ctx.arc(startX, startY, Math.floor(generateRandomNumber(1, 3)), 0, Math.PI * 2);
	ctx.closePath();
	let color_arr = ["#FFB6C1", "#de898d", "#ff9da2"]
	let randomIndex = Math.floor(generateRandomNumber(0, color_arr.length));
	let randomElement = color_arr[randomIndex];
	ctx.fillStyle = randomElement;
	ctx.fill();
	ctx.draw(true);
}

/* 绘制文字 */
function draw_text(fontsize, text, index) {
	ctx.font = fontsize + 'px "fontmaobi"';
	ctx.fillStyle = "black";
	ctx.textBaseline = "top";
	ctx.fillText(text, canvas_width - (index * fontsize), 90);
	ctx.draw(true);
}

function generateRandomNumber(min, max) {
	return Math.random() * (max - min) + min;
}