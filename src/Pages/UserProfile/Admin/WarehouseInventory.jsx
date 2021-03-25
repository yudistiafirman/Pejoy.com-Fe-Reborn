import React, { Component } from 'react';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import { getWarehouseInventory } from './../../../Redux/Actions/UserProfile/warehouseInventoryAction';



export class FlashSaleEvent extends Component{

    state = {
        offset: 0,
        perPage: 10,
        currentPage: 0
    };

    componentDidMount(){
        this.props.getWarehouseInventory()
    }

    mapWarehouseInventory = () => {
        return this.props.warehouseInventory.data.data.map((value, index) => {
            return(
                <React.Fragment>
                    <tr>
                        <th scope="row">{value.gudang_name}</th>
                        <td>{value.name}</td>
                        <td>{value.size}</td>
                        <td>{value.stock_customer}</td>
                        <td>
                            {value.stock_gudang}
                        </td>
                    </tr>
                </React.Fragment>
            )
        })
    }

    render(){
        if(this.props.warehouseInventory.data === null){
            return(
                <div>
                    <div className="font-weight-bold pa-font-size-18">
                        <Skeleton width={150} height={15} duration={1} />
                    </div>
                    <div className="mx-0 my-1 border-bottom">

                    </div>
                    <div className="px-0 py-4">
                        <Skeleton width={825} height={150} duration={1} />
                    </div>
                </div>
            )
        }

        return(
            // WAREHOUSE INVENTORY
            <div>
                <div className="font-weight-bold pa-font-size-30">
                    Warehouse Inventory
                </div>
                <div className="mx-0 my-1 border-bottom">

                </div>
                <div className="px-0 py-4">
                    <table class="table border">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">Warehouse</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Size</th>
                                <th scope="col">Cust. Stock</th>
                                <th scope="col">Warh. Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.mapWarehouseInventory()
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        warehouseInventory: state.warehouseInventory
    }
}

const mapDispatchToProps = { getWarehouseInventory }

export default connect(mapStateToProps, mapDispatchToProps)(FlashSaleEvent)