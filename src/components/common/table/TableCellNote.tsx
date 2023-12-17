import { Box, Checkbox, FormControlLabel, Stack, TableCell, Typography } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useEffect, useState } from 'react';

interface IPropsTableCellNote {
    total: number;
    colSpan: number;
    onChange: (_: any, value: boolean) => void;
    checked: boolean;
    loading?: boolean;
}

function TableCellNote({ total, onChange, checked, loading, colSpan }: IPropsTableCellNote) {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        <>
            {isClient && (
                <TableCell
                    colSpan={colSpan}
                    sx={{ borderBottom: 'none', paddingBottom: '0 !important' }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        width={'100%'}
                    >
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={3}
                        >
                            <Box sx={{ fontSize: '1rem' }}>Total: {total}</Box>
                            <Box>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={onChange}
                                            size="small"
                                            checked={checked}
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle2">
                                            Includes deleted users
                                        </Typography>
                                    }
                                />
                            </Box>
                        </Stack>
                        <Box>{loading && <AutorenewIcon className="animate-spin" />}</Box>
                    </Stack>
                </TableCell>
            )}
        </>
    );
}

export default TableCellNote;
