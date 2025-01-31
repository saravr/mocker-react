import {useNavigate} from "react-router-dom";
import {Box} from "@mui/material";
import CloneIcon from "@mui/icons-material/ContentCopy";
import React from "react";

const CloneCell = ({ id, name, method, path, rowData }) => {
    const navigate = useNavigate();

    const encodedPath = encodeURIComponent(path);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <CloneIcon
                sx={{ cursor: 'pointer', color: 'primary.main' }}
                onClick={() =>
                    navigate(`/clone/${id}/${name}/${method}/${encodedPath}`, { state: { data: rowData } })
                }
            />
        </Box>
    );
};

export default CloneCell;