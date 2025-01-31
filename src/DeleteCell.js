import {Box} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";

const DeleteCell = ({ id, deleteHandler }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <DeleteIcon
                sx={{ cursor: 'pointer', color: 'primary.main' }}
                onClick={() =>
                    deleteHandler(id, deleteHandler)
                }
            />
        </Box>
    );
};

export default DeleteCell;