import PropTypes from "prop-types";
import React from "react";
import "./ProductPageBody.scss";

ProductPageBody.propTypes = {
    children: PropTypes.node
};


export default function ProductPageBody({children}) {
    return <div className="product-page-body">
        {children}
    </div>;
}

