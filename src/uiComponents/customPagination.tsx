import React from 'react';
import PropTypes from 'prop-types';
import {Pagination} from "@mui/material";

interface CustomPaginationInterface {
    pageCount: number,
    onPageChange: any,
    currentPage: number
}

const CustomPagination = ({
                              pageCount, onPageChange, currentPage,
                          }: CustomPaginationInterface) => {
    return (
        <div>
            <Pagination
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
