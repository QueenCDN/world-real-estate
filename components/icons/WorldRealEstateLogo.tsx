
import React from 'react';

export const WorldRealEstateLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FDE047', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#FBBF24', stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        <g fill="url(#goldGradient)">
            <path d="M50,15 L70,15 L70,70 L50,70 Z" transform="skewY(-30) translate(0, 10)" />
            <path d="M80,5 L110,5 L110,80 L80,80 Z" />
            <path d="M120,25 L140,25 L140,85 L120,85 Z" transform="skewY(20) translate(0, -5)" />
            <path d="M30 80 L160 80 L95 40 Z" />
            <path d="M60 140 C 60 110, 130 110, 130 140 L 60 140 Z" transform="translate(4, -20)" />
            <rect x="87" y="65" width="26" height="15" rx="5" />
            <line x1="100" y1="65" x2="100" y2="80" stroke="#0f172a" strokeWidth="2"/>
            <line x1="87" y1="72.5" x2="113" y2="72.5" stroke="#0f172a" strokeWidth="2"/>
        </g>
    </svg>
);
