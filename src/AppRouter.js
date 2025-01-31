// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import EditMock from './EditMock';
import Layout from './Layout';
import CloneMock from "./CloneMock";
import AddMock from "./AddMock";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />
                <Route
                    path="/add"
                    element={
                        <Layout>
                            <AddMock />
                        </Layout>
                    }
                />
                {/*<Route*/}
                {/*    path="/edit/:id"*/}
                {/*    element={*/}
                {/*        <Layout>*/}
                {/*            <EditMock />*/}
                {/*        </Layout>*/}
                {/*    }*/}
                {/*/>*/}
                <Route
                    path="/clone/:id/:name/:method/:path"
                    element={
                        <Layout>
                            <CloneMock />
                        </Layout>
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;
