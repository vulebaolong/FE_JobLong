import { Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";

function Logo() {
    return (
        <Link href={"/"} className="flex items-center gap-2 mr-2">
            <AdbIcon sx={{ color: (theme) => theme.palette.primary.light }} />
            <Typography
                variant="h6"
                noWrap
                component="span"
                sx={{
                    fontFamily: "monospace",
                    fontWeight: 800,
                    letterSpacing: ".3rem",
                    color: (theme) => theme.palette.primary.light,
                }}
            >
                LOGO
            </Typography>
        </Link>
    );
}
export default Logo;
