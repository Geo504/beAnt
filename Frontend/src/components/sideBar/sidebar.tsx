"use client";

import { useSidebarStore } from "@/src/store/sidebar";
import SidebarMenuItem from "./sidebarMenuItem";

import { lifeSavers } from "../ui/fonts";
import { AccountsSvg, CloseSvg, HomeSvg, ProfileSvg } from "../icons";



const menuItems = [
  {
    title: 'Home',
    subtitle: ['Total Period Income', 'Total Period Expenses', 'Total Balance', 'Monthly Expenses', 'Statistics Accounts', 'Income vs. Expense', 'Payments History', 'Monthly Budgets', 'Transaction History'],
    icon: <HomeSvg />,
    path: '/user/home',
  },
  {
    title: 'Profile',
    subtitle: ['Profile Setup', 'Total Capital'],
    icon: <ProfileSvg />,
    path: '/user/profile',
  },
  {
    title: 'Accounts',
    subtitle: ['Accounts', 'Total Period Income', 'Total Period Expenses', 'Total Balance', 'Statistics Accounts'],
    icon: <AccountsSvg />,
    path: '/user/accounts',
  }
]



export default function SideBar() {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore()

  return (
    <>
    {sidebarOpen && (
      <div 
        className="fade-out fixed md:hidden top-0 left-0 w-screen h-screen z-10 bg-primarySoft/30 backdrop-blur-sm"
        onClick={ setSidebarOpen }
      />
    )}
    

    <aside className={`z-20 fixed md:relative top-4 md:top-0 bottom-4 md:bottom-0 p-2 min-w-60 bg-secondary rounded md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-[107%]'} transition-transform duration-300`}>

      <header className="flex justify-between mb-2 text-primary md:hidden">
        <h2 className={`${lifeSavers.className} text-xl`}>BeAnt</h2>

        <button onClick={setSidebarOpen}>
          <CloseSvg className="hover:scale-125 transition-transform duration-300"/>
        </button>
      </header>
      
      <nav className="flex flex-col gap-0.5">
        {menuItems.map( item => (
          <SidebarMenuItem key={item.path} {...item} />
        ))}
      </nav>

    </aside>
    </>
  )
}
