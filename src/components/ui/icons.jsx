// Stroke icons taken from the approved prototype (24x24 grid, currentColor).
const Svg = ({ size = 18, strokeWidth = 1.8, children, ...props }) => (
  <svg
    aria-hidden="true"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    focusable="false"
    {...props}
  >
    {children}
  </svg>
);

export const SunIcon = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Svg>
);

export const MoonIcon = (props) => (
  <Svg {...props}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </Svg>
);

export const ArrowDownIcon = (props) => (
  <Svg size={16} strokeWidth={2.2} {...props}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </Svg>
);

export const ArrowLeftIcon = (props) => (
  <Svg size={16} strokeWidth={2} {...props}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </Svg>
);

export const DownloadIcon = (props) => (
  <Svg size={16} strokeWidth={2.2} {...props}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </Svg>
);

export const BriefcaseIcon = (props) => (
  <Svg size={20} {...props}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
  </Svg>
);

export const CodeIcon = (props) => (
  <Svg size={20} {...props}>
    <path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 4l-4 16" />
  </Svg>
);

export const DatabaseIcon = (props) => (
  <Svg size={20} {...props}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
  </Svg>
);

export const ArrowUpRightIcon = (props) => (
  <Svg strokeWidth={2} {...props}>
    <path d="M7 17 17 7M9 7h8v8" />
  </Svg>
);

export const ChevronDownIcon = (props) => (
  <Svg strokeWidth={2} {...props}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);

export const ShareIcon = (props) => (
  <Svg size={16} strokeWidth={2} {...props}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
  </Svg>
);

export const MenuIcon = (props) => (
  <Svg size={20} strokeWidth={2} {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const CloseIcon = (props) => (
  <Svg size={20} strokeWidth={2} {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const CheckIcon = (props) => (
  <Svg size={16} strokeWidth={2} {...props}>
    <path d="m5 12.5 4.2 4.2L19 7" />
  </Svg>
);

export const ClockIcon = (props) => (
  <Svg size={14} strokeWidth={2} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);
