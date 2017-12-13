import '../../sass/HomePage.scss';
import React from 'react';
import { Switch, Picker, Modal } from 'antd-mobile';
import PickTimeData from '../BizTimePickerData';
import classNames from 'classNames';
//import PageExtends from '../PageExtends.js';
//import bridge from '../../../../assets/libs/sardine-bridge';


// function showIndex() {

//     var html = "";
//     html += `<div class="head">
//         <span class="fl">24小时</span>
//         <i class="btn fr"></i>
//     </div>
//     <div class="le"></div>
//     <div class="section">
//     </div>
//     <button class="btn-go">确定</button>`

//     $('.wrap').append(html);

//     var pick = "";
//     pick += `<div class="s-1">
//          <div class="h">
//              <span class="fl">第一时段</span>
//              <i class="fr icon-i"></i>
//          </div>
//          <div class="pick">无</div>
//      </div>
//      <div class="le"></div>
//      <div class="s-2">
//          <div class="h">
//              <span class="fl">第二时段</span>
//              <i class="fr icon-i"></i>
//          </div>
//          <div class="pick">无</div>
//      </div>`

//     $('.section').append(pick);

//     pickTime();

//     $('.btn').on('click', function () {
//         $(this).toggleClass('active');
//         if ($(this).hasClass('active')) {
//             $('.section').empty();
//         } else {
//             $('.section').append(pick);
//             pickTime();
//         }
//     })


//     $('.btn-go').on('click', function () {
//         var flag = $('.btn').hasClass('active');
//         var stTime = $('.s-1 .pick').text();
//         var edTime = $('.s-2 .pick').text();

//         if (flag) {
//             PageExtends.time = "24小时";
//             PageExtends.first_business_time = "0000,0000";
//             PageExtends.second_business_time = "0000,0000";
//             window.history.go(-1);
//         }

//         if (stTime.length > 1) {

//             if ($('.s-2 .pick').text().length <= 1) {
//                 PageExtends.time = $('.s-1 .pick').text();
//                 PageExtends.second_business_time = "0000,0000";
//             } else {
//                 PageExtends.time = $('.s-1 .pick').text() + "," + $('.s-2 .pick').text();
//             }

//             window.history.go(-1);

//         } else {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请选择营业时间",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }],
//                 complete: function (data) {
//                     console.log(data);
//                 }
//             });
//         }
//     })

// }

// function pickTime() {
//     $('.s-1 .pick').on('click', function () {
//         $('.s-2 .pick').text("无");
//         $('.s-2').removeClass('active');
//         pop();
//     })

//     $('.s-2 .pick').on('click', function () {
//         var time = $('.s-1 .pick').text();
//         if (time.indexOf("次日") > 0 || time.length <= 1) return;
//         var sT = time.split('~')[0];
//         var eT = time.split('~')[1];
//         pop2(sT, eT);
//     })
// }

// function pop() {
//     var h = "";
//     h += '<div class="pop">' +
//         '<div class="shadow" ></div >' +
//         ' <div class="pop-contain">' +
//         '<div class="pop-head">' +
//         ' <span class="title lf">取消</span>' +
//         ' <span class="title lr">确定</span>' +
//         '</div>' +
//         '<h1 class="sw-1">开始时间</h1>' +
//         '<div class="swiper-container1" >' +
//         '<div class="swiper-wrapper">' +
//         ' </div >' +
//         ' </div >' +
//         '<h1 class="sw-2">结束时间</h1>' +
//         '<div class="swiper-container2" >' +
//         '<div class="swiper-wrapper">' +

//         ' </div >' +
//         ' </div >' +
//         ' </div>' +
//         ' </div >'

//     $('.wrap').append(h);


//     var arr = [];
//     var sw1 = "";
//     var sw2 = "";
//     for (var i = 0; i <= 23; i++) {
//         if (i < 10) {
//             arr.push('0' + i + ':00');
//             arr.push('0' + i + ':30');
//         } else {
//             arr.push(i + ':00');
//             arr.push(i + ':30');
//         }
//     }


//     for (var i in arr) {
//         sw1 += '<div class="swiper-slide">' + arr[i] + '</div>';
//     }
//     $('.swiper-container1 .swiper-wrapper').append(sw1);

//     for (var i in arr) {
//         if (arr[i] == "00:00") continue;
//         sw2 += '<div class="swiper-slide">' + arr[i] + '</div>';
//     }

//     $('.swiper-container2 .swiper-wrapper').append(sw2);

//     var mySwiper1 = new Swiper('.swiper-container1', {
//         direction: 'vertical',
//         slidesPerView: 3, //'auto'
//         centeredSlides: true,
//         onSlideChangeEnd: function (swiper) {
//             $('.swiper-container2 .swiper-wrapper').empty();
//             var arrEnd1 = [];
//             var arrEnd2 = [];
//             var arrEnd = [];
//             var swEnd = "";
//             var time = $('.swiper-container1 .swiper-slide-active').text();
//             var h = time.split(':')[0];
//             var m = time.split(':')[1];
//             var num = arr.indexOf(time);

//             arrEnd1 = arr.slice(0, num);
//             arrEnd2 = arr.slice(num + 1, arr.length);
//             for (var q = 0; q < arrEnd1.length; q++) {
//                 arrEnd1[q] = "次日" + arrEnd1[q];
//             }
//             arrEnd = arrEnd2.concat(arrEnd1);

//             for (var i in arrEnd) {
//                 swEnd += '<div class="swiper-slide">' + arrEnd[i] + '</div>';
//             }

//             $('.swiper-container2 .swiper-wrapper').append(swEnd);
//             mySwiper2.slideTo(0, 1000, false);
//         }

//     });


//     var mySwiper2 = new Swiper('.swiper-container2', {
//         direction: 'vertical',
//         slidesPerView: 3, //'auto'
//         centeredSlides: true,
//         observer: true,
//     });


//     $('.lf').on('click', function () {
//         $('.pop').remove();
//     });

//     $('.lr').on('click', function () {
//         var startTime = $('.swiper-container1 .swiper-slide-active').text();
//         var endTime = $('.swiper-container2 .swiper-slide-active').text();

//         if (endTime.indexOf('次日') > -1) {
//             PageExtends.second_business_time = "0000,0000";
//             PageExtends.first_business_time = startTime.split(':')[0] + startTime.split(':')[1] + ',' + (Number(endTime.split(':')[0].substring(2, 4)) + 24) + endTime.split(':')[1];
//         } else {
//             PageExtends.first_business_time = startTime.split(':')[0] + startTime.split(':')[1] + ',' + endTime.split(':')[0] + endTime.split(':')[1];
//         }

//         $('.s-1 .pick').text(startTime + "~" + endTime);
//         $('.s-1').addClass('active');
//         $('.pop').remove();
//     });


// }

// function pop2(a, b) {
//     var h = "";
//     h += '<div class="pop">' +
//         '<div class="shadow" ></div >' +
//         ' <div class="pop-contain">' +
//         '<div class="pop-head">' +
//         ' <span class="title lf">取消</span>' +
//         ' <span class="title lr">确定</span>' +
//         '</div>' +
//         '<h1 class="sw-1">开始时间</h1>' +
//         '<div class="swiper-container1" >' +
//         '<div class="swiper-wrapper">' +
//         ' </div >' +
//         ' </div >' +
//         '<h1 class="sw-2">结束时间</h1>' +
//         '<div class="swiper-container2" >' +
//         '<div class="swiper-wrapper">' +

//         ' </div >' +
//         ' </div >' +
//         ' </div>' +
//         ' </div >'

//     $('.wrap').append(h);


//     var arr = [];

//     for (var i = 0; i <= 23; i++) {

//         if (i < 10) {
//             arr.push('0' + i + ':00');
//             arr.push('0' + i + ':30');
//         } else {
//             arr.push(i + ':00');
//             arr.push(i + ':30');
//         }

//     }

//     var arr2 = [];
//     var arr3 = [];
//     var arrDefault = [];


//     arr2 = arr.slice(arr.indexOf(b) + 1, arr.length);
//     arr3 = arr.slice(0, arr.indexOf(a));

//     arrDefault = arr2.slice(arr2.indexOf(b) + 2, arr2.length);

//     for (var q = 0; q < arr3.length; q++) {
//         arr3[q] = "次日" + arr3[q];
//     }

//     var sw1 = "";
//     for (var i in arr2) {
//         sw1 += '<div class="swiper-slide">' + arr2[i] + '</div>';
//     }

//     for (var i in arr3) {
//         sw1 += '<div class="swiper-slide">' + arr3[i] + '</div>';
//     }

//     $('.swiper-container1 .swiper-wrapper').append(sw1);

//     var sw2 = "";
//     for (var i in arrDefault) {
//         sw2 += '<div class="swiper-slide">' + arrDefault[i] + '</div>';
//     }

//     for (var i in arr3) {
//         sw2 += '<div class="swiper-slide">' + arr3[i] + '</div>';
//     }

//     $('.swiper-container2 .swiper-wrapper').append(sw2);

//     var mySwiper1 = new Swiper('.swiper-container1', {
//         direction: 'vertical',
//         slidesPerView: 3, //'auto'
//         centeredSlides: true,
//         onSlideChangeEnd: function (swiper) {
//             $('.swiper-container2 .swiper-wrapper').empty();
//             var time = $('.swiper-container1 .swiper-slide-active').text();
//             var h = time.split(':')[0];
//             var m = time.split(':')[1];
//             var conta = arr2.concat(arr3);
//             var num = conta.indexOf(time);
//             var arrEnd = [];
//             var html = "";
//             arrEnd = conta.slice(num + 1, conta.length);
//             for (var i in arrEnd) {
//                 html += '<div class="swiper-slide">' + arrEnd[i] + '</div>';
//             }

//             $('.swiper-container2 .swiper-wrapper').append(html);
//             mySwiper2.slideTo(0, 1000, false)
//         }


//     });


//     var mySwiper2 = new Swiper('.swiper-container2', {
//         direction: 'vertical',
//         slidesPerView: 3, //'auto'
//         centeredSlides: true,
//         observer: true,
//     });


//     $('.lf').on('click', function () {
//         $('.pop').remove();
//     });

//     $('.lr').on('click', function () {
//         var startTime = $('.swiper-container1 .swiper-slide-active').text();
//         var endTime = $('.swiper-container2 .swiper-slide-active').text();

//         if (!endTime) {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请选择结束时间",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }],
//                 complete: function (data) {
//                     console.log(data);
//                 }
//             });
//             return;
//         }

//         if (startTime.indexOf('次日') > -1) {
//             PageExtends.second_business_time = (Number(startTime.split(':')[0].substring(2, 4)) + 24) + startTime.split(':')[1] + ',' + (Number(endTime.split(':')[0].substring(2, 4)) + 24) + endTime.split(':')[1];
//         } else {
//             if (endTime.indexOf('次日') > -1) {
//                 PageExtends.second_business_time = startTime.split(':')[0] + startTime.split(':')[1] + ',' + (Number(endTime.split(':')[0].substring(2, 4)) + 24) + endTime.split(':')[1];
//             } else {
//                 PageExtends.second_business_time = startTime.split(':')[0] + startTime.split(':')[1] + ',' + endTime.split(':')[0] + endTime.split(':')[1];
//             }

//         }



//         $('.s-2 .pick').text(startTime + "~" + endTime);
//         $('.s-2').addClass('active');
//         $('.pop').remove();
//     });


// }

export function formatTimeText(beginHours: number, beginMinutes: number, endHours: number, endMinutes: number) {
    const tnum = (v: number, ish: boolean) => { return ish && v >= 24 ? '次日' + (v - 24) : v < 10 ? '0' + v : v + '' }
    return tnum(beginHours, true) + ':' + tnum(beginMinutes, false) + '-' + tnum(endHours, true) + ':' + tnum(endMinutes, false);
}

export interface BizTimeItem {
    beginHours: number;
    beginMinutes: number;
    endHours: number;
    endMinutes: number;
    formatText?: string;
}

interface PickTimePageProps {
    in24th?: boolean;
    times?: BizTimeItem[];
    onEnter?: (value: { is24th: boolean, times?: BizTimeItem[] }) => void;
}

export default class PickTimePage extends React.Component<PickTimePageProps, {
    in24th: boolean;
    times: BizTimeItem[];
}> {
    //name: 'picktime',
    constructor(props: PickTimePageProps) {
        super(props);
        this.state = {
            in24th: props.in24th === undefined ? true : !!props.in24th,
            times: props.in24th ? [] : props.times ? props.times : []
        };
        this.state.times.forEach(item => {
            item.formatText = formatTimeText(item.beginHours, item.beginMinutes, item.endHours, item.endMinutes);
        });
    }

    on24thChange(checked: boolean) {
        this.setState({
            in24th: checked,
            times: []
        });
    }


    onTimePanelSet(timeIndex: number, beginHours: number, beginMinutes: number, endHours: number, endMinutes: number) {
        // const tstate = this.state.timeStates[timeIndex];
        const times = Object.assign([], this.state.times) as BizTimeItem[];
        times[timeIndex] = {
            beginHours: beginHours,
            beginMinutes: beginMinutes,
            endHours: endHours,
            endMinutes: endMinutes,
            formatText: formatTimeText(beginHours, beginMinutes, endHours, endMinutes)
        }
        this.setState({ times: times });
    }

    onSubmit() {

        if (this.state.in24th) {
            this.props.onEnter && this.props.onEnter({ is24th: true });
        } else {
            let times = this.state.times ? this.state.times : [];
            if (!times.length || times.length < 1) {
                Modal.alert('提示', '请选择营业时间');
                return;
            }
            times = times.sort((a, b) => { return a.beginHours * 100 + a.beginMinutes - b.beginHours * 100 + b.beginMinutes });
            for (let i = 0; i < times.length - 1; i++) {
                let s1 = times[i].beginHours * 100 + times[i].beginMinutes;
                let e1 = times[i].endHours * 100 + times[i].endMinutes;

                for (let j = i + 1; j < times.length; j++) {

                    let s2 = times[j].beginHours * 100 + times[j].beginMinutes;
                    let e2 = times[j].endHours * 100 + times[j].endMinutes;

                    if (s1 == s2 || e1 == e2 || (s1 < s2 && e1 > s2) ||
                        (s1 < e2 && e1 > e2) || (s1 < s2 && e1 > e2) || (s1 > s2 && e1 < e2) || e2 >= (s1 + 2400)) {
                        Modal.alert('提示', '营业时间不能重叠');
                        return;
                    }
                }
            }
            this.props.onEnter && this.props.onEnter({ is24th: false, times: times });
        }

    }

    render() {

        let self = this;


        function TimePanel(props: { text: string, timeIndex: number }) {
            const tstate = self.state.times[props.timeIndex];


            return <div className={classNames("s-1", {
                "active": !!tstate
            })}>
                <div className="h">
                    <span className="fl">{props.text}</span>
                    <i className="fr icon-i"></i>
                </div>

                <Picker
                    title={props.text}
                    data={PickTimeData}
                    cols={5}
                    value={tstate ? [tstate.beginHours, tstate.beginMinutes, 0, tstate.endHours, tstate.endMinutes] : undefined}
                    onOk={vals => {
                        if (vals.length === 5) {
                            self.onTimePanelSet(props.timeIndex, vals[0], vals[1], vals[3], vals[4]);
                        }
                    }}
                >
                    <div className="pick">{tstate ? tstate.formatText : '无'}</div>
                </Picker>
            </div>
        }

        return <div className="wrap" data-page='picktime'>
            <div className="head">
                <span className="fl">24小时</span>
                <Switch
                    className="fr"
                    checked={!!this.state.in24th}
                    onClick={(checked) => {
                        this.on24thChange(!!checked);
                    }} />
            </div>
            <div className="le"></div>
            {
                !this.state.in24th ? <div className="section">
                    <TimePanel timeIndex={0} text="第一时段" />
                    <div className="le"></div>
                    <TimePanel timeIndex={1} text="第二时段" />
                </div> : undefined
            }
            <button className="btn-go" onClick={() => this.onSubmit()} >确定</button>
        </div>
    }
}