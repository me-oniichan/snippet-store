import useTheme from '@/lib/themes';
import React from 'react';
import { Provider } from 'react-redux';
import { Toaster } from '../ui/toaster';
import store from './Context/store';
import Navbar from './Navbar';
import Workspace from './Workspace';
import './styles.css';

const HelloWorld: React.FC = () => {
    useTheme("dark");

    return (
        <Provider store={store}>
            <div className='box-border'>
                <Navbar/>
                <div className='p-3 h-full'>
                    <Workspace/> 
                </div>
            </div>
            <Toaster/>
        </Provider>
    );
};

export default HelloWorld;