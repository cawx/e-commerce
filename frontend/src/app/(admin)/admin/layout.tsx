import AdminSidebar from "./components/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminSidebar />
        <main>{children}</main>
      </body>
    </html>
  );
}
