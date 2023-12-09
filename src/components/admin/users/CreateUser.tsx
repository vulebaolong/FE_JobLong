'use client';

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    MenuItem,
    Stack,
    TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { TEXT } from '@/constant/text.contants';
import AlertError from '@/components/common/alert/AlertError';

const CreateUser = () => {
    const router = useRouter();

    const [errMessage, setErrMessage] = useState('');
    const [ownerTenants, setOwnerTenants] = useState([]);
    const [onRequest, setOnRequest] = useState(false);

    const tenantCreateForm = useFormik({
        initialValues: {},
        validationSchema: Yup.object({}),
        onSubmit: async (values) => {},
    });

    const onOrganizationChange = async () => {};

    const onLayerChange = async () => {};

    const getTenants = async () => {};

    return (
        <Stack gap={3}>
            {errMessage && <AlertError message={errMessage} />}
            <Box component={'form'} onSubmit={tenantCreateForm.handleSubmit}>
                <Card variant="outlined" sx={{ maxWidth: 'sm' }}>
                    <CardContent>
                        <Stack gap={3}>
                            {/* Input name */}
                            <TextField
                                label="拠点名"
                                fullWidth
                                name="name"
                                // value={}
                                // onChange={tenantCreateForm.handleChange}
                                // error={ }
                                // helperText={ }
                            />

                            {/* Select organization */}
                            <TextField
                                select
                                label="企業・組織"
                                fullWidth
                                name="organization"
                                // value={tenantCreateForm.values.organization}
                                // onChange={onOrganizationChange}
                                // error={
                                //     tenantCreateForm.touched.organization &&
                                //     tenantCreateForm.errors.organization !== undefined
                                // }
                                // helperText={
                                //     tenantCreateForm.touched.organization &&
                                //     tenantCreateForm.errors.organization
                                // }
                            >
                                {[].map((item, index) => (
                                    <MenuItem value={'1'} key={index}>
                                        item.organization_name
                                    </MenuItem>
                                ))}
                            </TextField>

                            {/* Select layer */}
                            <TextField
                                select
                                label="階層"
                                fullWidth
                                name="layer"
                                // value={tenantCreateForm.values.layer}
                                // onChange={onLayerChange}
                                // error={
                                //     tenantCreateForm.touched.layer &&
                                //     tenantCreateForm.errors.layer !== undefined
                                // }
                                // helperText={
                                //     tenantCreateForm.touched.layer && tenantCreateForm.errors.layer
                                // }
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </TextField>

                            {/* Input explanation */}
                            <TextField
                                label="説明"
                                fullWidth
                                name="explanation"
                                // value={tenantCreateForm.values.explanation}
                                // onChange={tenantCreateForm.handleChange}
                                // error={
                                //     tenantCreateForm.touched.explanation &&
                                //     tenantCreateForm.errors.explanation !== undefined
                                // }
                                // helperText={
                                //     tenantCreateForm.touched.explanation &&
                                //     tenantCreateForm.errors.explanation
                                // }
                            />

                            {/* select usage_flag */}
                            <TextField
                                select
                                label="利用設定"
                                fullWidth
                                name="usage_flag"
                                // value={tenantCreateForm.values.usage_flag}
                                // onChange={tenantCreateForm.handleChange}
                                // error={
                                //     tenantCreateForm.touched.usage_flag &&
                                //     tenantCreateForm.errors.usage_flag !== undefined
                                // }
                                // helperText={
                                //     tenantCreateForm.touched.usage_flag &&
                                //     tenantCreateForm.errors.usage_flag
                                // }
                            >
                                <MenuItem value={0}>無効</MenuItem>
                                <MenuItem value={1}>有効</MenuItem>
                            </TextField>
                        </Stack>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            loading={onRequest}
                        >
                            {TEXT.BUTTON_TEXT.ADD}
                        </LoadingButton>
                        <Button
                            onClick={() => router.back()}
                            disabled={onRequest}
                        >
                            {TEXT.BUTTON_TEXT.CANCEL}
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Stack>
    );
};

export default CreateUser;
