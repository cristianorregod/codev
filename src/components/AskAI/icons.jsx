const Svg = ({ size = 18, strokeWidth = 2, children, ...props }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {children}
  </svg>
);

export const SparkIcon = (props) => (
  <Svg size={19} strokeWidth={1.9} {...props}>
    <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
  </Svg>
);

export const SendIcon = (props) => (
  <Svg {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const StopIcon = (props) => (
  <Svg {...props}>
    <rect x="7" y="7" width="10" height="10" rx="1.5" />
  </Svg>
);

export const NewChatIcon = (props) => (
  <Svg size={16} {...props}>
    <path d="M12 20h9" />
    <path d="M16.4 3.6a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4z" />
  </Svg>
);

const small = { size: 14, strokeWidth: 1.9 };

export const FolderIcon = (props) => (
  <Svg {...small} {...props}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </Svg>
);

export const DocIcon = (props) => (
  <Svg {...small} {...props}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </Svg>
);

export const DownloadIcon = (props) => (
  <Svg {...small} {...props}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </Svg>
);

export const MailIcon = (props) => (
  <Svg {...small} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </Svg>
);

export const ExternalIcon = (props) => (
  <Svg {...small} {...props}>
    <path d="M14 4h6v6M20 4l-9 9" />
    <path d="M19 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" />
  </Svg>
);

export const HashIcon = (props) => (
  <Svg {...small} {...props}>
    <path d="M5 9h14M5 15h14M10 4L8 20M16 4l-2 16" />
  </Svg>
);
