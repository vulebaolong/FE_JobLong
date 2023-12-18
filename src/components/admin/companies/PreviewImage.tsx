'use client';

import { Box } from '@mui/material';
import { useState } from 'react';

function PreviewImage({ file }: { file: File }) {
    const [preview, setPreview] = useState<string | null>(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
            setPreview(result);
        }
    };

    return (
        <>
            {preview ? (
                <Box
                    sx={{
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 'auto',
                    }}
                    overflow={'hidden'}
                >
                    <img src={preview} alt="preview" style={{ width: '100%' }} />
                </Box>
            ) : (
                'loading'
            )}
        </>
    );
}
export default PreviewImage;
