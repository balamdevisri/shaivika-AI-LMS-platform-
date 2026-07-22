import React from 'react';

interface KaizenQSymbolProps {
  size?: number;
  theme?: 'light' | 'dark' | 'glass';
  className?: string;
  showGlow?: boolean;
  animateNodes?: boolean;
}

export const KaizenQSymbol: React.FC<KaizenQSymbolProps> = ({
  size = 64,
  theme = 'light',
  className = '',
  showGlow = true,
  animateNodes = false,
}) => {
  const gradientId = `kqGrad_${Math.random().toString(36).substring(2, 9)}`;
  const arrowGradId = `kqArrowGrad_${Math.random().toString(36).substring(2, 9)}`;
  const glowId = `kqGlow_${Math.random().toString(36).substring(2, 9)}`;
  const strokeColor = theme === 'dark' ? '#22D3EE' : '#2563EB';

  return (
    <div
      className={`inline-flex items-center justify-center relative select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 220 200"
        width={size}
        height={size}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="40%" stopColor={strokeColor} />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>

          <linearGradient id={arrowGradId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {showGlow && (
            <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          )}
        </defs>

        <g transform="translate(15, 0)" filter={showGlow ? `url(#${glowId})` : undefined}>
          {/* 1. Left AI Circuit Branches */}
          <g className={animateNodes ? 'animate-pulse' : ''}>
            <line x1="12" y1="72" x2="48" y2="72" stroke={`url(#${gradientId})`} strokeWidth="3" strokeLinecap="round" />
            <circle cx="12" cy="72" r="4.5" fill="none" stroke={`url(#${gradientId})`} strokeWidth="3" />
            <polygon points="46,68 56,72 46,76" fill={`url(#${gradientId})`} />

            <line x1="2" y1="100" x2="44" y2="100" stroke={`url(#${gradientId})`} strokeWidth="3" strokeLinecap="round" />
            <circle cx="2" cy="100" r="4.5" fill="none" stroke={`url(#${gradientId})`} strokeWidth="3" />
            <polygon points="42,96 52,100 42,104" fill={`url(#${gradientId})`} />

            <line x1="18" y1="128" x2="48" y2="128" stroke={`url(#${gradientId})`} strokeWidth="3" strokeLinecap="round" />
            <circle cx="18" cy="128" r="4.5" fill="none" stroke={`url(#${gradientId})`} strokeWidth="3" />
            <polygon points="46,124 56,128 46,132" fill={`url(#${gradientId})`} />
          </g>

          {/* 2. Circular Q Outer Ring */}
          <circle
            cx="110"
            cy="100"
            r="66"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* 3. Geometric K Stem & Arms */}
          <line
            x1="80"
            y1="56"
            x2="80"
            y2="144"
            stroke={`url(#${gradientId})`}
            strokeWidth="15"
            strokeLinecap="round"
          />
          <path
            d="M 80 100 L 136 54"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="15"
            strokeLinecap="round"
          />
          <path
            d="M 80 100 L 148 144 L 172 168"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="15"
            strokeLinecap="round"
          />

          {/* 4. Internal Upward Arrow */}
          <g transform="translate(120, 88)">
            <path
              d="M 0 16 L 0 0 M -6 6 L 0 -1 L 6 6"
              fill="none"
              stroke={`url(#${arrowGradId})`}
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
