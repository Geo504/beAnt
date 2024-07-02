export function CircleSvg({ className="", size=24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      className={className}
    >
      <path fill="currentColor" d="M232 128A104 104 0 1 1 128 24a104.13 104.13 0 0 1 104 104"/>
    </svg>
  );
}
