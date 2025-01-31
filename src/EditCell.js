import {useNavigate} from "react-router-dom";
import {Box} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

const EditCell = ({rowData }) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <EditIcon
                sx={{ cursor: 'pointer', color: 'primary.main' }}
                onClick={() =>
                    navigate(`/add`, { state: { data: rowData } })
                }
            />
        </Box>
    );
};

export default EditCell;