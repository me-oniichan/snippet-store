import React from 'react';
import Navbar from './Navbar';
import useTheme from '@/lib/themes';
import Workspace from './Workspace';
import './styles.css'

const HelloWorld: React.FC = () => {
    useTheme("dark");

    return (
        <div className='h-full box-border'>
            <Navbar/>
            <div className='p-3 h-full'>
                <Workspace/> 
            </div>
        </div>
    );
};

export default HelloWorld;