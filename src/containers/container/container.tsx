import React from "react";

import Calculator from "../../components/Calculator/Calculator";

import './container.sass';

const Container = () => {
    return (
        <div className={'mainContainer'} >
            <h1 className={'title'}>iTech Calculator</h1>
            <Calculator/>
        </div>


    )
};

export default Container;