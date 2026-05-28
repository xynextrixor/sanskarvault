export default function CustomLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer abstract shape - left top semi */}
      <path d="M 50 5 L 50 25 A 25 25 0 0 0 25 50 A 25 25 0 0 0 32 68 A 45 45 0 0 1 5 50 A 45 45 0 0 1 50 5 Z" fill="currentColor"/>
      {/* Outer abstract shape - right bottom semi */}
      <path d="M 50 95 L 50 75 A 25 25 0 0 0 75 50 A 25 25 0 0 0 68 32 A 45 45 0 0 1 95 50 A 45 45 0 0 1 50 95 Z" fill="currentColor"/>
      
      {/* Inner text dots (representing the text ring) */}
      <circle cx="50" cy="50" r="33" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 5.5" />
      
      {/* Sun Rays */}
      <line x1="50" y1="38" x2="50" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="39" y1="42" x2="31" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="61" y1="42" x2="69" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="52" x2="23" y2="48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="68" y1="52" x2="77" y2="48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Sun curve */}
      <path d="M 33 58 A 18 18 0 0 1 67 58" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      
      {/* Open Book / Leaves */}
      <path d="M 32 65 Q 45 56 50 68 Q 55 56 68 65 Q 55 72 50 78 Q 45 72 32 65 Z" fill="currentColor" />
    </svg>
  );
}
