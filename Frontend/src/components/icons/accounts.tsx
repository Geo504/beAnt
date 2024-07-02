export function AccountsSvg({ className="", size=24 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 14 14" className={className}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="9" cy="5.5" rx="4.5" ry="2"/><path d="M4.5 5.5v6c0 1.1 2 2 4.5 2s4.5-.9 4.5-2v-6"/><path d="M13.5 8.5c0 1.1-2 2-4.5 2s-4.5-.9-4.5-2m4.4-7A6.77 6.77 0 0 0 5 .5C2.51.5.5 1.4.5 2.5c0 .59.58 1.12 1.5 1.5"/><path d="M2 10C1.08 9.62.5 9.09.5 8.5v-6"/><path d="M2 7C1.08 6.62.5 6.09.5 5.5"/></g>
    </svg>  
  );
}