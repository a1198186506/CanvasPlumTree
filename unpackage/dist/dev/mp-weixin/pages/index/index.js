"use strict";
const common_vendor = require("../../common/vendor.js");
const untils_animate = require("../../untils/animate.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onMounted(async () => {
      let width;
      let height;
      let ctx = common_vendor.index.createCanvasContext("canvas");
      const query = common_vendor.index.createSelectorQuery();
      query.select("#canvas").fields({
        size: true
      }, (res) => {
        width = res.width;
        height = res.height;
      }).exec();
      let text_1 = await new Promise((res, rej) => {
        res("人面不知何处去，桃花依旧笑春风");
      });
      untils_animate.draw_init(ctx, width, height, text_1);
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBproject/MyPage/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
