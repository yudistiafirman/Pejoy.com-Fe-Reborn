import React, { Component } from 'react';

export class AddProduct extends Component{

    state = {
        addVarian: false,
        varian: [
            {
                size: null,
                stock: null
            }
        ]
    }

    addVarian = () => {
        this.setState((prevState) => ({
            varian: [...prevState.varian, {size: null, stock: null}]
        }))
    }

    onChange = (element) => {
        if(['size', 'stock'].includes(element.target.name)){
            let addNewVarian = [...this.state.varian]
            addNewVarian[element.target.id][element.target.name] = element.target.value;
            
            this.setState({varian: addNewVarian})
        }else{
            this.setState({ [element.target.name]: element.target.value })
        }
    }

    submitProduct = () => {
        let size = []

        for(var i = 0; i < this.state.varian.length; i++){
            size.push(this.state.varian[i].size)
        }

        console.log(size)
    }

    render(){
        return(
            // ADD PRODUCT
            <div>
                <div className="font-weight-bold pa-font-size-30">
                    Add Product
                </div>
                <div className="mx-0 my-1 border-bottom">

                </div>
                <div className="px-0 py-4">
                    <div className="form-group">
                        <label className="pa-main-light">Name</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="pa-main-light">Discount</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mx-0 mt-5 mb-0 px-5 py-3" style={{border: "1px solid #f37021", borderRadius: 5}}>
                        <div className="row justify-content-between align-items-center">
                            <div className="font-weight-bold pa-font-size-18">
                                Product Varian
                                <p className="font-weight-light pa-dark-grey">
                                    Select size varian.
                                </p>
                            </div>
                            <div>
                                <div onClick={() => this.setState({addVarian: true})} className="btn mx-0 my-2 px-2 py-1 font-weight-bold pa-button-submit pa-font-size-16 pa-main-light" style={{borderRadius: 10}}>
                                    Add Varian
                                </div>
                            </div>
                        </div>
                        {
                            this.state.addVarian?
                                <div>
                                    <div className="w-100 px-0 py-0">
                                        {
                                            this.state.varian.map((value, index) => {
                                                return(
                                                    <form onChange={this.onChange} className="w-100 px-0 py-0">
                                                        <div key={index} className="row w-100 px-0 py-3">
                                                            <div className="col-3 form-group">
                                                                <label className="pa-main-light">Size</label>
                                                                <select name="size" id={index} value={value.size} className="form-control">
                                                                    <option>Select</option>
                                                                    <option value="1">XS</option>
                                                                    <option value="2">S</option>
                                                                    <option value="3">M</option>
                                                                    <option value="4">L</option>
                                                                    <option value="5">XL</option>
                                                                    <option value="6">XXL</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-9 form-group">
                                                                <label className="pa-main-light">Stock</label>
                                                                <input type="text" name="stock" id={index} value={value.stock} className="form-control" />
                                                            </div>
                                                        </div>
                                                    </form>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="text-center">
                                        <div onClick={() => this.addVarian()} className="btn mx-3 my-2 px-5 py-2 font-weight-bold pa-button-submit pa-main-light" style={{borderRadius: 10}}>
                                            Add Varian
                                        </div>
                                    </div>
                                </div>
                            :
                                null
                        }
                    </div>
                    <div className="text-center">
                        <div onClick={() => this.submitProduct()} className="btn mx-3 my-5 px-5 py-2 font-weight-bold pa-button-submit pa-main-light" style={{borderRadius: 10}}>
                            Upload Product
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddProduct