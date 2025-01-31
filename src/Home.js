import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Switch, Typography} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {collection, doc, getDocs, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from "./firebase";
import EditCell from "./EditCell";
import CloneCell from "./CloneCell";
import {useNavigate} from "react-router-dom";
import DeleteCell from "./DeleteCell";
import {removePrefix} from "./utils";

const Home = () => {
    const [rows, setRows] = useState([])
    const [opInProgress, setOpInProgress] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "mocks"))
            const data = querySnapshot.docs.map((doc) => {
                const docData = doc.data()
                return {
                    id: removePrefix(doc.id, "mocks/"),  // Required for DataGrid
                    ...docData,
                }
            })
            setRows(data)
        }

        fetchData()
    }, [])

    const addHandler = () => {
        navigate("/add")
    }
    const handleEnable = async (id, enabled) => {
        try {
            console.log("Handling enable ID: " + id + ", enabled: " + enabled)
            setOpInProgress(true)
            const docRef = doc(db, 'mocks', id)
            await updateDoc(docRef, {
                "enabled": enabled,
            })
            setOpInProgress(false)
        } catch (error) {
            setOpInProgress(false)
            console.error('Error updating document:', error)
        }
    }

    const handlePartial = async (id, partial) => {
        try {
            console.log("Handling partial ID: " + id + ", partial: " + partial)
            setOpInProgress(true)
            const docRef = doc(db, 'mocks', id)
            await updateDoc(docRef, {
                "partial": partial,
            })
            setOpInProgress(false)
        } catch (error) {
            setOpInProgress(false)
            console.error('Error updating document:', error)
        }
    }

    const handleDelete = async (id) => {
        try {
            console.log("Handling delete for ID: " + id)
            setOpInProgress(true)
            const docRef = doc(db, 'mocks', id)
            await deleteDoc(docRef)
            setOpInProgress(false)
            setRows((prevRows) => prevRows.filter((row) => row.id !== id))
        } catch (error) {
            setOpInProgress(false)
            console.error('Error deleting document:', error)
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'method', headerName: 'Method', width: 70 },
        { field: 'path', headerName: 'Path', width: 200 },
        { field: 'payload', headerName: 'Payload', width: 200, renderCell: (params) => (
                <Box
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {params.value}
                </Box>
            )
        },
        { field: 'enabled', headerName: 'Enabled', width: 70, renderCell: (params) => (
                <Switch
                    checked={params.row.enabled}
                    onChange={(event) => {
                        params.row.enabled = event.target.checked
                        handleEnable(params.row.id, params.row.enabled).then()
                    }}
                />
            )
        },
        { field: 'partial', headerName: 'Partial', width: 70, renderCell: (params) => (
                <Switch
                    checked={params.row.partial}
                    onChange={(event) => {
                        params.row.partial = event.target.checked
                        handlePartial(params.row.id, params.row.partial).then()
                    }}
                />
            )
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 80,
            renderCell: (params) => {
                // let response
                // try {
                //     response = JSON.parse(params.row)
                // } catch (error) {
                //     console.error("Failed to parse data of length: " + params.row.length + ", Error: " + error.message)
                // }
                return (
                    < EditCell rowData = {params.row} />
                )
            },
        },
        {
            field: 'clone',
            headerName: 'Clone',
            width: 80,
            renderCell: (params) => {
                let response
                try {
                    response = JSON.parse(params.row.payload)
                } catch (error) {
                    console.error("Failed to parse clone payload of length: " + params.row.payload.length + ", Error: " + error.message)
                }
                return (
                    < CloneCell
                        id = {params.row.id}
                        name = {params.row.name}
                        method = {params.row.method}
                        path = {params.row.path}
                        rowData = {response}
                    />
                )
            },
        },
        { field: 'delete', headerName: 'Delete', width: 70, renderCell: (params) => (
                <DeleteCell
                    id = {params.row.id}
                    deleteHandler={() => handleDelete(params.row.id)}
                />
            )
        },
    ];

    return (
        <Container maxWidth="lg">
            <Box mb={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4">
                        Mocks
                    </Typography>
                    <Button variant="contained" color="primary" onClick={addHandler}>
                        Add Mock
                    </Button>
                </Box>
            </Box>

            <Box display="flex" justifyContent="flex-end" mb={2}>
                <div style={{ height: '70vh', width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        sx={{
                            '& .MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 'bold',  // Apply bold styling to header text
                            },
                            '& .MuiDataGrid-cell:focus': {
                                outline: 'none', // Remove blue border on focus
                            },
                            '& .MuiDataGrid-cell:focus-within': {
                                outline: 'none', // Remove blue border when clicked
                            },
                        }}
                    />
                </div>
            </Box>
        </Container>
    );
};

export default Home;
