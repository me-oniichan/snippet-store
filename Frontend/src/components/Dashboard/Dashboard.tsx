import React from 'react';
import Navbar from './Navbar';
import useTheme from '@/lib/themes';
import Workspace from './Workspace';
import './styles.css'
import store from './Context/store';
import { Provider } from 'react-redux';

const HelloWorld: React.FC = () => {
    useTheme("dark");

    return (
        <Provider store={store}>
            <div className='h-full box-border'>
                <Navbar/>
                <div className='p-3 h-full'>
                    <Workspace/> 
                </div>
            </div>
        </Provider>
    );
};

export default HelloWorld;