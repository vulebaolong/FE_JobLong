"use client";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { useMemo, useState } from "react";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { ModeToggle } from "@/components/modeToggle/ModeToggle";
import { cyan, pink } from "@mui/material/colors";

const borderRadius = "15px";
export const heightHeader = "80px";
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
                                main: cyan[500],
                            },
                            secondary: {
                                main: cyan["A400"],
                            },
                        },
                    },
                    dark: {
                        palette: {
                            primary: {
                                main: cyan[500],
                            },
                            secondary: {
                                main: cyan["A400"],
                            },
                        },
                    },
                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                borderRadius,
                            },
                        },
                    },
                    MuiAppBar: {
                        styleOverrides: {
                            root: {
                                height: heightHeader,
                            },
                        },
                    },
                },
            }),
        []
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
        let styles = "";
        for (const name of names) {
            styles += cache.inserted[name];
        }
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(" ")}`}
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
