'use client';

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Grid,
    Stack,
    styled,
} from '@mui/material';
import { useFormik } from 'formik';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { TEXT } from '@/constant/text.contants';
import AlertError from '@/components/common/alert/AlertError';
import { useRouter } from 'next/navigation';
import TextField from '@/components/common/textField/TextField';
import { toastSuccess, toastWarning } from '@/provider/ToastProvider';
import RichTextEditor from '@/components/common/richTextEditor/RichTextEditor';
import { RichTextEditorRef } from 'mui-tiptap';
import { createCompanyAction } from '@/app/admin/companies/action';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PreviewImage from './PreviewImage';
import { imgUploadAction } from '@/app/action';
import { FOLDER_IMAGE_COMPANY } from '@/constant/image.contants';

const CreateCompanies = () => {
    const rteRef = useRef<RichTextEditorRef>(null);
    const router = useRouter();

    const [errMessage, setErrMessage] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [fileImg, setFileImg] = useState<File>();

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const createForm = useFormik({
        initialValues: {
            name: '',
            address: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Name')),
            address: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Address')),
        }),
        onSubmit: async (valuesRaw) => {
            setErrMessage(undefined);
            setIsLoading(true);

            const formData = new FormData();
            if (!fileImg) return toastWarning(TEXT.MESSAGE.CREATE_SUCCESS);

            formData.append('file', fileImg);
            formData.append('folder', FOLDER_IMAGE_COMPANY);

            const dataImg = await imgUploadAction(formData);
            if (!dataImg.success) return setErrMessage(dataImg.message);

            const values = {
                ...valuesRaw,
                description: rteRef.current?.editor?.getHTML(),
                logo: dataImg.data?.data.downloadURL,
                logoName: dataImg.data?.data.finalName,
            };

            // console.log(values);

            const result = await createCompanyAction(values);
            setIsLoading(false);

            if (!result.success) return setErrMessage(result.message);

            toastSuccess(TEXT.MESSAGE.CREATE_SUCCESS);
            router.back();
        },
    });

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <Stack gap={3}>
            {errMessage && <AlertError message={errMessage} />}
            <Box component={'form'} onSubmit={createForm.handleSubmit}>
                <Card variant="outlined">
                    <CardContent>
                        <Stack gap={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Stack gap={3}>
                                        {/* Name */}
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            name="name"
                                            value={createForm.values.name}
                                            onChange={createForm.handleChange}
                                            error={
                                                createForm.touched.name &&
                                                createForm.errors.name !== undefined
                                            }
                                            helperText={
                                                createForm.touched.name && createForm.errors.name
                                            }
                                        />

                                        {/* Address */}
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            name="address"
                                            value={createForm.values.address}
                                            onChange={createForm.handleChange}
                                            error={
                                                createForm.touched.address &&
                                                createForm.errors.address !== undefined
                                            }
                                            helperText={
                                                createForm.touched.address &&
                                                createForm.errors.address
                                            }
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                    <Stack gap={3} direction={'row'} height={'100%'}>
                                        <Button
                                            component="label"
                                            variant="contained"
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload logo
                                            <VisuallyHiddenInput
                                                type="file"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    if (
                                                        e.target.files &&
                                                        e.target.files.length > 0
                                                    ) {
                                                        const file = e.target.files[0];
                                                        setFileImg(file);
                                                    }
                                                }}
                                            />
                                        </Button>
                                        {fileImg && <PreviewImage file={fileImg} />}
                                    </Stack>
                                </Grid>
                            </Grid>

                            {/* Description */}
                            {isClient && <RichTextEditor ref={rteRef} />}
                        </Stack>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            loading={isLoading}
                        >
                            {TEXT.BUTTON_TEXT.ADD}
                        </LoadingButton>
                        <Button onClick={() => router.back()} disabled={isLoading}>
                            {TEXT.BUTTON_TEXT.CANCEL}
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Stack>
    );
};

export default CreateCompanies;
