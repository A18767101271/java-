import '../../sass/HomePage.scss';
import React from 'react';

interface AddPageProps {
    mchId: number,
}

class AddPage extends React.Component<AddPageProps>{

    constructor(props: AddPageProps) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

    }

    render() {
        return (

            <div className="wrap clearfix" data-page='add'>

                <div className='card card-ping'>
                    <div className='name'>凭证券</div>
                    <div className='text'>凭证券的相关文案和提示大概在这些字以内</div>
                    <div className='btn' onClick={() => window.location.href = "#/setpz?mchid=" + this.props.mchId}>立即添加</div>
                </div>

                <div className='card card-dai'>
                    <div className='name'>代金券</div>
                    <div className='text'>代金券的相关文案和提示大概在这些字以内</div>
                    <div className='btn' onClick={() => window.location.href = "#/setdj?mchid=" + this.props.mchId}>立即添加</div>
                </div>

                <div className='card card-man'>
                    <div className='name'>满减券</div>
                    <div className='text'>满减券的相关文案和提示大概在这些字以内</div>
                    <div className='btn' onClick={() => window.location.href = "#/setmj?mchid=" + this.props.mchId}>立即添加</div>
                </div>

            </div>

        )
    }


}

export default AddPage;