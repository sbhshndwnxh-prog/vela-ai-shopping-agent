import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };
const base = (size = 20) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true });

export function ArrowRight({ size, ...props }: IconProps) { return <svg {...base(size)} {...props}><path d="M5 12h14M13 6l6 6-6 6" /></svg>; }
export function Check({ size, ...props }: IconProps) { return <svg {...base(size)} {...props}><path d="m5 12 4 4L19 6" /></svg>; }
export function ChevronDown({ size, ...props }: IconProps) { return <svg {...base(size)} {...props}><path d="m6 9 6 6 6-6" /></svg>; }
export function ImagePlus({ size, ...props }: IconProps) { return <svg {...base(size)} {...props}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m3 16 5-5 4 4 2-2 7 7M16 8h4M18 6v4"/></svg>; }
export function LoaderCircle({ size, ...props }: IconProps) { return <svg {...base(size)} {...props}><path d="M21 12a9 9 0 1 1-6.2-8.55" /></svg>; }
export function MessageCircle({ size, ...props }: IconProps) { return <svg {...base(size)} {...props}><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.4 9.4 0 0 1-4-.9L3 21l1.8-4.7A8.3 8.3 0 1 1 21 11.5Z" /></svg>; }
export function RotateCcw({ size, ...props }: IconProps) { return <svg {...base(size)} {...props}><path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" /></svg>; }
export function ShieldCheck({ size, ...props }: IconProps) { return <svg {...base(size)} {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>; }
export function Sparkles({ size, ...props }: IconProps) { return <svg {...base(size)} {...props}><path d="m12 3-1 3-3 1 3 1 1 3 1-3 3-1-3-1-1-3ZM19 13l-.8 2.2L16 16l2.2.8L19 19l.8-2.2L22 16l-2.2-.8L19 13ZM5 12l-1 3-3 1 3 1 1 3 1-3 3-1-3-1-1-3Z" /></svg>; }
export function Upload({ size, ...props }: IconProps) { return <svg {...base(size)} {...props}><path d="M12 16V4m-4 4 4-4 4 4M4 20h16" /></svg>; }
export function X({ size, ...props }: IconProps) { return <svg {...base(size)} {...props}><path d="m6 6 12 12M18 6 6 18" /></svg>; }
