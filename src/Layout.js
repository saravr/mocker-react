// Layout.js
import React from 'react';
import {Box, Link, Typography} from '@mui/material';

const Layout = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            {/* Title Bar */}
            <Box
                sx={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#3f51b5',
                    color: '#fff',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h6">API Mocks</Typography>
            </Box>

            {/* Content (centered) */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {children}
            </Box>

            {/* Sticky Footer */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    width: '100%',
                    height: '30px',
                    backgroundColor: '#3f51b5',
                    color: '#fff',
                    padding: '10px',
                    textAlign: 'center',
                }}
            >
                <Typography variant="body2" align="center" style={{ width: "100%" }}>
                    {'Copyright © '}
                    <Link color="inherit" href="https://sandymist.com">
                        Sandymist, Inc.
                    </Link>{' '}
                    {new Date().getFullYear()}
                </Typography>
            </Box>
        </Box>
    );
};

export default Layout;
