require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([1],{27:function(t,e,s){"use strict";var n=r(s(4)),i=r(s(28));function r(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(i.default))},28:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(30),i=s.n(n),r=s(31),o=!1;var a=function(t){o||s(29)},l=s(0)(i.a,r.a,a,null,null);l.options.__file="..\\..\\..\\..\\..\\project\\uniapp\\SonFish\\pages\\user\\user.vue",l.esModule&&Object.keys(l.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),l.options.functional&&console.error("[vue-loader] user.vue: functional components are not supported with templates, they should use render functions."),e.default=l.exports},29:function(t,e){},30:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var n,i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},r=s(3),o=s(5);(n=o)&&n.__esModule;e.default={data:function(){return{}},computed:i({},(0,r.mapState)(["authUserInfor","userInfor"])),onLoad:function(){console.log("user page onload"),this.getUserInfoNormal()},methods:i({},(0,r.mapMutations)(["setAuthUserInfor","setUserInfor"]),(0,r.mapActions)(["updateUserInfor","getUserInfoNormal"]),{wxGetUserInfo:function(e){if(console.log(e),"getUserInfo:ok"!==e.detail.errMsg)return t.showModal({title:"登录失败",content:"请点击允许",showCancel:!1}),this.setAuthUserInfor(!1),void console.log(this.authUserInfor);this.setAuthUserInfor(!0),this.setUserInfor(e.detail.userInfo),this.updateUserInfor(),console.log(this.authUserInfor),console.log(this.userInfor,"user")},test:function(){console.log(this.authUserInfor),t.showModal({content:this.authUserInfor.toString()})}})}}).call(e,s(2).default)},31:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"content"},[s("view",{staticClass:"head"},[t.authUserInfor?t._e():s("button",{staticClass:"logo",attrs:{type:"primary","open-type":"getUserInfo",eventid:"UA1-0"},on:{getuserinfo:t.wxGetUserInfo}},[t._v("登录")]),t.authUserInfor?t._e():s("label",[t._v("请登录")]),t.authUserInfor?s("image",{staticClass:"logo",attrs:{src:t.userInfor.avatarUrl}}):t._e(),t.authUserInfor?s("label",[t._v(t._s(t.userInfor.nickName))]):t._e()],1),s("view",{staticClass:"split"}),t._m(0)])};n._withStripped=!0;var i={render:n,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"detail"},[e("view",{staticClass:"uni-list"},[e("view",{staticClass:"uni-list-cell",attrs:{"hover-class":"uni-list-cell-hover"}},[e("view",{staticClass:"uni-list-cell-navigate uni-navigate-right"},[this._v("\n\t\t\t\t\t历史订单\n\t\t\t\t")])]),e("view",{staticClass:"uni-list-cell",attrs:{"hover-class":"uni-list-cell-hover"}},[e("view",{staticClass:"uni-list-cell-navigate uni-navigate-right"},[this._v("\n\t\t\t\t\t个人资料\n\t\t\t\t")])]),e("view",{staticClass:"uni-list-cell",attrs:{"hover-class":"uni-list-cell-hover"}},[e("view",{staticClass:"uni-list-cell-navigate uni-navigate-right"},[this._v("\n\t\t\t\t\t意见反馈\n\t\t\t\t")])]),e("view",{staticClass:"uni-list-cell uni-list-cell-last",attrs:{"hover-class":"uni-list-cell-hover"}},[e("view",{staticClass:"uni-list-cell-navigate uni-navigate-right"},[this._v("\n\t\t\t\t\t售后服务\n\t\t\t\t")])])])])}]};e.a=i}},[27]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/user.js.map