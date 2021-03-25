import React, { Component } from 'react';

export class PageNotFound extends Component{
render(){
        return(
            // PAGE NOT FOUND
            <div>
                <div className="container px-0 py-5">
                    <div className="px-0 py-5 mx-0 my-3">
                        <div className="px-0 py-5 mx-0 my-1 text-center">
                            <img alt="#" src='https://www.blibli.com/resources/images/404/unicorn-static.svg' />
                            <h3 className="font-weight-bold">
                                Sedang Mencari Unicorn?
                            </h3>
                            <p className="pa-dark-grey">
                                Sama seperti Unicorn, halaman yang anda cari tidak ditemukan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageNotFound