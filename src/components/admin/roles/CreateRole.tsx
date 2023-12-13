'use client';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Grid,
    Stack,
    Typography,
    colors,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { TEXT } from '@/constant/text.contants';
import AlertError from '@/components/common/alert/AlertError';
import { useRouter } from 'next/navigation';
import TextField from '@/components/common/textField/TextField';
import { IOptionAutocomplete } from '@/helpers/formik.helper';
import Autocomplete from '@/components/common/autocomplete/Autocomplete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { permissionModule } from '@/helpers/function.helper';
import Switch from '@mui/material/Switch';

interface IProps {
    initialActives: IOptionAutocomplete[];
    permissionModule: permissionModule[];
}

const CreateRole = ({ initialActives, permissionModule }: IProps) => {
    console.log(permissionModule);

    const router = useRouter();

    const [errMessage, setErrMessage] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [activeList] = useState<IOptionAutocomplete[]>(initialActives);

    const createForm = useFormik({
        initialValues: {
            name: '',
            description: '',
            isActive: { label: '', id: '' },
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Name')),
            description: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Description')),
            isActive: Yup.object().shape({
                label: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Status')),
            }),
        }),
        onSubmit: async (values) => {
            setErrMessage(undefined);
            setIsLoading(true);
            console.log(values);
        },
    });

    const handleChangeSwitch = (event) => {
        // event.stopPropagation();
    }

    const handleAccordionClick = (event) => {
        // event.stopPropagation(); 
      };

    return (
        <Stack gap={3}>
            {errMessage && <AlertError message={errMessage} />}
            <Box component={'form'} onSubmit={createForm.handleSubmit}>
                <Card variant="outlined">
                    <CardContent>
                        <Stack gap={3}>
                            {/* Name and Status */}
                            <Grid container spacing={2}>
                                {/* Name */}
                                <Grid item xs={6}>
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
                                </Grid>

                                {/* Status */}
                                <Grid item xs={6}>
                                    <Autocomplete
                                        fullWidth
                                        options={activeList}
                                        value={createForm.values.isActive}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    label="Status"
                                                    error={
                                                        createForm.touched.isActive &&
                                                        Boolean(createForm.errors.isActive)
                                                    }
                                                    helperText={
                                                        createForm.touched.isActive &&
                                                        createForm.errors.isActive
                                                            ? createForm.errors.isActive.label
                                                            : ''
                                                    }
                                                />
                                            );
                                        }}
                                        onChange={(_, value) => {
                                            createForm.setFieldValue(
                                                'isActive',
                                                value || { label: '', id: '' },
                                            );
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            {/* Description */}
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={createForm.values.description}
                                onChange={createForm.handleChange}
                                error={
                                    createForm.touched.description &&
                                    createForm.errors.description !== undefined
                                }
                                helperText={
                                    createForm.touched.description && createForm.errors.description
                                }
                            />
                            <Card variant="outlined">
                                <CardHeader
                                    title={<Typography variant="subtitle1">Permissions</Typography>}
                                    subheader={
                                        <Typography variant="body2">
                                            The permissions allowed for this role
                                        </Typography>
                                    }
                                />
                                <CardContent>
                                    {permissionModule.map((module, index1) => {
                                        return <Accordion key={index1} onClick={handleAccordionClick}>
                                            <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
                                                <Stack direction={"row"} width={"100%"} alignItems={"center"} justifyContent={"space-between"}>
                                                    <Typography variant="subtitle1">{module.module}</Typography>
                                                    <Switch onChange={handleChangeSwitch} onClick={(e) => e.stopPropagation()}/>
                                                </Stack>
                                            </AccordionSummary>
                                            <AccordionDetails >
                                                <Grid container spacing={2}>
                                                    {module.data.map((permission) => {
                                                        return <Grid item xs={6} key={permission._id}>
                                                            <Card variant="outlined" >
                                                                <Stack padding={2} direction={"row"} gap={2}>
                                                                    <Switch defaultChecked={false} />
                                                                    <Box>
                                                                        <Typography variant="subtitle1">{permission.name}</Typography>
                                                                        <Stack direction={"row"} gap={1} alignItems={"baseline"}>
                                                                            <Chip
                                                                                variant="outlined"
                                                                                color={
                                                                                    permission.method === 'GET'
                                                                                        ? 'success'
                                                                                        : permission.method === 'POST'
                                                                                        ? 'warning'
                                                                                        : permission.method === 'PATCH'
                                                                                            ? 'info'
                                                                                            : permission.method === 'DELETE'
                                                                                            ? 'error'
                                                                                            : 'default'
                                                                                }
                                                                                size={"small"}
                                                                                label={<Typography variant="subtitle1" sx={{fontWeight: 900}} >{permission.method}</Typography>}
                                                                            />
                                                                            <Typography variant="body2" sx={{opacity: 0.6}}>{permission.apiPath}</Typography>
                                                                        </Stack>
                                                                    </Box>
                                                                </Stack>
                                                            </Card>
                                                        </Grid>
                                                    })}
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                    })}
                                    
                                </CardContent>
                            </Card>
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

export default CreateRole;
