import HeaderRoute from "@/src/components/header/headerRoute";
import SideBar from "@/src/components/sideBar/sidebar";



export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <div className="flex grow gap-4 px-4 pb-4 overflow-x-hidden">

      <SideBar />

      <main className="flex flex-col grow">
        <HeaderRoute />
        {children}
      </main>
      
    </div>
  );
}