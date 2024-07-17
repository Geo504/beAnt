"use client";

import Link from "next/link";

import { useSidebarStore } from "@/src/store/sidebar";

import { ArrowRightSvg } from "../icons";



interface Props {
  path: string;
  icon: JSX.Element;
  title: string;
  subtitle: string[];
}


export default function SidebarMenuItem({ title, subtitle, icon, path }: Props) {
  const { openTag, setOpenTag, setSidebarOpen } = useSidebarStore();

  const handleSidebarToggle = () => {
    const MD_BREAKPOINT = 768;  // TailwindCSS md breakpoint is 768px,
    if (window.innerWidth < MD_BREAKPOINT) {
      setSidebarOpen();
    }
    return;
  };


  return (
    <>
    <button
      className={`flex items-center gap-1 px-2 py-1 rounded text-lg font-medium transition ease-linear duration-200 ${ openTag === title ? 'text-primary-foreground bg-primary hover:bg-primary/90' : 'text-primary hover:bg-background'}`}
      onClick={()=>setOpenTag(openTag === title ? '' : title)}>

      {icon}
      <span>{title}</span>
      <ArrowRightSvg className={`ml-auto transition duration-200 ${openTag === title ? 'rotate-90' : ''}`} size={20}/>

    </button>

    <section className={`flex flex-col text-sm text-muted-foreground ps-8 overflow-hidden ${openTag === title ? 'max-h-[12rem] opacity-100' : 'max-h-0 opacity-0'} transition-all duration-200 ease-in-out`}>
      {subtitle.map( text => {
        return <Link key={text} href={path} onClick={handleSidebarToggle} className="text-sm hover:text-primary">{text}</Link>
      })}
    </section>
    </>
  )
}