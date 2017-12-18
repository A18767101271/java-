import React from 'react';
import { DatePicker, Picker, Switch, Modal, Toast } from 'antd-mobile';
import classNames from 'classNames';
import moment from 'moment';
import ChooseReturn from './ChooseReturn';

import '../../sass/SetHomePage.scss';

// import { HashUrl } from '../../../../assets/libs/hash-router';

// import bridge from '../../../../assets/libs/sardine-bridge';

// const $ = (window as any).$;
import PromotionApis, { PromotionInstanceAdd } from '../../../../services/promotion-apis';


// PageExtends.st = PageExtends.st || "请设置日期";
// PageExtends.end = PageExtends.end || "请设置日期";

// function start() {
//     var selectFood = "";
//     var l = "";
//     if (PageExtends.larry) {
//         selectFood = '已设置';
//         l += `<ul class="yy-all clearfix">`
//         for (var d = 0; d < PageExtends.larry.length; d++) {
//             l += `<li>` + PageExtends.larry[d].productName + `*` + PageExtends.larry[d].productNum + `</li>`;
//         }
//         l += `</ul>`;
//     } else {
//         selectFood = "请选择商品项目";
//     }

//     var h = "";
//     h += `<div class="l-label">
//  <div class="left fl">起始日期</div>
//  <div class="right fr">
//      <span id="start-time">` + PageExtends.st + `</span>
//      <i></i>
//  </div>
//  </div>
//  <div class="l-label">
//  <div class="left fl">终止日期</div>
//  <div class="right fr">
//      <span id="end-time">` + PageExtends.end + `</span>
//      <i></i>
//  </div>
//  </div>

//  <div class="l-label clearfix" id="pick-goods">
//  <div class="left fl">赠送商品</div>
//  <div class="right fr"><span class="span-goods">` + selectFood + `</span><i></i></div>` + l + `
//  </div>
//  </div>


//  <div class="l-label">
//  <div class="left fl">发放数量</div>
//  <div class="right fr">
//  <input type="number" placeholder="不限" value="" id="num-input">
//  </div>
//  </div>

//  <div class="l-title">
//  <i></i>
//  <span>活动信息</span>
//  </div>

//  <div class="l-label">
//  <div class="left fl">面向用户</div>
//  <div class="right fr">
//      <span id="pick-user">未设置</span>
//      <i></i>
//  </div>
//  </div>

//  <div class="l-label">
//  <div class="left fl">发放途径</div>
//  <div class="right fr">
//      <span id="pick-channel">未设置</span>
//      <i></i>
//  </div>
//  </div>

//  <div class="l-label">
//  <div class="left fl">有效期限</div>
//  <div class="right fr">
//      <span id="pick-time">未设置</span>
//      <i></i>
//  </div>
//  </div>

//  <div class="l-foot">
//  <h1>阅读并同意</h1>
//  <em>《xxx营销协议》</em>
//  <span id="btn" class="btn"></span>
//  </div>
//  <button id="btn-yes" class="btn-yes" disabled="disabled">确定并保存</button>`

//     $('.wrap').append(h);

//     var limitUser;
//     var grantWay;
//     var limitDate;

//     $('#pick-goods').on('click', function () {
//         PageExtends.st = $('#start-time').text();
//         PageExtends.end = $('#end-time').text();
//         window.location.href = "#/choosereturn";
//     })

//     //点击设置起始日期
//     $('#start-time').on('click', function () {
//         var $this = $(this);
//         var d = new Date();
//         var str = d.getFullYear() + "," + (d.getMonth() + 1) + "," + d.getDate();

//         bridge.picker({
//             title: "时间设置",
//             data: //单列选取自定义数据
//                 {
//                     type: 'date', //表示自定义输入数据
//                     depth: 3,
//                     start: [str],
//                     end: [2020, 1, 1]
//                 },
//             complete: function (data) {

//                 if (data.resultCode == 'success') {
//                     $this.text(data.selectedValue[0] + '-' + data.selectedValue[1] + '-' + data.selectedValue[2]);
//                 }
//             }
//         });
//     })

//     //点击设置结束日期
//     $('#end-time').on('click', function () {
//         var $this = $(this);
//         var str = $('#start-time').text();
//         if (str == '请设置日期') {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请设置起始日期",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }]
//             });
//             return;
//         }

//         bridge.picker({
//             title: "时间设置",
//             data: //单列选取自定义数据
//                 {
//                     type: 'date', //表示自定义输入数据
//                     depth: 3,
//                     start: [str],
//                     end: [2020, 1, 1]
//                 },
//             complete: function (data) {
//                 if (data.resultCode == 'success') {
//                     $this.text(data.selectedValue[0] + '-' + data.selectedValue[1] + '-' + data.selectedValue[2]);
//                 }
//             }
//         });
//     })

//     //点击选择面向用户
//     $('#pick-user').on('click', function () {
//         var $this = $(this);
//         bridge.picker({
//             title: "面向用户",
//             data: //单列选取自定义数据
//                 {
//                     type: 'items', //表示自定义输入数据
//                     depth: 1,
//                     items: [{
//                         text: '全部用户',
//                         value: '0',
//                     },
//                     {
//                         text: '门店新用户',
//                         value: '3'
//                     },
//                     {
//                         text: '门店老用户',
//                         value: '2'
//                     }
//                     ]
//                 },
//             complete: function (data) {

//                 if (data.resultCode == 'success') {
//                     $this.text(data.resultText[0]);
//                     limitUser = data.selectedValue[0];
//                 }
//             }
//         });
//     })

//     //点击选择发放途径
//     $('#pick-channel').on('click', function () {
//         var $this = $(this);
//         bridge.picker({
//             title: "面向用户",
//             data: //单列选取自定义数据
//                 {
//                     type: 'items', //表示自定义输入数据
//                     depth: 1,
//                     items: [{
//                         text: '仅限店内',
//                         value: '1',
//                     },
//                     {
//                         text: '仅限店外',
//                         value: '2'
//                     },
//                     {
//                         text: '店内店外',
//                         value: '3'
//                     }
//                     ]
//                 },
//             complete: function (data) {

//                 if (data.resultCode == 'success') {
//                     $this.text(data.resultText[0]);
//                     grantWay = data.selectedValue[0];
//                 }
//             }
//         });
//     })

//     //点击选择有效期限
//     $('#pick-time').on('click', function () {
//         var $this = $(this);
//         bridge.picker({
//             title: "有效期限",
//             data: //单列选取自定义数据
//                 {
//                     type: 'items', //表示自定义输入数据
//                     depth: 1,
//                     items: [{
//                         text: '1天',
//                         value: '0',
//                     },
//                     {
//                         text: '2天',
//                         value: '1',
//                     },
//                     {
//                         text: '3天',
//                         value: '2',
//                     },
//                     {
//                         text: '4天',
//                         value: '3',
//                     },
//                     {
//                         text: '5天',
//                         value: '4',
//                     },
//                     {
//                         text: '6天',
//                         value: '5',
//                     },
//                     {
//                         text: '7天',
//                         value: '6',
//                     },
//                     {
//                         text: '8天',
//                         value: '7',
//                     },
//                     {
//                         text: '9天',
//                         value: '8',
//                     },
//                     {
//                         text: '10天',
//                         value: '9',
//                     },
//                     {
//                         text: '11天',
//                         value: '10',
//                     },
//                     {
//                         text: '12天',
//                         value: '11',
//                     },
//                     {
//                         text: '13天',
//                         value: '12',
//                     },
//                     {
//                         text: '14天',
//                         value: '13',
//                     },
//                     {
//                         text: '15天',
//                         value: '14',
//                     }
//                     ]
//                 },
//             complete: function (data) {

//                 if (data.resultCode == 'success') {
//                     $this.text(data.resultText[0]);
//                     limitDate = data.resultText[0];
//                 }
//             }
//         });
//     })

//     //点击同意协议按钮
//     $('#btn').on('click', function () {
//         $(this).toggleClass('active');
//         $('#btn-yes').toggleClass('dis');
//         if ($('#btn-yes.dis').length > 0) {
//             $('#btn-yes').removeAttr('disabled');
//         } else {
//             $('#btn-yes').attr('disabled', 'disabled');
//         }
//     })

//     $('#btn-yes').on('click', function () {
//         var st = $('#start-time').text();
//         var end = $('#end-time').text();
//         st = new Date(Date.parse(st.replace(/-/g, "/")));
//         st = st.getTime() / 1000;
//         end = new Date(Date.parse(end.replace(/-/g, "/")));
//         end = end.getTime() / 1000;

//         var num_input = $('#num-input').val();
//         var pick_time = $('#pick-time').text();

//         if (!st || !end) {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请设置日期",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }]
//             });
//             return;
//         }

//         if ($('.yy-all li').length <= 0) {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请选择商品项目",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }]
//             });
//             return;
//         }

//         if ($('#pick-user').text() == "请设置面向用户") {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请设置面向用户",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }]
//             });
//             return;
//         }

//         if ($('#pick-channel').text() == "未设置") {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请设置面向用户",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }]
//             });
//             return;
//         }

//         if (pick_time == "未设置") {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请设置有效期",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }]
//             });
//             return;
//         }

//         var mark = {};
//         if (num_input == "") {
//             mark["couponNum"] = "不限";
//         }
//         else {
//             mark["couponNum"] = Number(num_input).toFixed(0);
//         }
//         mark["limitDate"] = limitDate;
//         mark["grantWay"] = grantWay;
//         mark["products"] = PageExtends.larry;

//         let obj = {
//             storeId: 1,
//             name: "返物",
//             startTime: st,
//             endTime: end,
//             marketingType: 4,
//             limitUser: limitUser,
//             marketingMeta: "[" + JSON.stringify(mark) + "]"
//         };

//         console.log(obj);

//         PromotionApis.promotionInstanceAdd(obj).then(_ => {
//             bridge.dialog({
//                 title: "提示",
//                 content: "提交成功",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }],
//                 complete: function (_data) {
//                     window.location.href = "#/";
//                 }
//             });
//         }).catch(_err => {

//         });

//     })
// }

// function resetStart(data) {
//     console.log(data);

//     var arr1 = ['全部用户', '', '', '门店新用户', '门店老用户'];
//     var arr2 = ['', '仅限店内', '仅限店外', '店内店外'];

//     var data2 = data.marketingMeta.returnProduct;
//     if (typeof data2 == "string") {
//         data2 = JSON.parse(data.marketingMeta.returnProduct);
//     }

//     PageExtends.larry = PageExtends.larry || data2[0].products;
//     PageExtends.num = PageExtends.num || data2[0].couponNum;
//     PageExtends.a1 = PageExtends.a1 || data.limitUser;
//     PageExtends.a2 = PageExtends.a2 || data2[0].grantWay;
//     PageExtends.a3 = PageExtends.a3 || data2[0].limitDate;

//     console.log(PageExtends.larry);
//     var selectFood = "";
//     var l = "";
//     if (PageExtends.larry.length > 0) {
//         selectFood = '已设置';
//         l += `<ul class="yy-all clearfix">`
//         for (var d = 0; d < PageExtends.larry.length; d++) {
//             l += `<li>` + PageExtends.larry[d].productName + `*` + PageExtends.larry[d].productNum + `</li>`;
//         }
//         l += `</ul>`;
//     } else {
//         selectFood = "请选择商品项目";
//     }

//     var h = "";
//     h += `<div class="l-label">
//  <div class="left fl">起始日期</div>
//  <div class="right fr">
//      <span id="start-time">` + PageExtends.st + `</span>
//      <i></i>
//  </div>
//  </div>
//  <div class="l-label">
//  <div class="left fl">终止日期</div>
//  <div class="right fr">
//      <span id="end-time">` + PageExtends.end + `</span>
//      <i></i>
//  </div>
//  </div>

//  <div class="l-label clearfix" id="pick-goods">
//  <div class="left fl">赠送商品</div>
//  <div class="right fr"><span class="span-goods">` + selectFood + `</span><i></i></div>` + l + `
//  </div>
//  </div>


//  <div class="l-label">
//  <div class="left fl">发放数量</div>
//  <div class="right fr">
//  <input type="number" placeholder="不限" value="`+ PageExtends.num + `" id="num-input">张
//  </div>
//  </div>

//  <div class="l-title">
//  <i></i>
//  <span>活动信息</span>
//  </div>

//  <div class="l-label">
//  <div class="left fl">面向用户</div>
//  <div class="right fr">
//      <span id="pick-user">` + arr1[PageExtends.a1] + `</span>
//      <i></i>
//  </div>
//  </div>

//  <div class="l-label">
//  <div class="left fl">发放途径</div>
//  <div class="right fr">
//      <span id="pick-channel">` + arr2[PageExtends.a2] + `</span>
//      <i></i>
//  </div>
//  </div>

//  <div class="l-label">
//  <div class="left fl">有效期限</div>
//  <div class="right fr">
//      <span id="pick-time">领券后` + PageExtends.a3 + `</span>
//      <i></i>
//  </div>
//  </div>

//  <div class="l-foot">
//  <h1>阅读并同意</h1>
//  <em>《xxx营销协议》</em>
//  <span id="btn" class="btn"></span>
//  </div>
//  <button id="btn-yes" class="btn-yes" disabled="disabled">确定并保存</button>`

//     $('.wrap').append(h);

//     var limitUser = data.limitUser;
//     var grantWay = data2[0].grantWay;
//     var limitDate = data2[0].limitDate;

//     //点击设置起始日期
//     $('#start-time').on('click', function () {
//         var $this = $(this);
//         var d = new Date();
//         var str = d.getFullYear() + "," + (d.getMonth() + 1) + "," + d.getDate();

//         bridge.picker({
//             title: "时间设置",
//             data: //单列选取自定义数据
//                 {
//                     type: 'date', //表示自定义输入数据
//                     depth: 3,
//                     start: [str],
//                     end: [2020, 1, 1]
//                 },
//             complete: function (data) {
//                 if (data.resultCode == 'success') {
//                     $this.text(data.selectedValue[0] + '-' + data.selectedValue[1] + '-' + data.selectedValue[2]);
//                 }
//             }
//         });
//     })

//     //点击设置结束日期
//     $('#end-time').on('click', function () {
//         var $this = $(this);
//         var str = $('#start-time').text();
//         if (str == '请设置日期') {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请设置起始日期",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }]
//             });
//             return;
//         }

//         bridge.picker({
//             title: "时间设置",
//             data: //单列选取自定义数据
//                 {
//                     type: 'date', //表示自定义输入数据
//                     depth: 3,
//                     start: [str],
//                     end: [2020, 1, 1]
//                 },
//             complete: function (data) {
//                 if (data.resultCode == 'success') {
//                     $this.text(data.selectedValue[0] + '-' + data.selectedValue[1] + '-' + data.selectedValue[2]);
//                 }
//             }
//         });
//     })

//     //点击选择面向用户
//     $('#pick-user').on('click', function () {
//         var $this = $(this);
//         bridge.picker({
//             title: "面向用户",
//             data: //单列选取自定义数据
//                 {
//                     type: 'items', //表示自定义输入数据
//                     depth: 1,
//                     items: [{
//                         text: '全部用户',
//                         value: '0',
//                     },
//                     {
//                         text: '门店新用户',
//                         value: '3'
//                     },
//                     {
//                         text: '门店老用户',
//                         value: '2'
//                     }
//                     ]
//                 },
//             complete: function (data) {

//                 if (data.resultCode == 'success') {
//                     $this.text(data.resultText[0]);
//                     limitUser = data.selectedValue[0];
//                 }
//             }
//         });
//     })

//     //点击选择发放途径
//     $('#pick-channel').on('click', function () {
//         var $this = $(this);
//         bridge.picker({
//             title: "面向用户",
//             data: //单列选取自定义数据
//                 {
//                     type: 'items', //表示自定义输入数据
//                     depth: 1,
//                     items: [{
//                         text: '仅限店内',
//                         value: '1',
//                     },
//                     {
//                         text: '仅限店外',
//                         value: '2'
//                     },
//                     {
//                         text: '店内店外',
//                         value: '3'
//                     }
//                     ]
//                 },
//             complete: function (data) {

//                 if (data.resultCode == 'success') {
//                     $this.text(data.resultText[0]);
//                     grantWay = data.selectedValue[0];
//                 }
//             }
//         });
//     })

//     //点击选择有效期限
//     $('#pick-time').on('click', function () {
//         var $this = $(this);
//         bridge.picker({
//             title: "有效期限",
//             data: //单列选取自定义数据
//                 {
//                     type: 'items', //表示自定义输入数据
//                     depth: 1,
//                     items: [{
//                         text: '1天',
//                         value: '0',
//                     },
//                     {
//                         text: '2天',
//                         value: '1',
//                     },
//                     {
//                         text: '3天',
//                         value: '2',
//                     },
//                     {
//                         text: '4天',
//                         value: '3',
//                     },
//                     {
//                         text: '5天',
//                         value: '4',
//                     },
//                     {
//                         text: '6天',
//                         value: '5',
//                     },
//                     {
//                         text: '7天',
//                         value: '6',
//                     },
//                     {
//                         text: '8天',
//                         value: '7',
//                     },
//                     {
//                         text: '9天',
//                         value: '8',
//                     },
//                     {
//                         text: '10天',
//                         value: '9',
//                     },
//                     {
//                         text: '11天',
//                         value: '10',
//                     },
//                     {
//                         text: '12天',
//                         value: '11',
//                     },
//                     {
//                         text: '13天',
//                         value: '12',
//                     },
//                     {
//                         text: '14天',
//                         value: '13',
//                     },
//                     {
//                         text: '15天',
//                         value: '14',
//                     }
//                     ]
//                 },
//             complete: function (data) {

//                 if (data.resultCode == 'success') {
//                     $this.text(data.resultText[0]);
//                     limitDate = data.resultText[0];
//                 }
//             }
//         });
//     })

//     //点击同意协议按钮
//     $('#btn').on('click', function () {
//         $(this).toggleClass('active');
//         $('#btn-yes').toggleClass('dis');
//         if ($('#btn-yes.dis').length > 0) {
//             $('#btn-yes').removeAttr('disabled');
//         } else {
//             $('#btn-yes').attr('disabled', 'disabled');
//         }
//     })

//     $('#pick-goods').on('click', function () {
//         PageExtends.st = $('#start-time').text();
//         PageExtends.end = $('#end-time').text();
//         //PageExtends.larry = data2[0].products;
//         PageExtends.num = $('#num-input').val();
//         PageExtends.a1 = limitUser;
//         PageExtends.a2 = grantWay;
//         PageExtends.a3 = limitDate;
//         window.location.href = "#/choosereturn";
//     })


//     $('#btn-yes').on('click', function () {
//         var st = $('#start-time').text();
//         var end = $('#end-time').text();
//         st = new Date(Date.parse(st.replace(/-/g, "/")));
//         st = st.getTime() / 1000;
//         end = new Date(Date.parse(end.replace(/-/g, "/")));
//         end = end.getTime() / 1000;

//         var num_input = $('#num-input').val();
//         var pick_time = $('#pick-time').text();

//         if (!st || !end) {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请设置日期",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }]
//             });
//             return;
//         }

//         if ($('.yy-all li').length <= 0) {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请选择商品项目",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }]
//             });
//             return;
//         }

//         if ($('#pick-user').text() == "请设置面向用户") {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请设置面向用户",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }]
//             });
//             return;
//         }

//         if ($('#pick-channel').text() == "未设置") {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请设置面向用户",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }]
//             });
//             return;
//         }

//         if (pick_time == "未设置") {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请设置有效期",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }]
//             });
//             return;
//         }

//         var mark = {};
//         if (num_input == "") {
//             mark["couponNum"] = "不限";
//         }
//         else {
//             mark["couponNum"] = Number(num_input).toFixed(0);
//         }
//         mark["limitDate"] = limitDate;
//         mark["grantWay"] = grantWay;
//         mark["products"] = PageExtends.larry;

//         let obj = {
//             storeId: 1,
//             name: "返物",
//             startTime: st,
//             endTime: end,
//             marketingType: 4,
//             limitUser: limitUser,
//             marketingMeta: "[" + JSON.stringify(mark) + "]"
//         };
//         console.log(obj);

//         PromotionApis.promotionInstanceAdd(obj).then(_ => {
//             bridge.dialog({
//                 title: "提示",
//                 content: "提交成功",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }],
//                 complete: function (_data) {
//                     window.location.href = "#/";
//                 }
//             });
//         }).catch(_err => {

//         });

//     })



// }

const data1 = [{
    label: '全部用户',
    value: 0,
},
{
    label: '门店新用户',
    value: 3
},
{
    label: '门店老用户',
    value: 2
}];

const data2 = [{
    label: '店内店外',
    value: 3
}, {
    label: '仅限店内',
    value: 1,
},
{
    label: '仅限店外',
    value: 2
}];

const data3 = [{
    label: '当天',
    value: 0,
}, {
    label: '1天',
    value: 1,
},
{
    label: '2天',
    value: 2,
},
{
    label: '3天',
    value: 3,
},
{
    label: '4天',
    value: 4,
},
{
    label: '5天',
    value: 5,
},
{
    label: '6天',
    value: 6,
},
{
    label: '7天',
    value: 7,
},
{
    label: '8天',
    value: 8,
},
{
    label: '9天',
    value: 9,
},
{
    label: '10天',
    value: 10,
},
{
    label: '11天',
    value: 11,
},
{
    label: '12天',
    value: 12,
},
{
    label: '13天',
    value: 13,
},
{
    label: '14天',
    value: 14,
},
{
    label: '15天',
    value: 15,
}];


interface SetFanWuProps {
    storeId: number
}

class SetFanWu extends React.Component<SetFanWuProps, {
    beginDate?: Date;
    endDate?: Date;

    grantWay?: number;
    limitDate?: number;
    limitUser?: number;

    couponNum?: number;

    selected?: { id: number, num: number, name?: string }[]

    chooseFoods: boolean;

    agree: boolean;
}> {

    constructor(props: SetFanWuProps) {
        super(props);
        this.state = {
            chooseFoods: false,
            agree: false
        };
    }

    onSubmit() {
        if (!this.state.beginDate || this.state.beginDate < moment().startOf('day').toDate()) {
            Modal.alert('提示', '开始时间无效');
            return;
        }

        if (!this.state.endDate || this.state.endDate <= this.state.beginDate) {
            Modal.alert('提示', '结束时间无效');
            return;
        }

        if (!this.state.selected || this.state.selected.length < 1) {
            Modal.alert('提示', '未设置赠送商品');
            return;
        }


        if (this.state.couponNum) {
            if (this.state.couponNum < 0) {
                Modal.alert('提示', '发券数量无效');
                return;
            }
        }
        if (this.state.limitUser === undefined) {
            Modal.alert('提示', '面向用户无效');
            return;
        }

        if (this.state.grantWay === undefined) {
            Modal.alert('提示', '发放途径无效');
            return;
        }

        if (this.state.limitDate === undefined) {
            Modal.alert('提示', '有效期限无效');
            return;
        }

        let req: PromotionInstanceAdd = {
            storeId: this.props.storeId,
            name: this.state.selected.map(p => p.name + 'x' + p.num).join() + '兑换券',
            startTime: moment(this.state.beginDate).unix(),
            endTime: moment(this.state.endDate).unix(),
            marketingType: 4,
            limitUser: this.state.limitUser,
            marketingMeta: JSON.stringify([{
                products: this.state.selected.map(p => { return { productId: p.id, productName: p.name, productNum: p.num } }),
                grantWay: this.state.grantWay,
                limitDate: this.state.limitDate,
                couponNum: this.state.couponNum ? this.state.couponNum : 'maxValue'
            }])
        };
        Toast.loading('加载中', 30);
        PromotionApis.promotionInstanceAdd(req).then(_data => {
            Toast.hide();
            Modal.alert('提示', '创建活动成功', [{ text: '确定', onPress: () => { window.location.replace('#/?shopid=' + this.props.storeId) } }]);
        }).catch(err => {
            console.log(err);
            Toast.hide();
            Modal.alert('提示', err.msg);
        });

        return { success: true, msg: 'ok' };
    }

    mainRender() {
        return <div className='setfanwu' data-page='sethongbao' >


            <DatePicker
                mode="date"
                value={this.state.beginDate}
                minDate={moment().startOf('day').toDate()}
                onOk={data => {
                    this.setState({
                        beginDate: data
                    })
                }}
            >
                <div className="l-label">
                    <div className="left fl">起始日期</div>
                    <div className="right fr">
                        <span id="start-time">{this.state.beginDate ? moment(this.state.beginDate).format('YYYY-MM-DD') : '请设置日期'}</span>
                        <i></i>
                    </div>
                </div>
            </DatePicker>

            <DatePicker
                mode="date"
                value={this.state.endDate}
                minDate={this.state.beginDate ? moment(this.state.beginDate).add(1, 'day').subtract(1, 'milliseconds').toDate() : moment().startOf('day').toDate()}
                onOk={data => {
                    this.setState({
                        endDate: data
                    })
                }}
            >
                <div className="l-label">
                    <div className="left fl">终止日期</div>
                    <div className="right fr">
                        <span id="end-time">{this.state.endDate ? moment(this.state.endDate).format('YYYY-MM-DD') : '请设置日期'}</span>
                        <i></i>
                    </div>
                </div>
            </DatePicker>


            <div className="l-label clearfix" onClick={() => this.setState({ chooseFoods: true })}>
                <div className="left fl">赠送商品</div>
                <div className="right fr"><span className="span-goods">{this.state.selected && this.state.selected.length > 0 ? '已设置' : '请选择商品项目'}</span><i></i></div>
            </div>



            <div className="l-label">
                <div className="left fl">发放数量</div>
                <div className="right fr">
                    <input type="text" className="num-input" placeholder="在此输入数量，默认不限" value={this.state.couponNum || ''} onChange={e => this.setState({ couponNum: parseInt(e.target.value) })} />
                </div>
            </div>

            <div className="l-title">
                <i></i>
                <span>活动信息</span>
            </div>

            <Picker
                data={data1}
                cols={1}
                title="面向用户"
                value={this.state.limitUser ? [this.state.limitUser] : undefined}
                onOk={vals => { if (vals && vals.length == 1) { this.setState({ limitUser: vals[0] }) } }}
            >
                <div className="l-label">
                    <div className="left fl">面向用户</div>
                    <div className="right fr">
                        <span id="pick-user">{(data1.find(p => p.value == this.state.limitUser) || { label: '未设置' }).label}</span>
                        <i></i>
                    </div>
                </div>
            </Picker>
            <Picker
                data={data2}
                cols={1}
                title="发放途径"
                value={this.state.grantWay ? [this.state.grantWay] : undefined}
                onOk={vals => { if (vals && vals.length == 1) { this.setState({ grantWay: vals[0] }) } }}
            >
                <div className="l-label">
                    <div className="left fl">发放途径</div>
                    <div className="right fr">
                        <span id="pick-channel">{(data2.find(p => p.value == this.state.grantWay) || { label: '未设置' }).label}</span>
                        <i></i>
                    </div>
                </div>
            </Picker>
            <Picker
                data={data3}
                title="有效期限"
                cols={1}
                value={this.state.limitDate ? [this.state.limitDate] : undefined}
                onOk={vals => { if (vals && vals.length == 1) { this.setState({ limitDate: vals[0] }) } }}
            >
                <div className="l-label">
                    <div className="left fl">有效期限</div>
                    <div className="right fr">
                        <span id="pick-time">{(data3.find(p => { return p.value == this.state.limitDate }) || { label: '未设置' }).label}</span>
                        <i></i>
                    </div>
                </div>
            </Picker>

            <div className="l-foot">
                <h1>阅读并同意</h1>
                <em>《xxx营销协议》</em>
                <Switch checked={this.state.agree} onChange={e => this.setState({ agree: e })} />
            </div>
            <button className={classNames("btn-yes", { 'dis': this.state.agree })} disabled={!this.state.agree} onClick={() => this.onSubmit()}>保存</button>
        </div >
    }

    render() {
        if (this.state.chooseFoods) {
            return <ChooseReturn storeId={this.props.storeId} onEnter={selected => {
                this.setState({
                    selected: selected,
                    chooseFoods: false
                });
            }} />
        } else {
            return this.mainRender();
        }
    }
}

export default SetFanWu;