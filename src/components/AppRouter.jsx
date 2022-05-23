import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context';
import { privateRoutes, publicRoutes } from '../router/routes';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader/>
    }

    return (
        isAuth 
            ? 
                <Routes>
                    {privateRoutes.map(route => 
                        <Route 
                            path={route.path} 
                            element={<route.element/>}
                            key={route.path}
                        />
                    )}
                    
                    <Route path='/'></Route>
                    <Route path='/login' element={<Navigate to="/posts"/>}></Route>
                    <Route path='*' element={<Navigate to="/404"/>}></Route>
                </Routes>
            : 
                <Routes>
                    {publicRoutes.map(route => 
                        <Route 
                            path={route.path} 
                            element={<route.element/>}
                            key={route.path}
                        />
                    )}
                    <Route path='*' element={<Navigate to="/login"/>}></Route>
                </Routes>
    );
};

export default AppRouter;