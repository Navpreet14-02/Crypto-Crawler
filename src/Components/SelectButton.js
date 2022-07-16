import { styled } from '@mui/material';
import React from 'react';

const SelectButton = ({ children, selected, onClick }) => {
    const ChartBtn = styled('span')(({theme})=>({
        border: '1px solid gold',
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: 'Montserrat',
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "transparent",
        color: selected ? "black" : "white",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
            backgroundColor: "gold",
            color: "black",
        },
        width: '22%',
        marginBottom: 5,
        [theme.breakpoints.down('440')]:{
            width:'75%',
        }
    }));
    
    return (
        <ChartBtn
            onClick={onClick}
        >
            {children}
        </ChartBtn>
    )
}

export default SelectButton;