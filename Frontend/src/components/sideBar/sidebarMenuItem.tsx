"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ArrowRightSvg } from "../icons";



interface Props {
  path: string;
  icon: JSX.Element;
  title: string;
  subtitle: string[];
}


export default function SidebarMenuItem({ title, subtitle, icon, path }: Props) {

  const currentPath = usePathname();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const isExpanded = currentPath === path;
      const currentHeight = sectionRef.current.style.maxHeight;
      const scrollHeight = `${sectionRef.current.scrollHeight}px`;
  
      if (isExpanded && currentHeight !== scrollHeight) {
        sectionRef.current.style.maxHeight = scrollHeight;
      }
      else if (!isExpanded && currentHeight !== '0') {
        sectionRef.current.style.maxHeight = '0';
      }
    }
  }, [currentPath]);



  return (
    <>
    <Link href={path} className={`flex items-center gap-1 px-2 py-1 rounded text-lg font-medium transition ease-linear duration-150 ${ currentPath === path ? 'text-primary-foreground bg-primary hover:bg-primary/90' : 'text-primary hover:bg-background'}`}>

      {icon}
      <span>{title}</span>
      <ArrowRightSvg className={`ml-auto transition duration-150 ${currentPath === path ? 'rotate-90' : ''}`} size={20}/>

    </Link>

    <section ref={sectionRef} className={`text-sm text-muted-foreground ps-8 overflow-hidden transition-all duration-150 ease-in-out`}>
      {subtitle.map( text => {
        return <p key={text} className="text-sm hover:text-primary">{text}</p>
      })}
    </section>
    </>
  )
}