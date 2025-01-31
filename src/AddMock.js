import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Box, Button, CircularProgress, FormControlLabel, Switch, TextField, Typography} from '@mui/material';
import ReactJson from 'react-json-view';
import {setDoc, doc, updateDoc} from 'firebase/firestore';
import { db } from './firebase';
import {generateShortUniqueId} from "./utils";
const {styled} = require("@mui/material/styles")

const AddMock = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { data } = location.state || {}
    const newMock = (data === undefined || data === null)

    const [name, setName] = useState("");
    const [method, setMethod] = useState(name);
    const [path, setPath] = useState(name);
    const [payload, setPayload] = useState("");
    const [enabled, setEnabled] = useState(false)
    const [partial, setPartial] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [saveInProgress, setSaveInProgress] = useState(false);
    const [jsonEditor, setJsonEditor] = useState(false)
    const [formatJson, setFormatJson] = useState(false)

    useEffect(() => {
        if (data) {
            setName(data.name)
            setMethod(data.method)
            setPath(data.path)
            setEnabled(data.enabled)
            setPartial(data.partial || false)
            setPayload(data.payload)
            setIsLoading(false)
        }
    }, [data])

    const handleSave = async () => {
        try {
            setSaveInProgress(true)
            if (newMock) {
                const mockData = {
                    "name": name,
                    "method": method,
                    "path": path,
                    "payload": payload,
                    "partial": partial,
                    "enabled": true,
                    "createdAt": Math.floor(Date.now() / 1000),
                }

                const uniqueId = generateShortUniqueId(8)
                const documentRef = doc(db, "mocks", uniqueId)
                setDoc(documentRef, mockData)
                    .then(() => {
                        console.log("Document successfully written!")
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error)
                    });
                console.log("Added mock, id: " + uniqueId)
            } else {
                console.log("Update mock, id: " + data.id)
                const docRef = doc(db, 'mocks', data.id)
                await updateDoc(docRef, {
                    "name": name,
                    "method": method,
                    "path": path,
                    "payload": payload,
                    "enabled": enabled,
                    "partial": partial,
                });
            }
            setSaveInProgress(false)

            navigate('/')
        } catch (error) {
            setSaveInProgress(false);
            console.error('Error updating document:', error);
        }
    }

    const handleFormatJson = (event) => {
        let jsonObj
        try {
            jsonObj = JSON.parse(payload)
        } catch (e) {
            console.error("Error parsing payload: " + e.message)
            return
        }
        const formattedPayload = (event.target.checked) ?
             JSON.stringify(jsonObj, null, 4) : JSON.stringify(jsonObj)
        setPayload(formattedPayload)
        setFormatJson(event.target.checked)
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100vh', width: '90vw'}}>
            {/* Title Bar with Save Button */}
            <div
                style={{
                    padding: '20px',
                    borderBottom: '1px solid #ddd',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%', // Ensure it occupies the full width
                }}
            >
                <Typography variant="h4">{newMock ? "Add" : "Edit"} Mock</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={saveInProgress}
                    startIcon={saveInProgress ? <CircularProgress size={20}/> : null}>
                    Save
                </Button>
            </div>

            <TextField
                label="Mock name"
                variant="outlined"
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                }}
                margin="normal"
            />

            <TextField
                label="HTTP Method"
                variant="outlined"
                value={method}
                onChange={(e) => {
                    setMethod(e.target.value)
                }}
                margin="normal"
            />

            <TextField
                label="Mock path"
                variant="outlined"
                value={path}
                onChange={(e) => {
                    setPath(e.target.value)
                }}
                margin="normal"
            />

            <FormControlLabel
                control={
                    <Switch
                        checked={partial}
                        onChange={(e) => setPartial(e.target.checked)}
                        name="partial"
                    />
                }
                label="Partial?"
                labelPlacement="start"
                sx={{paddingTop: '10px'}}
            />

            <FormControlLabel
                control={
                    <Switch
                        checked={enabled}
                        onChange={(e) => setEnabled(e.target.checked)}
                        name="enable"
                    />
                }
                label="Enabled?"
                labelPlacement="start"
                sx={{paddingTop: '10px'}}
            />

            <FormControlLabel
                control={
                    <Switch
                        checked={jsonEditor}
                        onChange={(e) => setJsonEditor(e.target.checked)}
                        name="enable"
                    />
                }
                label="JSON Editor? (takes time please be patient!)"
                labelPlacement="left"
                sx={{paddingTop: '10px'}}
            />

            {/* JSON Content (Scrollable) */}
            <div style={{flex: 1, paddingTop: '20px', width: '100%', height: '100%', paddingBottom: '80px'}}>
                {!jsonEditor ? (
                    <div>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%', // Ensure full-width div
                            }}
                        >
                            <Box sx={{ml: 'auto'}}> {/* This pushes the switch to the right */}
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formatJson}
                                            onChange={handleFormatJson}
                                            name="enable"
                                        />
                                    }
                                    label="Format JSON?"
                                    sx={{paddingTop: '10px', width: '100%'}}
                                />
                            </Box>
                        </Box>
                        <ResizableTextField
                            value={payload}
                            onChange={(e) => setPayload(e.target.value)}
                            multiline={true}
                            minRows={5}
                            maxRows={20}
                            sx={{width: '100%', height: '90%'}}
                            InputProps={{
                                style: {resize: 'vertical'} // Makes only the bottom resizable
                            }}
                        />
                    </div>
                ) : (
                    <ReactJson
                        src={JSON.parse(payload)}
                        onEdit={(edit) => setPayload(edit.updated_src)}
                        onAdd={(add) => setPayload(add.updated_src)}
                        onDelete={(del) => setPayload(del.updated_src)}
                        theme="monokai"
                        style={{marginBottom: '20px'}}
                    />
                )}
            </div>
        </div>
    )
}

const ResizableTextField = styled(TextField)({
    '& .MuiInputBase-root': {
        resize: 'vertical', // Allows vertical resizing
        overflow: 'auto',   // Ensures scrolling works if content overflows
    },
})

export default AddMock;
