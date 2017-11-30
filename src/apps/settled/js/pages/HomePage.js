import '../../sass/HomePage.scss';
import PageExtends from '../PageExtends.js';
import bridge from '../../../../assets/libs/sardine-bridge';
 
function showIndex() {
    $('.wrap').empty();
    var data = PageExtends.Info;

    var arry = ['已录入', '审核中', '审核失败', '审核通过'];

    var html = "";

    if (!data.shopName) {
        html += `<div class="list list-two">
        <i class="active-no"></i>
            <h1>店铺基本信息</h1>
            <span>待完善</span>
            <em></em>
            </div>`
    } else {
        html += `<div class="list list-two">
        <i class="active` + data.baseInfoStatus + `"></i>
                 <h1>店铺基本信息</h1>
                 <span>` + arry[data.baseInfoStatus] + `</span>
                 <em></em>
             </div>`
    }

    if (!data.telephone) {
        html += `<div class="list list-one">
        <i class="active-no"></i>
         <h1>店铺介绍信息</h1>
         <span>待完善</span>
         <em></em>
     </div>`
    } else {
        html += `<div class="list list-one">
        <i class="active` + data.introductionInfoStatus + `"></i>
                 <h1>店铺介绍信息</h1>
                 <span>` + arry[data.introductionInfoStatus] + `</span>
                 <em></em>
             </div>`
    }

    if (!data.idCardName) {
        html += `<div class="list list-three">
        <i class="active-no"></i>
         <h1>店铺资质</h1>
         <span>待完善</span>
         <em></em>
     </div>`
    } else {
        html += `<div class="list list-three">
        <i class="active` + data.credentialsInfoStatus + `"></i>
                 <h1>店铺资质</h1>
                 <span>` + arry[data.credentialsInfoStatus] + `</span>
                 <em></em>
             </div>`
    }

    html += '<button class="btn-go">提交审核</button>'

    $('.wrap').append(html);

    if (data.baseInfoStatus == 1 && data.introductionInfoStatus == 1 && data.credentialsInfoStatus == 1) {
        var h = '<p class="tip-t">审核已提交，我们会在3个工作日给你答复</p>';
        $('.wrap').append(h);
        $('.btn-go').hide();
    }

    if (data.baseInfoStatus == 3 && data.introductionInfoStatus == 3 && data.credentialsInfoStatus == 3) {
        var h = '<p class="tip-h">恭喜您已通过审核您还未和平台签署合作协议，我司工作人员会尽早与您取得联系并签署合约</p>';
        $('.wrap').append(h);
        $('.btn-go').hide();
    }

    $('.list').on('click', function () {
        var $this = $(this);
        if ($this.hasClass('list-one')) {
            PageExtends.state = data.introductionInfoStatus;
            window.location.href = "#/modifyshopinfo";
        }
        if ($this.hasClass('list-two')) {
            PageExtends.state = data.baseInfoStatus;
            window.location.href = "#/modifyshopintro";
        }
        if ($this.hasClass('list-three')) {
            PageExtends.state = data.credentialsInfoStatus;
            window.location.href = "#/modifyqinfo";
        }

    });

    $('.btn-go').on('click', function () {
        if (data.shopName && data.telephone && data.idCardName) {
            var obj = {};
            obj.form_id = data.formId;
            obj.success = function (data) {

                    bridge.dialog({
                        title: "提示",
                        content: "提交成功！",
                        type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                        buttons: [{
                            text: 'ok'
                        }],
                    });

                    var obj = {};
                    obj.success = function (data) {
                        PageExtends.Info = data.data;
                        if (data.success == false) {
                            window.location.href = "#/ready";
                        } else {
                            showIndex();
                        }
                    }
                    obj.error = function (data) {}
                    PageExtends.API.storeFormSingleGet(obj);


                },
                obj.error = function (data) {

                }
            PageExtends.API.storeFormApprovalSubmit(obj);

        } else {
            bridge.dialog({
                title: "提示",
                content: "请填写完整信息",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }],
            });
        }
    })

}

export default {
    name: 'home',
    render: function () {

        var obj = {};
        obj.success = function (data) {

            PageExtends.Info = data.data;
            if (data.success == false) {
                window.location.href = "#/ready";
            } else {
                showIndex();
            }
        }
        obj.error = function (data) {
            console.log(data)
        }
        PageExtends.API.storeFormSingleGet(obj);

    }

}