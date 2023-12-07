"use client";

import {
    Autocomplete,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Divider,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import MPagination from "@/components/common/pagination/MPagination";
import GotoEditButton from "@/components/common/button/GotoEditButton";
import { IUserInfo } from "@/interface/user";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { routerReplace } from "@/helpers/router.helper";
import { TEXT } from "@/constant/text.contants";
import { useFormik } from "formik";
import TextField from "@/components/common/textField/TextField";
import { useState } from "react";
import { IOptionAutocomplete, initValueFormik } from "@/helpers/formik.helper";

interface IProps {
    dataUser: IModelPaginate<IUserInfo[]>;
    initialCompaies: IOptionAutocomplete[];
    initialRole: IOptionAutocomplete[];
    initialGender: IOptionAutocomplete[];
}

function ListUser({ dataUser, initialCompaies, initialRole, initialGender }: IProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [companiesList, setCompaniesList] = useState<IOptionAutocomplete[]>(initialCompaies);
    const [genderList, setGenderList] = useState<IOptionAutocomplete[]>(initialGender);
    const [roleList, setRoleList] = useState<IOptionAutocomplete[]>(initialRole);

    const searchForm = useFormik({
        initialValues: {
            name: searchParams.get("name") || "",
            address: searchParams.get("address") || "",
            age: searchParams.get("age") || "",
            company: initValueFormik("company", companiesList, searchParams),
            email: searchParams.get("email") || "",
            gender: initValueFormik("gender", genderList, searchParams),
            role: initValueFormik("role", roleList, searchParams),
            page: searchParams.get("page") || 1,
        },
        onSubmit: (values) => {
            // console.log("values", values)
            routerReplace({
                router,
                pathname,
                searchParams,
                newSearchParams: {
                    ...values,
                    company: values.company.id || "",
                    gender: values.gender.label || "",
                    role: values.role.id || "",
                },
            });
        },
    });

    const onPageChange = (_: any, page: number) => {
        routerReplace({
            router,
            pathname,
            searchParams,
            newSearchParams: { currentPage: page },
        });
    };

    const onSearch = () => {
        searchForm.setFieldValue("page", 1);
        searchForm.submitForm();
    };

    const onResetSearch = () => {
        searchForm.setFieldValue("name", "");
        searchForm.setFieldValue("address", "");
        searchForm.setFieldValue("age", "");
        searchForm.setFieldValue("company", { label: "", id: "" });
        searchForm.setFieldValue("email", "");
        searchForm.setFieldValue("gender", { label: "", id: "" });
        searchForm.setFieldValue("role", { label: "", id: "" });
        searchForm.setFieldValue("page", 1);
        searchForm.submitForm();
    };

    return (
        <Stack spacing={4}>
            {/* SEARCH */}
            <Card variant="outlined">
                <CardContent>
                    <Stack direction={"row"} flexWrap="wrap" gap={2}>
                        {/* Name */}
                        <TextField
                            label="Name"
                            name="name"
                            value={searchForm.values.name}
                            onChange={searchForm.handleChange}
                        />

                        {/* Address */}
                        <TextField
                            label="Address"
                            name="address"
                            value={searchForm.values.address}
                            onChange={searchForm.handleChange}
                        />

                        {/* Age */}
                        <TextField
                            type="number"
                            max={199}
                            name="age"
                            label="Age"
                            value={searchForm.values.age}
                            onChange={searchForm.handleChange}
                        />

                        {/* Company */}
                        <Autocomplete
                            sx={{ width: "300px" }}
                            size="small"
                            options={companiesList}
                            renderOption={(props, option) => {
                                return (
                                    <li {...props} key={option.id}>
                                        {option.label}
                                    </li>
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value.id === "" || option.id === value.id
                            }
                            value={searchForm.values.company}
                            renderInput={(params) => <TextField {...params} label="Company" />}
                            onChange={(_, value) => {
                                searchForm.setFieldValue("company", value || { label: "", id: "" });
                            }}
                        />

                        {/* Email */}
                        <TextField
                            sx={{ width: "300px" }}
                            size="small"
                            variant="outlined"
                            label="Email"
                            name="email"
                            value={searchForm.values.email}
                            onChange={searchForm.handleChange}
                        />

                        {/* Gender */}
                        <Autocomplete
                            sx={{ width: "300px" }}
                            size="small"
                            options={genderList}
                            renderOption={(props, option) => {
                                return (
                                    <li {...props} key={option.id}>
                                        {option.label}
                                    </li>
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value.id === "" || option.id === value.id
                            }
                            value={searchForm.values.gender}
                            renderInput={(params) => <TextField {...params} label="Gender" />}
                            onChange={(_, value) => {
                                searchForm.setFieldValue("gender", value || { label: "", id: "" });
                            }}
                        />

                        {/* Role */}
                        <Autocomplete
                            sx={{ width: "300px" }}
                            size="small"
                            options={roleList}
                            renderOption={(props, option) => {
                                return (
                                    <li {...props} key={option.id}>
                                        {option.label}
                                    </li>
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value.id === "" || option.id === value.id
                            }
                            value={searchForm.values.role}
                            renderInput={(params) => <TextField {...params} label="Role" />}
                            onChange={(_, value) => {
                                searchForm.setFieldValue("role", value || { label: "", id: "" });
                            }}
                        />
                    </Stack>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button variant="contained" onClick={onSearch}>
                        {TEXT.BUTTON_TEXT.SEARCH}
                    </Button>
                    <Button onClick={onResetSearch}>{TEXT.BUTTON_TEXT.RESET}</Button>
                </CardActions>
            </Card>

            {/* TABLE */}
            <Card variant="outlined">
                <CardContent sx={{ padding: 0 }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell width={50}></TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Company</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Role</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataUser.data?.result?.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <GotoEditButton href={"/"} />
                                        </TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.address}</TableCell>
                                        <TableCell>{user.age}</TableCell>
                                        <TableCell>{user?.company?.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.gender}</TableCell>
                                        <TableCell>
                                            <Chip
                                                key={index}
                                                variant="outlined"
                                                color={
                                                    user.role.name === "ROLE_ADMIN"
                                                        ? "error"
                                                        : "info"
                                                }
                                                size="small"
                                                label={user.role.name}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                <Divider />
                <CardActions>
                    <MPagination
                        totalPages={dataUser.data?.meta?.totalPages}
                        currentPage={dataUser.data?.meta?.currentPage}
                        onChange={onPageChange}
                    />
                </CardActions>
            </Card>
        </Stack>
    );
}
export default ListUser;

const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
    {
        label: "The Lord of the Rings: The Return of the King",
        year: 2003,
    },
    { label: "The Good, the Bad and the Ugly", year: 1966 },
    { label: "Fight Club", year: 1999 },
    {
        label: "The Lord of the Rings: The Fellowship of the Ring",
        year: 2001,
    },
    {
        label: "Star Wars: Episode V - The Empire Strikes Back",
        year: 1980,
    },
    { label: "Forrest Gump", year: 1994 },
    { label: "Inception", year: 2010 },
    {
        label: "The Lord of the Rings: The Two Towers",
        year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: "Goodfellas", year: 1990 },
    { label: "The Matrix", year: 1999 },
    { label: "Seven Samurai", year: 1954 },
    {
        label: "Star Wars: Episode IV - A New Hope",
        year: 1977,
    },
    { label: "City of God", year: 2002 },
    { label: "Se7en", year: 1995 },
    { label: "The Silence of the Lambs", year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: "Life Is Beautiful", year: 1997 },
    { label: "The Usual Suspects", year: 1995 },
    { label: "Léon: The Professional", year: 1994 },
    { label: "Spirited Away", year: 2001 },
    { label: "Saving Private Ryan", year: 1998 },
    { label: "Once Upon a Time in the West", year: 1968 },
    { label: "American History X", year: 1998 },
    { label: "Interstellar", year: 2014 },
    { label: "Casablanca", year: 1942 },
    { label: "City Lights", year: 1931 },
    { label: "Psycho", year: 1960 },
    { label: "The Green Mile", year: 1999 },
    { label: "The Intouchables", year: 2011 },
    { label: "Modern Times", year: 1936 },
    { label: "Raiders of the Lost Ark", year: 1981 },
    { label: "Rear Window", year: 1954 },
    { label: "The Pianist", year: 2002 },
    { label: "The Departed", year: 2006 },
    { label: "Terminator 2: Judgment Day", year: 1991 },
    { label: "Back to the Future", year: 1985 },
    { label: "Whiplash", year: 2014 },
    { label: "Gladiator", year: 2000 },
    { label: "Memento", year: 2000 },
    { label: "The Prestige", year: 2006 },
    { label: "The Lion King", year: 1994 },
    { label: "Apocalypse Now", year: 1979 },
    { label: "Alien", year: 1979 },
    { label: "Sunset Boulevard", year: 1950 },
    {
        label: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
        year: 1964,
    },
    { label: "The Great Dictator", year: 1940 },
    { label: "Cinema Paradiso", year: 1988 },
    { label: "The Lives of Others", year: 2006 },
    { label: "Grave of the Fireflies", year: 1988 },
    { label: "Paths of Glory", year: 1957 },
    { label: "Django Unchained", year: 2012 },
    { label: "The Shining", year: 1980 },
    { label: "WALL·E", year: 2008 },
    { label: "American Beauty", year: 1999 },
    { label: "The Dark Knight Rises", year: 2012 },
    { label: "Princess Mononoke", year: 1997 },
    { label: "Aliens", year: 1986 },
    { label: "Oldboy", year: 2003 },
    { label: "Once Upon a Time in America", year: 1984 },
    { label: "Witness for the Prosecution", year: 1957 },
    { label: "Das Boot", year: 1981 },
    { label: "Citizen Kane", year: 1941 },
    { label: "North by Northwest", year: 1959 },
    { label: "Vertigo", year: 1958 },
    {
        label: "Star Wars: Episode VI - Return of the Jedi",
        year: 1983,
    },
    { label: "Reservoir Dogs", year: 1992 },
    { label: "Braveheart", year: 1995 },
    { label: "M", year: 1931 },
    { label: "Requiem for a Dream", year: 2000 },
    { label: "Amélie", year: 2001 },
    { label: "A Clockwork Orange", year: 1971 },
    { label: "Like Stars on Earth", year: 2007 },
    { label: "Taxi Driver", year: 1976 },
    { label: "Lawrence of Arabia", year: 1962 },
    { label: "Double Indemnity", year: 1944 },
    {
        label: "Eternal Sunshine of the Spotless Mind",
        year: 2004,
    },
    { label: "Amadeus", year: 1984 },
    { label: "To Kill a Mockingbird", year: 1962 },
    { label: "Toy Story 3", year: 2010 },
    { label: "Logan", year: 2017 },
    { label: "Full Metal Jacket", year: 1987 },
    { label: "Dangal", year: 2016 },
    { label: "The Sting", year: 1973 },
    { label: "2001: A Space Odyssey", year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: "Toy Story", year: 1995 },
    { label: "Bicycle Thieves", year: 1948 },
    { label: "The Kid", year: 1921 },
    { label: "Inglourious Basterds", year: 2009 },
    { label: "Snatch", year: 2000 },
    { label: "3 Idiots", year: 2009 },
    { label: "Monty Python and the Holy Grail", year: 1975 },
];
