import SideBar from "@/src/components/sideBar/sidebar";



export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <div className="flex grow px-4 pb-4">

      <SideBar />

      <main className="flex flex-col grow items-center justify-center">
        {children}
      </main>
      
    </div>
  );
}