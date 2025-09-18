import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "Basirota. - Store Dashboard",
    description: "Basirota. - Store Dashboard",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}
