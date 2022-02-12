import React from 'react';
/**
 * Component which show untill the data get to the user
 * 
 * @component 
 * @returns {JSX} Loadding Shap
 */
export default () => (
    <div className="col-12 d-flex flex-column align-items-center p-5">
        <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary" style={{ fontSize: "24px" }}></span>
        <p className="pt-3" style={{ fontSize: "24px" }}>Loading...</p>
    </div>
);