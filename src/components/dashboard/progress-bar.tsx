'use client';

interface ProgressBarProps {
  progress: number;
  colorClassName: string;
}

export function ProgressBar({ progress, colorClassName }: ProgressBarProps) {
  return (
    <span className="relative block h-2 overflow-hidden rounded-full bg-white/10">
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 rounded-full ${colorClassName}`}
        style={{ transformOrigin: '0 50%', transform: `scaleX(${progress / 100})` }}
      />
    </span>
  );
}