export const CustomSeoTieIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Head */}
    <circle cx="9" cy="7" r="4" />
    {/* Body */}
    <path d="M15 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
    {/* Tie */}
    <polygon points="9,14.5 10.5,17 9,21 7.5,17" fill="currentColor" stroke="none" />
    {/* Magnifying Glass */}
    <circle cx="17" cy="17" r="3" />
    <line x1="22" y1="22" x2="19.12" y2="19.12" />
  </svg>
);
