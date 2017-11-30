import PromotionApis from '../../../../services/promotion-apis';
 
import '../console.log.js';
import moment from 'moment';

import bridge from '../../../../assets/libs/sardine-bridge';

const $ = (window as any).$;


function headBar(t1, t2, t) {
    var h = "";
    if (t1 <= t && t < t2) {
        if ((t2 - t) > 259200) {
            h += `<div class="headbar blue">活动进行中</div>
                  <button class="btn blue btn-end">提前终止</button>`
        } else {
            var n = Math.ceil((t2 - t) / 86400);
            h += `<div class="headbar red">剩余` + n + `天</div>
            <button class="btn red btn-end">提前终止</button>`
        }

    } else {
        if ((t1 - t) > 259200) {
            h += `<div class="headbar hui">` + moment(t1 * 1000).format('YYYY-MM-DD') + `开启</div>`
        } else {
            var n = Math.ceil((t1 - t) / 86400);
            h += `<div class="headbar hui">距开始` + n + `天</div>`
        }
    }

    return h;
}

function HBFn(data: any) {
    var exampleId = data.activityId;
    var h = "";
    var timestamp = (new Date().getTime() / 1000);
    var st = data.startTime;
    var ed = data.endTime;
    var data2 = data.marketingMeta.redPacket;
    if (typeof data2 == "string") {
        data2 = JSON.parse(data.marketingMeta.redPacket);
    }
    var arr1 = ['仅限店内', '仅限店外', '店内店外'];
    var arr2 = ['全部用户', '', '', '门店新用户', '门店老用户'];

    if (data.status == 2) {
        h += `<div class="headbar red">已结束</div>
              <button class="btn red btn-reset">重新上架</button>`
    }
    else {
        h += headBar(st, ed, timestamp);
    }
    h += `<div class="part1 clearfix">
        <div class="line">
            <div class="left">活动日期：</div>
            <div class="right">` + moment(st * 1000).format('YYYY.MM.DD') + `~` + moment(ed * 1000).format('YYYY.MM.DD') + `</div>
        </div>
        <div class="line">
            <div class="left">创建日期：</div>
            <div class="right">`+ moment(data.gmtCreate * 1000).format('YYYY.MM.DD') + `</div>
        </div>
        <div class="line">
            <div class="left">发放数量：</div>
            <div class="right">`+ data2[0].couponNum + `个</div>
        </div>
        <div class="line">
            <div class="left">发放奖励：</div>
            <div class="right">满`+ data2[0].fullAmount + `减` + data2[0].discountAmount + `优惠券</div>
        </div>
        <div class="line">
            <div class="left">面向用户：</div>
            <div class="right">`+ arr2[data.limitUser] + `</div>
        </div>
        <div class="line">
            <div class="left">发放途径：</div>
            <div class="right">`+ arr1[data2[0].grantWay] + `</div>
        </div>
        <div class="line">
            <div class="left">有效期限：</div>
            <div class="right">领券后`+ data2[0].limitDate + `日</div>
        </div>
    </div>
    <div class="br"></div>`

    $('.wrap').append(h);

    $('.btn-end').on('click', function () {
        bridge.dialog({
            title: "提示",
            content: "您确认提前终止该项活动？",
            type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
            buttons: [{
                text: '取消',
            },
            {
                text: '确定',
            }],
            complete: function (data) {
                if (data.buttonIndex == 1) {
                    PromotionApis.promotionInstanceClose({
                        storeId: 1,
                        instanceId: exampleId
                    }).then(_data => {
                        bridge.dialog({
                            title: "提示",
                            content: "操作成功",
                            type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                            buttons: [{
                                text: 'ok'
                            }],
                            complete: function (_) {
                                window.location.href = "#/";
                            }
                        });
                    })
                }
            }
        });
        return;
    })

    $('.btn-reset').on('click', function () {
        window.location.href = "#/sethongbao?id=" + exampleId;
    })

    PromotionApis.getPromotionInstanceRecord({
        storeId: 1,
        activityId: exampleId
    }).then(item => {
        let html = "";

        if (item.length <= 0) {
            html += `<div class="part2 clearfix">
            <i class="blue"></i>
            <h1>活动概况</h1>
             <table class="tab">
               <tr>
                         <td>
                             <i class="icon-1"></i
                             <span>红包发放</span>
                         </td>
                         <td>
                             <i class="icon-2"></i
                             <span>使用个数</span>
                         </td>
                     </tr>
                     <tr>
                         <td>
                             <span>无</span>
                         </td>
                         <td>
                             <span>无</span>
                         </td>
                     </tr>
             </table>
         </div>
         <div class="br"></div>
         <div class="part3 clearfix">
             <i class="blue"></i>
             <h1>订单概况</h1>
             <table class="tab">       
                     <tr>
                     <td>
                     <i class="icon icon-1"></i>
                     <span>日期</span>
                 </td>
                 <td>
                     <i class="icon icon-2"></i>
                     <span>红包发放</span>
                 </td>
                 <td>
                     <i class="icon icon-3"></i>
                     <span>使用个数</span>
                 </td>
                     </tr>
    
            <tr><td><span>无</span></td><td><span>无</span></td><td><span>无</span></td></tr>
                
    
               </table>
               </div>`
        }

        else {
            html += `<div class="part2 clearfix">
         <i class="blue"></i>
         <h1>活动概况</h1>
         <table class="tab">
           <tr>
                     <td>
                         <i class="icon-1"></i
                         <span>红包发放</span>
                     </td>
                     <td>
                         <i class="icon-2"></i
                         <span>使用个数</span>
                     </td>
                 </tr>
                 <tr>
                     <td>
                         <span>` + item.totalOrderNum + `个</span>
                     </td>
                     <td>
                         <span>` + item.totalWastePrice + `个</span>
                     </td>
                 </tr>
         </table>
              </div>
              <div class="br"></div>
              <div class="part3 clearfix">
                  <i class="blue"></i>
                  <h1>订单概况</h1>
                  <table class="tab">       
                          <tr>
                          <td>
                          <i class="icon icon-1"></i>
                          <span>日期</span>
                      </td>
                      <td>
                          <i class="icon icon-2"></i>
                          <span>红包发放</span>
                      </td>
                      <td>
                          <i class="icon icon-3"></i>
                          <span>使用个数</span>
                      </td>
                          </tr>`

            for (var i = 0; i < item.detailRecord.length; i++) {
                html += `<tr><td><span>` + moment(item.detailRecord[i].date * 1000).format('MM.DD') + `</span></td><td><span>` + item.detailRecord[i].orderNum + `笔</span></td><td><span>` + item.detailRecord[i].wastePrice / 100 + `元</span></td></tr>`;
            }

            html += `</table>
                              </div>`
        }
        $('.wrap').append(html);

    });

}

export default HBFn;