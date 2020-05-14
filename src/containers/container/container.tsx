import React from "react";

import style from './container.module.sass';
import Calculator from "../../components/calculator/calculator";

const Container = () => {
    return (
        <div className={style.mainContainer} >
            <h1>iTech Calculator</h1>
            <Calculator/>
        </div>


    )
};

export default Container;