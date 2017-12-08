import '../../sass/HomePage.scss';
import React from 'react';



export default class SuccessPage extends React.Component {
    // name: 'success',
    render() {

        return (<div className="wrap" data-page='success'><div className={'img'} />
            <h1>已提交审核</h1 >
            <p>我们会在3个工作日给您回复</p>
        </div>)

    }

}
