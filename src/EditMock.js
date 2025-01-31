// import React, {useEffect, useState} from 'react';
// import {useLocation, useNavigate, useParams} from 'react-router-dom';
// import {Button, CircularProgress, Typography} from '@mui/material';
// import ReactJson from 'react-json-view';
// import { doc, updateDoc } from 'firebase/firestore';
// import { db } from './firebase';
//
// const EditMock = () => {
//     //const { id } = useParams(); // Destructure the `id` parameter from route
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { data } = location.state || {};
//
//     const [editedData, setEditedData] = useState({});
//     const [isLoading, setIsLoading] = useState(true);
//     const [saveInProgress, setSaveInProgress] = useState(false);
//
//     useEffect(() => {
//         if (data) {
//             setEditedData(data)
//             setIsLoading(false);
//         }
//     }, [data]);
//
//     if (!data) return <div>No data available</div>;
//
//     const handleSave = async () => {
//         try {
//             setSaveInProgress(true);
//             const docRef = doc(db, 'mocks', id);
//             await updateDoc(docRef, {
//                 "payload": JSON.stringify(editedData)
//             });
//             setSaveInProgress(false);
//
//             navigate('/');
//         } catch (error) {
//             setSaveInProgress(false);
//             console.error('Error updating document:', error);
//         }
//     };
//
//     return (
//         <div style={{display: 'flex', flexDirection: 'column', height: '100vh', width: '90vw'}}>
//             {/* Title Bar with Save Button */}
//             <div
//                 style={{
//                     padding: '20px',
//                     borderBottom: '1px solid #ddd',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     width: '100%', // Ensure it occupies the full width
//                 }}
//             >
//                 <Typography variant="h4">Edit Mock</Typography>
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleSave}
//                     disabled={saveInProgress}
//                     startIcon={saveInProgress ? <CircularProgress size={20} /> : null}>
//                     Save
//                 </Button>
//             </div>
//
//             {/* JSON Content (Scrollable) */}
//             <div style={{flex: 1, overflow: 'auto', padding: '20px', width: '100%'}}>
//                 {isLoading ? (
//                     <p>Loading...</p>
//                 ) : (
//                     <ReactJson
//                         src={editedData}
//                         onEdit={(edit) => setEditedData(edit.updated_src)}
//                         onAdd={(add) => setEditedData(add.updated_src)}
//                         onDelete={(del) => setEditedData(del.updated_src)}
//                         theme="monokai"
//                         style={{marginBottom: '20px'}}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default EditMock;
