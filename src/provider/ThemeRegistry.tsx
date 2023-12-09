'use client';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo, useState } from 'react';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { ModeToggle } from '@/components/common/modeToggle/ModeToggle';
import { cyan, lightBlue, pink } from '@mui/material/colors';

export const borderRadius = '10px';
export const heightHeader = '80px';
// declare module "@mui/system" {
//     interface Theme {
//         heightHeader: string;
//     }
// }

export default function ThemeRegistry(props: any) {
    const theme = useMemo(
        () =>
            extendTheme({
                colorSchemes: {
                    light: {
                        palette: {
                            primary: {
                                main: cyan['700'],
                            },
                            secondary: {
                                main: lightBlue['500'],
                            },
                            AppBar: {
                                darkBg: 'white',
                            },
                        },
                    },
                    dark: {
                        palette: {
                            primary: {
                                main: cyan['400'],
                            },
                            secondary: {
                                main: lightBlue['500'],
                            },
                        },
                    },
                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                borderRadius,
                                textTransform: 'none',
                            },
                        },
                    },
                    MuiAppBar: {
                        styleOverrides: {
                            root: {
                                height: heightHeader,
                                boxShadow: 'none',
                            },
                        },
                    },
                    MuiOutlinedInput: {
                        styleOverrides: {
                            root: {
                                borderRadius,
                                // '&:hover .MuiOutlinedInput-notchedOutline': {
                                //     borderColor: cyan['500'],
                                // },
                            },
                        },
                    },
                    MuiCard: {
                        styleOverrides: {
                            root: {
                                borderRadius,
                            },
                        },
                    },
                    MuiTooltip: {
                        styleOverrides: {
                            tooltip: {
                                borderRadius,
                            },
                        },
                    },
                    MuiTable: {
                        styleOverrides: {
                            root: {
                                '& .MuiTableCell-head': {
                                    fontWeight: 600,
                                    paddingTop: 16,
                                    paddingBottom: 16,
                                },
                            },
                        },
                    },
                    MuiList: {
                        styleOverrides: {
                            root: {
                                '& .MuiListItemButton-root': {
                                    borderRadius,
                                },
                            },
                        },
                    },
                },
            }),
        [],
    );

    const { options, children } = props;

    const [{ cache, flush }] = useState(() => {
        const cache = createCache(options);
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: string[] = [];
        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };
        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) {
            return null;
        }
        let styles = '';
        for (const name of names) {
            styles += cache.inserted[name];
        }
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(' ')}`}
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />
        );
    });

    return (
        <CacheProvider value={cache}>
            <CssVarsProvider theme={theme}>
                <CssBaseline />
                {children}
            </CssVarsProvider>
        </CacheProvider>
    );
}
