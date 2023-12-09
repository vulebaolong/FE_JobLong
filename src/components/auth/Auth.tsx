'use client';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { SyntheticEvent, useState } from 'react';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import { TEXT } from '@/constant/text.contants';

export default function Auth() {
    const [value, setValue] = useState('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} sx={{ display: 'flex' }}>
                        <Tab label={TEXT.BUTTON_TEXT.LOGIN} value="1" sx={{ flexBasis: '50%' }} />
                        <Tab
                            label={TEXT.BUTTON_TEXT.REGISTER}
                            value="2"
                            sx={{ flexBasis: '50%' }}
                        />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <FormLogin />
                </TabPanel>
                <TabPanel value="2">
                    <FormRegister />
                </TabPanel>
            </TabContext>
        </Box>
    );
}
