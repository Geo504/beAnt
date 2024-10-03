"use client";

import { useSidebarStore } from "@/src/store/sidebar";
import SidebarMenuItem from "./sidebarMenuItem";

import { lifeSavers } from "../ui/fonts";
import { AccountsSvg, CloseSvg, HomeSvg, ProfileSvg } from "../icons";



const menuItems = [
  {
    title: 'Home',
    subtitle: [
      {name: 'Total Period Income', path: '/user/home'},
      {name: 'Total Period Expenses', path: '/user/home'},
      {name: 'Total Balance', path: '/user/home'},
      {name: 'Monthly Expenses', path: '/user/home'},
    ],
    icon: <HomeSvg />,
  },
  {
    title: 'Profile',
    subtitle: [
      {name: 'Profile Setup', path: '/user/profile'},
      {name: 'Total Capital', path: '/user/profile'},
    ],
    icon: <ProfileSvg />,
  },
  {
    title: 'Accounts',
    subtitle: [
      {name: 'Accounts', path: '/user/accounts'}, 
      {name: 'Transactions History', path: '/user/accounts/transactions'},
    ],
    icon: <AccountsSvg />,
  }
]



export default function SideBar() {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore()

  return (
    <>
    {sidebarOpen && (
      <div 
        className="fixed lg:hidden top-0 left-0 w-screen h-screen z-10 bg-primarySoft/30 backdrop-blur-sm"
        onClick={ setSidebarOpen }
      />
    )}
    

    <aside className={`z-20 fixed lg:relative top-4 lg:top-0 bottom-4 lg:bottom-0 p-2 min-w-60 bg-secondary rounded lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-[107%]'} transition-transform duration-300`}>

      <header className="flex justify-between mb-2 text-primary lg:hidden">
        <h2 className={`${lifeSavers.className} text-xl`}>BeAnt</h2>

        <button onClick={setSidebarOpen}>
          <CloseSvg className="hover:scale-125 transition-transform duration-300"/>
        </button>
      </header>
      
      <nav className="flex flex-col gap-0.5">
        {menuItems.map( item => (
          <SidebarMenuItem key={item.title} {...item} />
        ))}
      </nav>

    </aside>
    </>
  )
}
