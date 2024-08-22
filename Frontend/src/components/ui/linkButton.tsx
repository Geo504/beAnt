import Link from "next/link";


interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}



export default function LinkButton({ href, children, className="", disabled=false }: LinkButtonProps) {
  if (disabled) {
    return (
      <span className={`inline-flex items-center justify-center h-7 w-7 rounded-md border opacity-50 pointer-events-none ${className}`}>
        {children}
      </span>
    )
  }
  return (
    <Link href={href} className={`inline-flex items-center justify-center h-7 w-7 rounded-md border hover:bg-accent hover:shadow-md dark:hover:shadow-primary/30 duration-300 transition-all ${className}`}>
      {children}
    </Link>
  )
}
