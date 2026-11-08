/** Placeholder thumbnail for posts without a cover image. */
export const CoverFallback = ({ label, className = "" }) => (
  <span
    aria-hidden="true"
    className={`mono flex items-center justify-center border border-line bg-surface-2 text-[13px] text-muted ${className}`}
  >
    {label}
  </span>
);
