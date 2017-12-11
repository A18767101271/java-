import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';


import HomePage from './js/pages/HomePage';
import HomeDetails from './js/pages/HomeDetails';
import SetActivityPage from './js/pages/SetActivityPage';
import SetManJian from './js/pages/SetManJian';
import SetFanQuan from './js/pages/SetFanQuan';
import SetFanWu from './js/pages/SetFanWu';
import SetZheKou from './js/pages/SetZheKou';
import SetHongBao from './js/pages/SetHongBao';
import ChooseDiscount from './js/pages/ChooseDiscount';
import ChooseReturn from './js/pages/ChooseReturn';
// export default {
//     "/": HomePage,
//     "/details/:id": HomeDetails,
//     "/setactivity": SetActivityPage,
//     "/setmanjian": SetManJian,
//     "/setfanquan": SetFanQuan,
//     "/setfanwu": SetFanWu,
//     "/setzhekou": SetZheKou,
//     "/sethongbao": SetHongBao,
//     "/choosediscount": ChooseDiscount,
//     "/choosereturn": ChooseReturn,
//     "/record": RecordPage,
// };

interface PageProps {
    page: {
        name: string;
        render: (params?: any) => void;
    };
    params?: any;
}

class Page extends React.Component<PageProps, {}>{

    componentDidMount() {
        this.props.page && this.props.page.render && this.props.page.render(this.props.params);
    }

    componentDidUpdate() {
        (this.refs.wrap as any).innerHTML = '';
        this.props.page && this.props.page.render && this.props.page.render(this.props.params);
    }

    render() {
        return (<div ref='wrap' className="wrap" data-page={this.props.page ? this.props.page.name || '' : ''} ></div>);
    }

}



class Router extends React.Component<{ storeId: number }>{


    render() {
        return (<HashRouter>
            <Switch>
                <Route path='/details/:id' render={ctx => <Page page={HomeDetails} params={ctx.match.params} />} />
                <Route path='/setactivity' render={() => <SetActivityPage storeId={this.props.storeId} />} />
                <Route path='/setmanjian' render={() => <Page page={SetManJian} />} />
                <Route path='/setfanquan' render={() => <Page page={SetFanQuan} />} />
                <Route path='/setfanwu' render={() => <Page page={SetFanWu} />} />
                <Route path='/setzhekou' render={() => <Page page={SetZheKou} />} />
                <Route path='/sethongbao' render={() => <Page page={SetHongBao} />} />
                <Route path='/choosediscount' render={() => <Page page={ChooseDiscount} />} />
                <Route path='/choosereturn' render={() => <Page page={ChooseReturn} />} />
                <Route path='/record' render={() => <HomePage storeId={this.props.storeId} limitStatus={2} />} />
                <Route path='/' render={() => <HomePage storeId={this.props.storeId} />} />
            </Switch>
        </HashRouter>);

    }
}

export default Router;