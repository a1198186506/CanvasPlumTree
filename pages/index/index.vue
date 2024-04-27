<template>
	<view style="width: 100%;height:100%;position: absolute;">

		<canvas canvas-id="canvas" id="canvas" ref="canvas"
			style="width: 100%;height: 100%;"></canvas>
		<view
			style="width: 100%;position: absolute;height:110rpx;background-color: white;top: 0;box-shadow: 0 5rpx 30rpx grey;">
			<image src="../../static/back.png" style="width: 100%;height: 100%;"></image>
			<view
				style="position:absolute;width: 100%;height: 100%;display: flex;justify-content:space-around;align-items: center;top: 0;">
				<view
					style="width: 200rpx;height:90%;background-color: aqua;border-radius: 30rpx;display: flex;justify-content: center;align-items: center;font-family: 'fontmaobi';background-color: #3a3a3a;color: white;" @click="userconfig=true">
					配置</view>
				<view
					style="width: 200rpx;height:90%;background-color: aqua;border-radius: 30rpx;display: flex;justify-content: center;align-items: center;font-family: 'fontmaobi';background-color: #3a3a3a;color: white;" @click="save_img">
					保存</view>
				<view
					style="width: 200rpx;height:90%;background-color: aqua;border-radius: 30rpx;display: flex;justify-content: center;align-items: center;font-family: 'fontmaobi';background-color: #3a3a3a;color: white;"
					@click="reload_page">重置</view>
			</view>
		</view>
		<TnPopup v-model="newusertitlepopup" v-if="newusertitlepopup">
		    <view style="width: 700rpx;height: auto;position: relative;padding-top: 20rpx;padding-bottom: 20rpx;">
				<view style="position: relative;width: 100%;display: flex;justify-content: center;font-weight: bold;">
					欢迎你的观赏
				</view>
				<view style="position: relative;width: 100%;display: flex;justify-content: center;margin-top: 20rpx;">
					<view style="width: 80%;letter-spacing: 2rpx;">
						很高兴我种的这些梅树能被你看到，但具体种了多少棵...我也忘了，我想至少也有几百万棵吧，不知道能不能去村里领点补贴？<br><br>哈哈，反正如果你要观赏下一棵的话点<text style="font-weight: bold;">重置</text>就行了,如果想要带走的话，点<text style="font-weight: bold;">保存</text>就会变成一张照片了，我保证这的每一株都是独一无二的，跟nft数字藏品一样哦，哈哈哈。
					</view>
					
				</view>
				<view style="position: relative;width: 100%;display: flex;justify-content: center;margin-top: 40rpx;">
					<TnButton bg-color="rgb(0, 0, 0)" text-color="rgb(255, 255, 255)" width="500rpx" height="90rpx" shape="round" @click="newusertitlepopup=false">够了,闭嘴！</TnButton>
				</view>
			</view>
		  </TnPopup>
		  
		  <!-- 配置-->
		  <TnPopup v-model="userconfig" v-if="userconfig"  open-direction="right" width="100%" height="100%">
		      <view style="width:100%;height:100%;position:absolute;padding-top: 20rpx;padding-bottom: 20rpx;">
				  
					<view style="width: 100%;position: relative;display: flex;justify-content: center;margin-top: 30rpx;font-weight: bold;">自定义配置</view>
					<view style="overflow-y: auto;width: 100%;height:1000rpx;display: flex;justify-content: center;margin-top: 30rpx;position: absolute;flex-wrap: wrap;">
						<view style="width: 90%;height: auto;border-radius: 30rpx;background-color: white;overflow: hidden;">
							<view style="width: 90%;transform: translateX(5%);margin-top: 30rpx;">
								<view style="margin-bottom: 15rpx;">
									<TnTitle title="树根大小(树生长时会以这个数为基准越来越小)" mode="vLine" assist-color="#3a3a3a" />
								</view>
								当前值为：{{userconfig_msg.root_radius}}
								 <TnSlider @change="onchange1" active-color="#3a3a3a" style="margin-top: 20rpx;" v-model="userconfig_msg.root_radius" :min="20" :max="30" :step="1"/>
							</view>
							<view style="width: 90%;transform: translateX(5%);margin-top: 30rpx;">
								<view style="margin-bottom: 15rpx;">
									<TnTitle title='主干生长到百分之几时开始长出枝丫' mode="vLine" assist-color="#3a3a3a" />
								</view>
								当前值为：{{userconfig_msg.load_other*10}}%
								 <TnSlider active-color="#3a3a3a" style="margin-top: 20rpx;" v-model="userconfig_msg.load_other" :min="3" :max="9" :step="1"/>
							</view>
							<view style="width: 90%;transform: translateX(5%);margin-top: 30rpx;">
								<view style="margin-bottom: 15rpx;">
									<TnTitle title='枝丫之间的间隙(值越大越疏)' mode="vLine" assist-color="#3a3a3a" />
								</view>
								(算法加入了随机,这个值只会作为其中的一个影响因子，不一定是准确值)<br>
								当前值为：{{userconfig_msg.interval}}
								 <TnSlider active-color="#3a3a3a" style="margin-top: 20rpx;" v-model="userconfig_msg.interval" :min="3" :max="9" :step="1"/>
							</view>
							<view style="width: 90%;transform: translateX(5%);margin-top: 30rpx;">
								<view style="margin-bottom: 15rpx;">
									<TnTitle title='枝丫数量(值越大越多)' mode="vLine" assist-color="#3a3a3a" />
								</view>
								(算法加入了随机,这个值只会作为其中的一个影响因子，不一定是准确值)<br>
								当前值为：{{userconfig_msg.root_much}}
								 <TnSlider active-color="#3a3a3a" style="margin-top: 20rpx;" v-model="userconfig_msg.root_much" :min="5" :max="12" :step="1"/>
							</view>
							<view style="width: 90%;transform: translateX(5%);margin-top: 30rpx;margin-bottom: 30rpx;">
								<view style="margin-bottom: 15rpx;">
									<TnTitle title='自定义诗词(留空的话就随机生成)' mode="vLine" assist-color="#3a3a3a" />
								</view>
								(不要写太多，太多会超过屏幕，加标点符号18个字以内为佳)
								<TnInput v-model="userconfig_msg.text" placeholder="展示你的才华" />
							</view>
						</view>
						
					</view>
					<view style="width: 100%;height:150rpx;box-shadow: 0 -5rpx 15rpx gainsboro;position: absolute;bottom: 0;">
						<view style="position: relative;width: 100%;display: flex;justify-content: center;margin-top: 40rpx;">
							<TnButton bg-color="rgb(0, 0, 0)" text-color="rgb(255, 255, 255)" width="500rpx" height="90rpx" shape="round" @click="saveuserconfig">确定</TnButton>
						</view>
					</view>
					<view  style="position: absolute;top: 30rpx;left: 35rpx;width:60rpx;height: 60rpx;" >
					<TnButton width="70rpx" height="70rpx" bg-color="#3a3a3a" text-color="#fff" font-size="55rpx" icon="left-circle-simple-fill" @click="userconfig=false">
									 
					</TnButton>
					</view>
			  </view>
		    </TnPopup>
	</view>
</template>

<script setup>
	import TnInput from '@/uni_modules/tuniaoui-vue3/components/input/src/input.vue'
	import TnPopup from '@/uni_modules/tuniaoui-vue3/components/popup/src/popup.vue'
	import TnTitle from '@/uni_modules/tuniaoui-vue3/components/title/src/title.vue'
	import TnButton from '@/uni_modules/tuniaoui-vue3/components/button/src/button.vue'
	import TnSlider from '@/uni_modules/tuniaoui-vue3/components/slider/src/slider.vue'
	import {
		onMounted,
		ref,
		 toRaw
	} from 'vue';
	import {
		draw_init,clear_canvas
	} from '@/untils/animate.js'
	// #ifndef MP-WEIXIN
	import {
		load as jinrishici
	} from "jinrishici";
	// #endif
	//新用户提示
	const newusertitlepopup=ref(false)
	
	const onchange1=(e)=>{
		console.log(e)
	}
	//用户配置面板
	const userconfig=ref(false)
	
	const userconfig_msg2=ref(20)
	//用户配置
	const userconfig_msg=ref({
		root_radius:20,  //树根半径
		load_other:5,//长枝丫的生长百分比
		interval:3,//间隙
		root_much:5,//枝干多少
		text:'',//自定义诗句
	})
	
	//保存用户配置
	const saveuserconfig=()=>{
		uni.setStorageSync("userconfig_msg", toRaw(userconfig_msg.value))
		userconfig.value=false
		uni.showToast({
			icon:"success",
			title:"保存成功"
		})
		
		setTimeout(()=>{
			clear_canvas()
			init_tree()
		},1000)
	}
	
	
	let ctx;
	let canvas_width;
	let canvas_height;
	onMounted(async () => {
		
		
		uni.showLoading({
			title:"加载中...",
			mask:true
		})
		ctx = uni.createCanvasContext("canvas")
		
		let result_temp=uni.getStorageSync("userconfig_msg")
		

		if(result_temp){
			console.log("yes")
			userconfig_msg.value=result_temp
		}
		
		const query = uni.createSelectorQuery();
		query.select('#canvas').fields({
			size: true
		}, (res) => {
			canvas_width = res.width;
			canvas_height = res.height;
				uni.hideLoading()
				isnew()
				init_tree()
		}).exec();
		
	

	})
	
	//初始化
	async function init_tree(){
		let text_1 = await new Promise((res, rej) => {
			if(userconfig_msg.value.text!=''){
				res(userconfig_msg.value.text)
			}
			
			// #ifndef MP-WEIXIN
			jinrishici(
				(result) => {
					console.log(result.data.origin.content);
					let index_temp = Math.floor(generateRandomNumber(0, result.data.origin.content
						.length - 1))
					res(result.data.origin.content[index_temp])
				},
				(err) => {
					console.error(err);
					res("人面不知何处去，桃花依旧笑春风")
				}
			);
			// #endif
			// #ifdef MP-WEIXIN
			res("人面不知何处去，桃花依旧笑春风")
			// #endif
		
		});

		draw_init(ctx, canvas_width, canvas_height, text_1, toRaw(userconfig_msg.value))
	}
	
	function isnew(){
		let result=uni.getStorageSync("userconfig")
		console.log(result)
		if(!result){
			newusertitlepopup.value=true
			uni.setStorageSync("userconfig",{state:1})
		}
	}

	function generateRandomNumber(min, max) {
		return Math.random() * (max - min) + min;
	}

	function reload_page() {

		clear_canvas()
		init_tree()
	}

	//保存
	function save_img() {

		uni.getSystemInfo({
			success: (res) => {
				const screenWidth = res.windowWidth; // 屏幕宽度，单位为px
				const screenHeight = res.windowHeight; // 屏幕高度，单位为px
				uni.canvasToTempFilePath({
					width: screenWidth,
					height: screenHeight,
					canvasId: 'canvas',
					success: (res) => {
						// #ifdef H5
						var arr = res.tempFilePath.split(',');
						var bytes = atob(arr[1]);
						let ab = new ArrayBuffer(bytes.length);
						let ia = new Uint8Array(ab);
						for (let i = 0; i < bytes.length; i++) {
							ia[i] = bytes.charCodeAt(i);
						}
						var blob = new Blob([ab], {
							type: 'application/octet-stream'
						});
						var url = URL.createObjectURL(blob);
						var a = document.createElement('a');
						a.href = url;
						a.download = new Date().valueOf() + ".png";
						var e = document.createEvent('MouseEvents');
						e.initMouseEvent('click', true, false, window, 0, 0, 0,
							0, 0, false, false, false, false, 0, null);
						a.dispatchEvent(e);
						URL.revokeObjectURL(url);
						// #endif
						uni.showToast({
							icon:'success',
							title:"保存成功"
						})
					},
					fail: () => {
						uni.showToast({
							icon:'error',
							title:"保存失败"
						})
					}
				})
			},
		});

	}
</script>

<style>
	@font-face {
		font-family: 'fontmaobi';
		src: url('../../static/font.ttf');
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>