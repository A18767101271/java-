import '../../sass/SetHomePage.scss';
import PromotionApis, { PromotionInstanceAdd } from '../../../../services/promotion-apis';

import UParams from '../../../../assets/libs/uparams';

//import bridge from '../../../../assets/libs/sardine-bridge';
import { DatePicker, Picker, Switch, Modal, Toast } from 'antd-mobile';
import React from 'react';
import classNames from 'classNames';
import moment from 'moment';

// const $ = (window as any).$;

// function start() {
//     var h = "";
//     h += `<div class="l-label">
//  <div class="left fl">红包类型</div>
//  <div class="right fr">
//     <span class="distt">满减券</span>
//  </div>
//  </div>
//  <div class="l-label">
//  <div class="left fl">起始日期</div>
//  <div class="right fr">
//      <span id="start-time">请设置日期</span>
//      <i></i>
//  </div>
//  </div>
//  <div class="l-label">
//  <div class="left fl">终止日期</div>
//  <div class="right fr">
//      <span id="end-time">请设置日期</span>
//      <i></i>
//  </div>
//  </div>
//  <div class="l-title">
//  <i></i>
//  <span>优惠信息</span>
//  </div>

//  <div class="l-manjian">
//  <div class="l-label">
//  <div class="left fl">满</div>
//  <div class="right fr"><input type="number" placeholder="在此输入金额" class="man-input">元</div>
//  </div>

//  <div class="l-label">
//  <div class="left fl">减</div>
//  <div class="right fr"><input type="number" placeholder="在此输入金额" class="jian-input">元</div>
//  </div>
//  </div>

//  <div class="l-label">
//  <div class="left fl">发券数量</div>
//  <div class="right fr"><input type="number" class="num-input" placeholder="在此输入数量，默认不限" value="" id="num-input"></div>
//  </div>
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
//                 console.log(data);
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
//                         value: '4'
//                     }
//                     ]
//                 },
//             complete: function (data) {
//                 console.log(data);
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
//                 console.log(data);
//                 if (data.resultCode == 'success') {
//                     $this.text(data.resultText[0]);
//                     grantWay = data.selectedValue[0];
//                 }
//             }
//         });
//     })

//     //点击选择有效期
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
//                 console.log(data);
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

//     //提交
//     $('#btn-yes').on('click', function () {
//         var add_input = $('.man-input').val();
//         var reduce_input = $('.jian-input').val();
//         var num_input = $('#num-input').val();
//         var pick_time = $('#pick-time').text();
//         var pick_channel = $('#pick-channel').text();
//         var st = $('#start-time').text();
//         var end = $('#end-time').text();
//         st = new Date(Date.parse(st.replace(/-/g, "/")));
//         st = st.getTime() / 1000;
//         end = new Date(Date.parse(end.replace(/-/g, "/")));
//         end = end.getTime() / 1000;


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

//         if (add_input == "" || reduce_input == "") {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请设置金额",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }]
//             });
//             return;
//         };

//         if (pick_channel == "未设置") {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请设置发放途径",
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



//         let obj1: any = {};
//         let arr: any[] = [];
//         if (num_input == "") {
//             obj1["couponNum"] = "不限";
//         }
//         else {
//             obj1["couponNum"] = Number(num_input).toFixed(0);
//         }
//         obj1["discountAmount"] = Number(reduce_input).toFixed(0);
//         obj1["fullAmount"] = Number(add_input).toFixed(0);
//         obj1["grantWay"] = grantWay;
//         obj1["couponType"] = "满减券";
//         obj1["limitDate"] = limitDate;

//         arr.push(obj1);

//         let obj2 = {
//             storeId: 1,
//             name: "满减券",
//             startTime: st,
//             endTime: end,
//             marketingType: 5,
//             limitUser: limitUser,
//             marketingMeta: JSON.stringify(arr)
//         };

//         console.log(obj2);

//         PromotionApis.promotionInstanceAdd(obj2).then(_data => {
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
//         }).catch(err => console.log(err));

//     })

// }

// function resetStart(data) {
//     console.log(data);
//     var arr1 = ['全部用户', '', '', '门店新用户', '门店老用户'];
//     var arr2 = ['', '仅限店内', '仅限店外', '店内店外'];
//     var data2 = data.marketingMeta.redPacket;
//     if (typeof data2 == "string") {
//         data2 = JSON.parse(data.marketingMeta.redPacket);
//     }

//     var h = "";
//     h += `<div class="l-label">
//  <div class="left fl">红包类型</div>
//  <div class="right fr">
//     <span class="distt">满减券</span>
//  </div>
//  </div>
//  <div class="l-label">
//  <div class="left fl">起始日期</div>
//  <div class="right fr">
//      <span id="start-time">请设置日期</span>
//      <i></i>
//  </div>
//  </div>
//  <div class="l-label">
//  <div class="left fl">终止日期</div>
//  <div class="right fr">
//      <span id="end-time">请设置日期</span>
//      <i></i>
//  </div>
//  </div>
//  <div class="l-title">
//  <i></i>
//  <span>优惠信息</span>
//  </div>

//  <div class="l-manjian">
//  <div class="l-label">
//  <div class="left fl">满</div>
//  <div class="right fr"><input type="number" placeholder="在此输入金额" value="`+ data2[0].fullAmount + `" class="man-input">元</div>
//  </div>

//  <div class="l-label">
//  <div class="left fl">减</div>
//  <div class="right fr"><input type="number" placeholder="在此输入金额" value="`+ data2[0].discountAmount + `" class="jian-input">元</div>
//  </div>
//  </div>

//  <div class="l-label">
//  <div class="left fl">发券数量</div>
//  <div class="right fr"><input type="number" class="num-input" placeholder="在此输入数量" value="`+ data2[0].couponNum + `" id="num-input">张</div>
//  </div>
//  </div>

//  </div>

//  <div class="l-title">
//  <i></i>
//  <span>活动信息</span>
//  </div>

//  <div class="l-label">
//  <div class="left fl">面向用户</div>
//  <div class="right fr">
//      <span id="pick-user">`+ arr1[data.limitUser] + `</span>
//      <i></i>
//  </div>
//  </div>

//  <div class="l-label">
//  <div class="left fl">发放途径</div>
//  <div class="right fr">
//      <span id="pick-channel">`+ arr2[data2[0].grantWay] + `</span>
//      <i></i>
//  </div>
//  </div>

//  <div class="l-label">
//  <div class="left fl">有效期限</div>
//  <div class="right fr">
//      <span id="pick-time">领券后`+ data2[0].limitDate + `</span>
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
//                 console.log(data);
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
//                 console.log(data);
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
//                 console.log(data);
//                 if (data.resultCode == 'success') {
//                     $this.text(data.resultText[0]);
//                     grantWay = data.selectedValue[0];
//                 }
//             }
//         });
//     })

//     //点击选择有效期
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
//                 console.log(data);
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

//     //提交
//     $('#btn-yes').on('click', function () {
//         var add_input = $('.man-input').val();
//         var reduce_input = $('.jian-input').val();
//         var num_input = $('#num-input').val();
//         var pick_time = $('#pick-time').text();
//         var pick_channel = $('#pick-channel').text();
//         var st = $('#start-time').text();
//         var end = $('#end-time').text();
//         st = new Date(Date.parse(st.replace(/-/g, "/")));
//         st = st.getTime() / 1000;
//         end = new Date(Date.parse(end.replace(/-/g, "/")));
//         end = end.getTime() / 1000;


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

//         if (add_input == "" || reduce_input == "") {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请设置金额",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }]
//             });
//             return;
//         };

//         if (pick_channel == "未设置") {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请设置发放途径",
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

//         let obj1: any = {};
//         let arr: any[] = [];

//         if (num_input == "") {
//             obj1["couponNum"] = "不限";
//         }
//         else {
//             obj1["couponNum"] = Number(num_input).toFixed(0);
//         }
//         obj1["discountAmount"] = Number(reduce_input).toFixed(0);
//         obj1["fullAmount"] = Number(add_input).toFixed(0);
//         obj1["grantWay"] = grantWay;
//         obj1["couponType"] = "满减券";
//         obj1["limitDate"] = limitDate;
//         arr.push(obj1);

//         let obj2 = {
//             storeId: 1,
//             name: "满减券",
//             startTime: st,
//             endTime: end,
//             marketingType: 5,
//             limitUser: limitUser,
//             marketingMeta: JSON.stringify(arr)
//         };

//         console.log(obj2);

//         PromotionApis.promotionInstanceAdd(obj2).then(_data => {
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
//         }).catch(err => console.log(err));

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

interface SetHongBaoProps {
    storeId: number
}

export default class SetHongBao extends React.Component<SetHongBaoProps, {
    beginDate?: Date;
    endDate?: Date;
    discountAmount?: number;
    fullAmount?: number;
    couponNum?: number;

    grantWay?: number;
    limitDate?: number;
    limitUser?: number;

    agree: boolean;
}> {
    //name: 'sethongbao',

    constructor(props: SetHongBaoProps) {
        super(props);
        this.state = {
            beginDate: moment().startOf('day').toDate(),
            agree: false
        };
    }

    componentWillMount() {
        let url = UParams();
        if (url.id) {
            PromotionApis.getPromotionDetail({ storeId: this.props.storeId, activityId: url.id }).then(data => {

                if (data.limitUser || data.limitUser === 0) {
                    this.setState({ limitUser: parseInt(data.limitUser) });
                }

                if (data.marketingMeta && data.marketingMeta.redPacket) {
                    let arr = JSON.parse(data.marketingMeta.redPacket);
                    if (arr instanceof Array && arr.length > 0) {
                        let d = arr[0];

                        if (d.fullAmount && d.discountAmount) {
                            this.setState({ fullAmount: parseFloat(d.fullAmount), discountAmount: parseFloat(d.discountAmount) });
                        }

                        if (d.grantWay) {
                            this.setState({ grantWay: parseInt(d.grantWay) });
                        }

                        if (d.limitDate || d.limitDate === 0) {
                            this.setState({ limitDate: parseInt(d.limitDate) });
                        }

                        if (d.couponNum) {
                            this.setState({ couponNum: parseInt(d.couponNum) });
                        }
                    }
                }
            })
        }
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

        if (!this.state.fullAmount || isNaN(this.state.fullAmount) || this.state.fullAmount <= 0) {
            Modal.alert('提示', '满金额无效');
            return;
        }

        if (!this.state.discountAmount || isNaN(this.state.discountAmount) || this.state.discountAmount <= 0 || this.state.discountAmount >= this.state.fullAmount) {
            Modal.alert('提示', '减金额无效');
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
            name: '满' + this.state.fullAmount + '减' + this.state.discountAmount + '优惠券',
            startTime: moment(this.state.beginDate).unix(),
            endTime: moment(this.state.endDate).unix(),
            marketingType: 5,
            limitUser: this.state.limitUser,
            marketingMeta: JSON.stringify([{
                discountAmount: this.state.discountAmount,
                fullAmount: this.state.fullAmount,
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


    render() {
        return (<div className='wrap' data-page='sethongbao' >

            <div className="l-label">
                <div className="left fl">红包类型</div>
                <div className="right fr">
                    <span className="distt">满减券</span>
                </div>
            </div>

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

            <div className="l-title">
                <i></i>
                <span>优惠信息</span>
            </div>

            <div className="l-manjian">
                <div className="l-label">
                    <div className="left fl">满</div>
                    <div className="right fr"><input type="number" placeholder="在此输入金额" className="man-input" value={this.state.fullAmount || ''} onChange={e => this.setState({ fullAmount: parseFloat(e.target.value) })} />元</div>
                </div>

                <div className="l-label">
                    <div className="left fl">减</div>
                    <div className="right fr"><input type="number" placeholder="在此输入金额" className="jian-input" value={this.state.discountAmount || ''} onChange={e => this.setState({ discountAmount: parseFloat(e.target.value) })} />元</div>

                </div>

                <div className="l-label">
                    <div className="left fl">发券数量</div>
                    <div className="right fr"><input type="number" className="num-input" placeholder="在此输入数量，默认不限" value={this.state.couponNum || ''} onChange={e => this.setState({ couponNum: parseInt(e.target.value) })} /></div>
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
        </div>)

    }
};

