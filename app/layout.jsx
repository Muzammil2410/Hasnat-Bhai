import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import "./globals.css";

export const metadata = {
    title: "Shop smarter",
    description: "Shop smarter",
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/Z.png" sizes="any" />
                <link rel="apple-touch-icon" href="/Z.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/Z.png" />
                <link rel="icon" type="image/png" sizes="256x256" href="/Z.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/Z.png" />
            </head>
            <body className="antialiased">
                <StoreProvider>
                    <Toaster />
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}
