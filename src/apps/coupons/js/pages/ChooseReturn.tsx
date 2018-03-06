import React from 'react';
import classNames from 'classnames';
import StoreApis from '@jx/sardine-apiservice/lib/store-apis';
import '../../sass/ChoosePage.scss';

interface ChooseReturnProps {
    merchantId: number;
    storeApis: StoreApis;
    selected?: { id: number, num: number, name?: string, price?: number }[];
    onEnter?: (selected: { id: number, num: number, name?: string, price?: number }[]) => void;
}

class ChooseReturn extends React.Component<ChooseReturnProps, {
    data?: any;
    groupId?: number;
    selected: { id: number, num: number, price?: number, name?: string }[];
}> {

    constructor(props: ChooseReturnProps) {
        super(props);
        this.state = {
            selected: props.selected ? props.selected : []
        };
    }

    componentWillMount() {

        this.props.storeApis.getMerchantProducts({
            merchantId: this.props.merchantId,
            pageNumber: 0,
            pageSize: 999,
        }).then(data => {
            this.setState({ data: data });
        });

        if (this.props.selected) {
            this.setState({
                selected: this.props.selected
            })
        }

    }

    onItemAdd(id: number, num: number) {
        let s = this.state.selected.find(p => p.id === id);

        if (s) {
            s.num += num;
        } else {
            s = { id, num };
            this.state.selected.push(s);
        }
        if (s.num < 0) {
            s.num = 0;
        }
        this.setState({ selected: this.state.selected });
    }

    onSelected(id: number, name: string, price: number, num: number) {

        let s = [{
            id: id,
            name: name,
            price: price / 100,
            num: num
        }];

        this.setState({ selected: s });

    }

    getSelectedItems() {
        let res: { id: number, num: number, name: string, price?: number }[] = [];
        if (this.state.selected && this.state.data && this.state.data.products && this.state.data.products.length) {
            const products = this.state.data.products;
            this.state.selected.forEach(p => {
                if (p.num > 0) {
                    const product = products.find(item => item.id == p.id);
                    if (product) {
                        res.push({ id: p.id, num: p.num, name: product.name, price: product.realPrice / 100 });
                    }
                }
            });
        }
        return res;
    }

    onEnter() {
        this.props.onEnter && this.props.onEnter(this.getSelectedItems());
    }

    render() {

        let self = this;
        const data = this.state.data;

        if (!data) {
            return <p>加载中</p>
        }

        const showProducts = () => {

            let products = data.products && data.products.length ? data.products : [];
            if (self.state.groupId) {
                products = products.filter(p => self.state.groupId == p.customGroupId);
            }

            if (products.length > 0) {
                return products.map(p =>
                    <div key={p.id} className="food">
                        <div className="left fl">
                            <img src={p.logoPicUrl} className="img" />
                        </div>
                        <div className="right fr">
                            <h1>{p.name}</h1>
                            <h2>￥{p.realPrice / 100}</h2>
                            <span className="span-tip">{(data.productGroups.find(t => t.id == p.customGroupId) || { name: '' }).name}</span>
                            <div className="area">
                                <div className="btn btn-add" onClick={() => this.onItemAdd(p.id, 1)} ></div>
                                <span className="food-num" >{(this.state.selected.find(t => t.id === p.id) || { num: 0 }).num}</span>
                                <div className="btn btn-reduce" onClick={() => this.onItemAdd(p.id, -1)}></div>
                            </div>

                        </div>
                    </div>
                );
            } else {
                return <div className='no-tip'><div className='img'></div><p>暂无商品</p></div>
            }

        }

        return <div className='wrap' data-page='choosereturn' >
            <div className="headbar">
                <span
                    className={classNames("btn", { "active": this.state.groupId === undefined })}
                    onClick={() => this.setState({ groupId: undefined })
                    }
                >全部</span>
                {data.productGroups && data.productGroups.map(p => <span
                    key={p.id}
                    className={classNames("btn", { "active": this.state.groupId === p.id })}
                    onClick={() => this.setState({ groupId: p.id })}
                >{p.name}</span>)}
            </div>

            {<div className="t-tip">
                <h1>已选</h1>
                <div className="food-point">
                    {this.getSelectedItems().map(p => <span key={p.id} className="tt-span">{p.name}x{p.num}</span>)}
                </div>

                <div className="btn-xiala"></div>
            </div>}


            <div className="contain">
                {showProducts()}
            </div>

            <button className="btn-yes" onClick={() => this.onEnter()}>确定</button>

        </div>
    }
}

export default ChooseReturn;