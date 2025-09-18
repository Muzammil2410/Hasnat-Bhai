import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "Basirota. - Admin",
    description: "Basirota. - Admin",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
