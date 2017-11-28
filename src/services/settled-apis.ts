import request from './api-request';

interface GetFormListRequest {
    pageNumber: number,
    pageSize: number,
    start: number,
    end: number
}

interface CreateFormRequest {
    shopName: string,
    categoryId: number,
    categoryName: string,
    subCategoryId: number,
    subCategoryName: string,
    provinceId: number,
    cityId: number,
    districtId: number,
    clientLocation?: {
        lng: number,
        lat: number
    }
}

interface SaveFormIntroductionRequest {
    formId: number,
    shopName: string,
    categoryId: number,
    categoryName: string,
    subCategoryId: number,
    subCategoryName: string,
    provinceId: number,
    cityId: number,
    districtId: number,
}

interface SaveFormBaseRequest {
    formId: number,
    telephone: string,
    address: string,
    storeLocation: {
        lng: number,
        lat: number
    },
    firstBusinessTime?: {
        begin: {
            hours: number,
            minutes: number
        },
        end: {
            hours: number,
            minutes: number
        }
    },
    secondBusinessTime?: {
        begin: {
            hours: number,
            minutes: number
        },
        end: {
            hours: number,
            minutes: number
        }
    },
    isOpenAllHours: boolean,
    businessModel: number,
    //resource_count: resource_count,
    logoImgId: string,
}


interface SaveFormCredentialsRequest {
    formId: number,
    idCardName: string,
    idCardNo: string,
    idCardFrontImgId: string,
    idCardBackImgId: string,
    businessLicenseImgId: string,
    businessLicenceName: string,
    businessLicenceNo: string,
    businessLicenceExpiry: number
}

interface FormApprovalSubmitRequest {
    formId: number,
}

export const SettledApis = {

    getFormSingle() {
        return request(
            "kk.h5.store.form.single.get",
            "1.0",
            {},
            true
        ).then(data => {
            return data;
        });
    },

    getFormList(req: GetFormListRequest) {
        return request(
            "kk.h5.store.form.list.get",
            "1.0",
            {
                page_number: req.pageNumber,
                page_size: req.pageSize,
                start: req.start,
                end: req.end
            },
            true
        ).then(data => {
            return data;
        });
    },

    createForm(req: CreateFormRequest) {
        return request(
            "kk.h5.store.form.settled.create",
            "1.0",
            {
                shop_name: req.shopName,
                category_id: req.categoryId,
                category_name: req.categoryName,
                sub_category_id: req.subCategoryId,
                sub_category_name: req.subCategoryName,
                province_id: req.provinceId,
                city_id: req.cityId,
                district_id: req.districtId,
                client_location: req.clientLocation ? req.clientLocation.lng + ',' + req.clientLocation.lat : undefined,
                is_sign_agreement: false
            },
            true
        ).then(data => {
            return data;
        });
    },

    saveFormIntroduction(req: SaveFormIntroductionRequest) {
        return request(
            "kk.h5.store.form.introduction.save",
            "1.0",
            {
                form_id: req.formId,
                shop_name: req.shopName,
                category_id: req.categoryId,
                category_name: req.categoryName,
                sub_category_id: req.subCategoryId,
                sub_category_name: req.subCategoryName,
                province_id: req.provinceId,
                city_id: req.cityId,
                district_id: req.districtId,
            },
            true
        ).then(data => {
            return data;
        });
    },

    saveFormBase(req: SaveFormBaseRequest) {

        let data: any = {
            form_id: req.formId,
            telephone: req.telephone,
            address: req.address,
            store_location: req.storeLocation ? req.storeLocation.lng + ',' + req.storeLocation.lat : undefined,
            is_open_all_hours: req.isOpenAllHours,
            business_model: req.businessModel,
            resource_count: 1,
            resource_uids: req.logoImgId,
        };

        if (!req.isOpenAllHours) {
            const timeNumberToString = (val: number) => {
                if (val < 10 && val >= 0) {
                    return "0" + val;
                } else {
                    return val.toString();
                }
            }
            if (req.firstBusinessTime) {
                data.first_business_time =
                    timeNumberToString(req.firstBusinessTime.begin.hours) +
                    timeNumberToString(req.firstBusinessTime.begin.minutes) +
                    ',' +
                    timeNumberToString(req.firstBusinessTime.end.hours) +
                    timeNumberToString(req.firstBusinessTime.end.minutes);
            }
            if (req.secondBusinessTime) {
                data.secondBusinessTime =
                    timeNumberToString(req.secondBusinessTime.begin.hours) +
                    timeNumberToString(req.secondBusinessTime.begin.minutes) +
                    ',' +
                    timeNumberToString(req.secondBusinessTime.end.hours) +
                    timeNumberToString(req.secondBusinessTime.end.minutes);
            }
        }

        return request(
            "kk.h5.store.form.base.save",
            "1.0",
            data,
            true
        ).then(data => {
            return data;
        });

    },


    saveFormCredentials(req: SaveFormCredentialsRequest) {
        return request(
            "kk.h5.store.form.credentials.save",
            "1.0",
            {
                form_id: req.formId,
                id_card_name: req.idCardName,
                id_card_no: req.idCardNo,
                resource_count: 3,
                resource_uids: `${req.idCardFrontImgId},${req.idCardBackImgId},${req.businessLicenseImgId}`,
                business_licence_name: req.businessLicenceName,
                business_licence_no: req.businessLicenceNo,
                id_card_type: 1,
                id_card_expiry: req.businessLicenceExpiry
            },
            true
        ).then(data => {
            return data;
        });
    },

    formApprovalSubmit(req: FormApprovalSubmitRequest) {
        return request(
            "kk.h5.store.form.approval.submit",
            "1.0",
            {
                form_id: req.formId,
            },
            true
        ).then(data => {
            return data;
        });
    }

}