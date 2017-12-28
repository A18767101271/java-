import PromotionApis from '../../../../services/promotion-apis';
import moment from 'moment';
import bridge from '../../../../assets/libs/sardine-bridge';
import UParams from '../../../../assets/libs/uparams';

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

function FWFn(data: any) {
    var exampleId = data.activityId;
    var h = "";
    var timestamp = (new Date().getTime() / 1000);
    var st = data.startTime;
    var ed = data.endTime;
    var arr1 = ['', '仅限店内', '仅限店外', '店内店外'];
    var arr2 = ['全部用户', '', '门店老用户', '门店新用户'];
    var data2 = data.marketingMeta.returnProduct;
    if (typeof data2 == "string") {
        data2 = JSON.parse(data.marketingMeta.returnProduct);
    }
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
        </div>`

    var ht = "";

    for (var i = 0; i < data2[0].products.length; i++) {
        ht += `<span>` + data2[0].products[i].productName + `*` + data2[0].products[i].productNum + `</span>` + ` `;
    }

    h += `<div class="line special clearfix">
        <div class="left">商品项目：</div>
        <div class="right clearfix">`+ ht + `</div>
        </div>  
        <div class="line">
        <div class="left">发放途径：</div>
        <div class="right">`+ arr1[data2[0].grantWay] + `</div>
        </div>    
        <div class="line">
            <div class="left">面向用户：</div>
            <div class="right">`+ arr2[data.limitUser] + `</div>
        </div>
        <div class="line">
        <div class="left">有效期限：</div>`

    if (data2[0].limitDate == 0) {
        h += `<div class="right">当天</div>`
    }
    else {
        h += `<div class="right">领券后` + data2[0].limitDate + `天</div>`
    }

    h += `</div>
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
        let parms = UParams();
        window.location.href = "#/setfanwu?id=" + exampleId + '&shopid=' + parms.shopid;;
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
                             <span>发放数量</span>
                         </td>
                         <td>
                             <i class="icon-2"></i
                             <span>核销数量</span>
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
                     <span>发放数量</span>
                 </td>
                 <td>
                     <i class="icon icon-3"></i>
                     <span>核销数量</span>
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
                         <span>发放数量</span>
                     </td>
                     <td>
                         <i class="icon-2"></i
                         <span>核销数量</span>
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
                 <span>发放数量</span>
             </td>
             <td>
                 <i class="icon icon-3"></i>
                 <span>核销数量</span>
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

export default FWFn;
