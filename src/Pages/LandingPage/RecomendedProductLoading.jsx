import React, { Component }  from 'react';
import Skeleton from 'react-loading-skeleton';

export class RecomendedProductLoading extends Component {
    render(){
      return(
        <div className="row">
            <div className="col-6 col-md-3 px-3 py-3">
                <div className="pa-recomended-card">
                    <Skeleton width height={300} duration={1} style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}} />
                    <div className="px-3 pt-3 pb-2 pa-bg-light-grey" style={{borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                    <Skeleton width={200} height={10} duration={1} />
                    <p className="font-weight-bold pa-font-size-16 pa-secondary">
                        <Skeleton width={150} height={10} duration={1} />
                    </p>
                    <p className="pa-font-size-14 pa-dark-grey">
                        <Skeleton width={100} height={10} duration={1} />
                        <span className="mx-1 my-0 pa-secondary">
                        <Skeleton width={45} height={10} duration={1} />
                        </span>
                    </p>
                    </div>
                </div>
            </div>
            <div className="col-6 col-md-3 px-3 py-3">
                <div className="pa-recomended-card">
                    <Skeleton width height={300} duration={1} style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}} />
                    <div className="px-3 pt-3 pb-2 pa-bg-light-grey" style={{borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                    <Skeleton width={200} height={10} duration={1} />
                    <p className="font-weight-bold pa-font-size-16 pa-secondary">
                        <Skeleton width={150} height={10} duration={1} />
                    </p>
                    <p className="pa-font-size-14 pa-dark-grey">
                        <Skeleton width={100} height={10} duration={1} />
                        <span className="mx-1 my-0 pa-secondary">
                        <Skeleton width={45} height={10} duration={1} />
                        </span>
                    </p>
                    </div>
                </div>
            </div>
            <div className="col-6 col-md-3 px-3 py-3">
                <div className="pa-recomended-card">
                    <Skeleton width height={300} duration={1} style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}} />
                    <div className="px-3 pt-3 pb-2 pa-bg-light-grey" style={{borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                    <Skeleton width={200} height={10} duration={1} />
                    <p className="font-weight-bold pa-font-size-16 pa-secondary">
                        <Skeleton width={150} height={10} duration={1} />
                    </p>
                    <p className="pa-font-size-14 pa-dark-grey">
                        <Skeleton width={100} height={10} duration={1} />
                        <span className="mx-1 my-0 pa-secondary">
                        <Skeleton width={45} height={10} duration={1} />
                        </span>
                    </p>
                    </div>
                </div>
            </div>
            <div className="col-6 col-md-3 px-3 py-3">
                <div className="pa-recomended-card">
                    <Skeleton width height={300} duration={1} style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}} />
                    <div className="px-3 pt-3 pb-2 pa-bg-light-grey" style={{borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                    <Skeleton width={200} height={10} duration={1} />
                    <p className="font-weight-bold pa-font-size-16 pa-secondary">
                        <Skeleton width={150} height={10} duration={1} />
                    </p>
                    <p className="pa-font-size-14 pa-dark-grey">
                        <Skeleton width={100} height={10} duration={1} />
                        <span className="mx-1 my-0 pa-secondary">
                        <Skeleton width={45} height={10} duration={1} />
                        </span>
                    </p>
                    </div>
                </div>
            </div>
        </div>
      )
    }
}

export default RecomendedProductLoading