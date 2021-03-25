import React from 'react'
import Skeleton from 'react-loading-skeleton';
function UserProfileSkelaton() {
    return (
        <div>
                    <div className="font-weight-bold pa-font-size-30">
                        <Skeleton width={250} height={30} duration={1} />
                    </div>
                    <div className="px-0 py-4">
                        <div className="form-group">
                            <Skeleton width={150} height={10} duration={1} />
                            <Skeleton width="100%" height={45} duration={1} />
                        </div>
                        <div className="form-group">
                            <Skeleton width={150} height={10} duration={1} />
                            <Skeleton width="100%" height={45} duration={1} />
                        </div>
                        <div className="form-group">
                            <Skeleton width={150} height={10} duration={1} />
                            <Skeleton width="100%" height={45} duration={1} />
                        </div>
                        <div className="btn mx-0 my-2 px-5 py-2 font-weight-bold pa-button-submit pa-main-light" style={{borderRadius: 10}}>
                            <Skeleton width={150} height={15} duration={1} />
                        </div>
                    </div>
                </div>
    )
}

export default UserProfileSkelaton
