import { ReduxProvider } from "@/provider/ReduxProvider"
import ThemeRegistry from "@/provider/ThemeRegistry"
import ToastProvider from "@/provider/ToastProvider"
import { ReactNode } from "react"

function Provider({ children }: { children: ReactNode }) {
    return (
        <ReduxProvider>
            <ToastProvider />
            <ThemeRegistry options={{ key: "mui" }}>
                {children}
            </ThemeRegistry>
        </ReduxProvider>
    )
}
export default Provider