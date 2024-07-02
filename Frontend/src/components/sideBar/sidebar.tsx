import SidebarMenuItem from "./sidebarMenuItem"
import { AccountsSvg, HomeSvg, ProfileSvg } from "../icons"



const menuItems = [
  {
    title: 'Home',
    subtitle: ['Total Period Income', 'Total Period Expenses', 'Total Balance', 'Monthly Expenses', 'Statistics Accounts', 'Income vs. Expense', 'Payments History', 'Monthly Budgets', 'Transaction History'],
    icon: <HomeSvg />,
    path: '/user/home',
  },
  {
    title: 'Profile',
    subtitle: ['Total Balance', 'Total Capital'],
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
  return (
    <aside className="p-2 min-w-60 bg-secondary rounded">
      <nav className="flex flex-col gap-0.5">
        {menuItems.map( item => (
          <SidebarMenuItem key={item.path} {...item} />
        ))}
      </nav>
    </aside>
  )
}
