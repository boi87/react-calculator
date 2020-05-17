import React from "react";

import './container.sass';
import Calculator from "../../components/Calculator/Calculator";

const Container = () => {
    return (
        <div className={'mainContainer'} >
            <h1>iTech Calculator</h1>
            <Calculator/>
        </div>


    )
};

export default Container;