import React from 'react';
import PropTypes from 'prop-types';
import {Pagination} from "@mui/material";

const CustomPagination = ({
                         pageCount, onPageChange, currentPage,
                     }:any) => {

    return (
        <div>
            <Pagination
                // @ts-ignore
                count={pageCount}
                onChange={onPageChange}
                page={currentPage}
                color="primary"
                showFirstButton
                showLastButton
            />
        </div>
    );
};

CustomPagination.propTypes = {
    pageCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
};

export default CustomPagination;
