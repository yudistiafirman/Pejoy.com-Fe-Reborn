import React, { Component } from 'react';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import { onGetDataStatistic } from './../../../Redux/Actions/UserProfile/dataStatisticAction';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt,  faUsers, faWallet } from '@fortawesome/free-solid-svg-icons';

export class Statistic extends Component{

    componentDidMount(){
        this.props.onGetDataStatistic()
    }

    render(){
        if(this.props.dataStatistic.data === null){
            return(
                <>
                    <div className="font-weight-bold pa-font-size-18">
                        <Skeleton width={250} height={15} duration={1} />
                    </div>
                    <div className="mx-0 my-1 border-bottom">

                    </div>
                    <div className="mx-0 mt-3 mb-0 px-5 py-3" style={{border: "1px solid #0095da", borderRadius: 5}}>
                        <div className="row justify-content-between align-items-center">
                            <div className="font-weight-bold pa-font-size-18">
                                <Skeleton width={250} height={15} duration={1} />
                                <p className="font-weight-light pa-font-size-30 pa-dark-grey">
                                    <Skeleton width={350} height={15} duration={1} />
                                </p>
                            </div>
                            <div>
                                <Skeleton width={100} height={50} duration={1} />
                            </div>
                        </div>
                    </div>
                </>
            )
        }

        return(
            // STATISTIC
            <div>
                <div className="font-weight-bold pa-font-size-30">
                    Statistic
                </div>
                <div className="mx-0 my-1 border-bottom">

                </div>
                <div className="px-0 py-0">
                    <div className="mx-0 mt-3 mb-0 px-5 py-3" style={{border: "1px solid #0095da", borderRadius: 5}}>
                        <div className="row justify-content-between align-items-center">
                            <div className="font-weight-bold pa-font-size-18">
                                Users
                                <p className="font-weight-light pa-font-size-30 pa-dark-grey">
                                    {
                                        this.props.dataStatistic.data.getActiveUsers[0].active_user
                                    }
                                    <span className="px-2 py-0 font-weight-light pa-font-size-30 pa-dark-grey">
                                        Active,
                                    </span>
                                    {
                                        this.props.dataStatistic.data.getPassiveUsers[0].passive_user
                                    }
                                    <span className="px-2 py-0 font-weight-light pa-font-size-30 pa-dark-grey">
                                        Passive
                                    </span>
                                </p>
                            </div>
                            <div>
                                <h1 className="pa-main-light"><FontAwesomeIcon icon={faUsers} /></h1>
                            </div>
                        </div>
                    </div>
                    <div className="mx-0 mt-3 mb-0 px-5 py-3 pa-bg-main-light" style={{border: "1px solid #0095da", borderRadius: 5}}>
                        <div className="row justify-content-between align-items-center">
                            <div className="font-weight-bold pa-font-size-18 pa-light">
                                Transactions
                                <p className="font-weight-light pa-font-size-30 pa-light">
                                    {
                                        this.props.dataStatistic.data.getTransactionsSuccess[0].transactions_success
                                    }
                                    <span className="px-2 py-0 font-weight-light pa-font-size-30 pa-light">
                                        Success,
                                    </span>
                                    {
                                        this.props.dataStatistic.data.getTransactionsPending[0].transactions_pending
                                    }
                                    <span className="px-2 py-0 font-weight-light pa-font-size-30 pa-light">
                                        Pending
                                    </span>
                                </p>
                            </div>
                            <div>
                                <h1 className="pa-light"><FontAwesomeIcon icon={faReceipt} /></h1>
                            </div>
                        </div>
                    </div>
                    <div className="mx-0 mt-3 mb-0 px-5 py-3" style={{border: "1px solid #0095da", borderRadius: 5}}>
                        <div className="row justify-content-between align-items-center">
                            <div className="font-weight-bold pa-font-size-18">
                                Income
                                <p className="font-weight-light pa-font-size-30 pa-dark-grey">
                                    Rp.{
                                        this.props.dataStatistic.data.getIncomePending[0].total_income_pending?
                                            (this.props.dataStatistic.data.getIncomePending[0].total_income_pending).toLocaleString('Id-ID')
                                        :
                                            null
                                    }
                                    <span className="px-2 py-0 font-weight-light pa-font-size-30 pa-dark-grey">
                                        Pending
                                    </span>
                                </p>
                                <p className="font-weight-light pa-font-size-30 pa-dark-grey">
                                    Rp.{
                                        this.props.dataStatistic.data.getIncomeSuccess[0].total_income_success?
                                            (this.props.dataStatistic.data.getIncomeSuccess[0].total_income_success).toLocaleString('Id-ID')
                                        :
                                            null
                                    }
                                    <span className="px-2 py-0 font-weight-light pa-font-size-30 pa-dark-grey">
                                        Success
                                    </span>
                                </p>
                            </div>
                            <div>
                                <h1 className="pa-main-light"><FontAwesomeIcon icon={faWallet} /></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        dataStatistic: state.dataStatistic
    }
}

const mapDispatchToProps = { onGetDataStatistic }

export default connect(mapStateToProps, mapDispatchToProps)(Statistic)