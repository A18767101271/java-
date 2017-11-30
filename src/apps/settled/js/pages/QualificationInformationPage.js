import '../../sass/HomePage.scss';
import PageExtends from '../PageExtends.js';
import bridge from '../../../../assets/libs/sardine-bridge';

function showIndex() {

    PageExtends.idName = PageExtends.idName || "";
    PageExtends.idNum = PageExtends.idNum || "";
    PageExtends.text2 = PageExtends.text2 || '请上传';
    PageExtends.licenseName = PageExtends.licenseName || "";
    PageExtends.licenseNum = PageExtends.licenseNum || "";
    PageExtends.text3 = PageExtends.text3 || '请上传';

    var html = "";
    html += '<header><span></span></header>' +
        ' <section>' +
        ' <div class="title"><i></i><span>店铺信息</span></div>' +
        ' <div class="line">' +
        '     <h1>身份证姓名</h1><input type="text" placeholder="请输入身份证姓名" id="id-name" value=' + PageExtends.idName + '>' +
        ' </div>' +
        ' <div class="line">' +
        '     <h1>身份证号</h1><input type="text" placeholder="请输入身份证号" id="id-num"  value=' + PageExtends.idNum + '>' +
        ' </div>' +
        ' <div class="line upload-id">' +
        '     <h1>身份证照</h1><i></i><span>' + PageExtends.text2 + '</span>' +
        ' </div>' +
        ' <div class="title"><i></i><span>营业执照</span></div>' +
        ' <div class="line">' +
        '     <h1>执照名称</h1><input type="text" placeholder="请输入执照名称" id="license-name"  value=' + PageExtends.licenseName + '>' +
        ' </div>' +
        ' <div class="line">' +
        '     <h1>执照注册号</h1><input type="num" placeholder="请输入执照注册号" id="license-num" value=' + PageExtends.licenseNum + '>' +
        ' </div>' +
        ' <div class="line upload-business">' +
        '     <h1>营业执照</h1><i></i><span>' + PageExtends.text3 + '</span>' +
        ' </div>' +
        '</section>' +
        '<button class="btn-go">提交</button>'

    $('.wrap').append(html);

    $('.upload-id').on("click", function () {
        PageExtends.idName = $('#id-name').val();
        PageExtends.idNum = $('#id-num').val();
        PageExtends.licenseName = $('#license-name').val();
        PageExtends.licenseNum = $('#license-num').val();
        PageExtends.text3 = $('.upload-business span').text();
        window.location.href = "#/upcard";
    });

    $('.upload-business').on('click', function () {
        PageExtends.idName = $('#id-name').val();
        PageExtends.idNum = $('#id-num').val();
        PageExtends.text2 = $('.upload-id span').text();
        PageExtends.licenseName = $('#license-name').val();
        PageExtends.licenseNum = $('#license-num').val();
        window.location.href = "#/upbusin";
    });

    $('.btn-go').on('click', function () {

        var id_name = $('#id-name').val();
        var id_num = $('#id-num').val();
        var license_name = $('#license-name').val();
        var license_num = $('#license-num').val();

        if (!id_name) {
            bridge.dialog({
                title: "提示",
                content: "请输入身份证姓名！",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }],
            });
            return;
        }

        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(id_num))) {
            bridge.dialog({
                title: "提示",
                content: "请输入正确的身份证号！",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }],
            });
            return;
        }


        if (!PageExtends.Id1) {
            bridge.dialog({
                title: "提示",
                content: "请上传身份证照片！",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }],
            });
            return;
        }

        if (!license_name) {
            bridge.dialog({
                title: "提示",
                content: "请输入执照名称！",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }],
            });
            return;
        }

        if (!license_num) {
            bridge.dialog({
                title: "提示",
                content: "请输入执照注册号！",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }],
            });
            return;
        }

        if (!PageExtends.Id3) {
            bridge.dialog({
                title: "提示",
                content: "请上传营业执照！",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }],
            });
            return;
        }

        var obj = {};
       
        obj.form_id = PageExtends.formId;    
        obj.id_card_name = id_name;     
        obj.id_card_no = id_num;    
        obj.resource_count = 3;
        obj.resource_uids = "facePic_" + PageExtends.Id1 + ',backPic_' + PageExtends.Id2 + ',licencePic_' + PageExtends.Id3;     
        obj.business_licence_name = license_name;     
        obj.business_licence_no = license_num;     
        obj.id_card_type = 1;

        obj.success = function (data) {
            console.log(data);
            if (data.success == true) {
                var obj = {};
                obj.form_id = PageExtends.formId;
                obj.success = function (data) {
                        bridge.dialog({
                            title: "提示",
                            content: "提交成功！",
                            type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                            buttons: [{
                                text: 'ok'
                            }],
                        });
                        window.location.href = "#/";
                    },
                    obj.error = function (data) {
                        console.log(data);
                    }
                PageExtends.API.storeFormApprovalSubmit(obj);
            }
        };
        obj.error = function (data) {
            console.log(data);
        }

        PageExtends.API.storeFormCredentialsSave(obj);
    })

}

export default {
    name: 'qualificationinfo',
    render: function () {
        showIndex();
    }

}