"use client";
import { Button } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { useState, useEffect } from "react";

export function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    const [colorSchemeValue, setColorSchemeValue] = useState<string>();

    useEffect(() => {
        const element = document.querySelector("html");

        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.type === "attributes" && mutation.attributeName === "data-mui-color-scheme") {
                    const targetElement = mutation.target as HTMLElement;
                    const newValue = targetElement.getAttribute("data-mui-color-scheme");
                    if (newValue) {
                        setColorSchemeValue(newValue);
                    }
                }
            }
        });

        if (element) {
            observer.observe(element, { attributes: true });
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleToggle = () => {
        setMode(mode === "light" ? "dark" : "light");
    };

    return (
        <Button onClick={handleToggle} variant="contained">
            {colorSchemeValue}
        </Button>
    );
}
