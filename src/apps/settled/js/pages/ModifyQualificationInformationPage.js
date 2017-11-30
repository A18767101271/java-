import '../../sass/HomePage.scss';
import PageExtends from '../PageExtends.js';
import bridge from '../../../../assets/libs/sardine-bridge';

function showPass() {
    var data = PageExtends.Info;
    var html = "";
    if (PageExtends.state == 1) {
        html += '<div class="pick-1"><div class="head-bar"><h1>审核中...</h1><span>2-3个工作日内给您答复</span></div>'
    } else {
        html += '<div class="pick-1"><div class="head-bar passing"><h1>审核通过</h1></div>'
    }

    html += '<div class="line title"><h1>身份证</h1></div>' +
        '<div class="line"><h1>身份证姓名</h1><span>' + data.idCardName + '</span></div>' +
        '<div class="line"><h1>身份证号</h1><span>' + data.idCardNo + '</span></div>' +
        '<div class="line"><h1>身份证照</h1><span>已上传</span></div>' +
        '<div class="line title"><h1>营业执照</h1></div>' +
        '<div class="line"><h1>执照名称</h1><span>' + data.businessLicenceName + '</span></div>' +
        '<div class="line"><h1>执照注册号</h1><span>' + data.businessLicenceNo + '</span></div>' +
        '<div class="line"><h1>营业执照</h1><span>已上传</span></div>' +
        '</div>'
    $('.wrap').append(html);
}

function showNoPass() {
    var data = PageExtends.Info;
    if (!data.idCardName) {
        PageExtends.idName = PageExtends.idName || "";
        PageExtends.idNum = PageExtends.idNum || "";
        PageExtends.text2 = PageExtends.text2 || '请上传';
        PageExtends.licenseName = PageExtends.licenseName || "";
        PageExtends.licenseNum = PageExtends.licenseNum || "";
        PageExtends.text3 = PageExtends.text3 || '请上传';

    } else {
        PageExtends.idName = PageExtends.idName || data.idCardName;
        PageExtends.idNum = PageExtends.idNum || data.idCardNo;
        PageExtends.text2 = '已上传';
        PageExtends.licenseName = PageExtends.licenseName || data.businessLicenceName;
        PageExtends.licenseNum = PageExtends.licenseNum || data.businessLicenceNo;
        PageExtends.text3 = '已上传';
    }


    var html = "";

    if (PageExtends.state == 2) {
        html += '<div class="pick-2"><div class="head-bar"><h1>审核失败</h1><span></span></div>'
    } else {
        html += '<div class="pick-2">'
    }

    html += '<section>' +
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
        '<button class="btn-go">保存</button>'

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
        var text1 = $('.upload-id span').text();
        var text2 = $('.upload-business span').text();

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


        if (text1 != "已上传") {
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

        if (text2 != "已上传") {
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
        obj.form_id = PageExtends.Info.formId;
        obj.id_card_name = id_name;
        obj.id_card_no = id_num;
        if (PageExtends.Id1 && PageExtends.Id3) {
            obj.resource_count = 3;
            obj.resource_uids = "facePic_" + PageExtends.Id1 + ',backPic_' + PageExtends.Id2 + ',licencePic_' + PageExtends.Id3;
        } else if (!PageExtends.Id1 && !PageExtends.Id3) {
            obj.resource_count = 0;
        } else {
            if (!PageExtends.Id1) {
                obj.resource_count = 1;
                obj.resource_uids = "licencePic_" + PageExtends.Id3;
            } else {
                obj.resource_count = 2;
                obj.resource_uids = "facePic_" + PageExtends.Id1 + ',backPic_' + PageExtends.Id2;
            }
        }


        obj.business_licence_name = license_name;
        obj.business_licence_no = license_num;
        obj.id_card_type = 1;



        obj.success = function (data) {
            console.log(data);
            if (data.success == true) {
                window.location.href = "#/";
                PageExtends.idName = "";
                PageExtends.idNum = "";
                PageExtends.text2 = '请上传';
                PageExtends.licenseName = "";
                PageExtends.licenseNum = "";
                PageExtends.text3 = '请上传';
                PageExtends.Id1 = '';
                PageExtends.Id2 = '';
                PageExtends.Id3 = '';
            }
        };

        obj.error = function (data) {
            console.log(data);
        }
        PageExtends.API.storeFormCredentialsSave(obj);
    })

}

export default {
    name: 'modifyqualificationinfo',
    render: function () {
        if (PageExtends.state == 1 || PageExtends.state == 3) {
            showPass();
        } else {
            showNoPass();
        }
    }

}