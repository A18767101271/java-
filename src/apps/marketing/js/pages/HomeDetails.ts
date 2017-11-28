import '../../sass/HomePage.scss';
import PromotionApis from '../../../../services/promotion-apis';
import MJFn from './MJRender';
import FQFn from './FQRender';
import HBFn from './HBRender';
import ZKFn from './ZKRender';
import FWFn from './FWRender';

function screenFn(data: any) {

    const type = data.activityDefinitionId;

    if (type == 1) {
        MJFn(data);
        return;
    }
    if (type == 3) {
        FQFn(data);
        return;
    }
    if (type == 5) {
        HBFn(data);
        return;
    }
    if (type == 2) {
        ZKFn(data);
        return;
    }
    if (type == 4) {
        FWFn(data);
        return;
    }
}

export default {
    name: 'details',
    render: function (parms: any) {
        
        let actId;
        try {
            actId = parseInt(parms.id);
        } catch{
            console.log("获取ID错误");
            return;
        }

        if (isNaN(actId) || actId < 1) {
            console.log("获取ID错误");
            return;
        }
  
        PromotionApis.getPromotionDetail({ storeId: 1, activityId: actId }).then(data => {
           
            screenFn(data);
        })


    }
};