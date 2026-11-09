import { useTranslations } from "next-intl";

const COLUMNS = ["", "sm:grid-cols-1", "sm:grid-cols-2", "sm:grid-cols-3"];

const toTeamSize = (value) => {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
};

/**
 * Compact "role · team · duration" strip for a case study. Each fact is
 * optional; the strip renders nothing when none of them is present.
 */
export const ProjectFacts = ({ role, team, duration }) => {
  const t = useTranslations("ProjectFacts");
  const teamSize = toTeamSize(team);
  const facts = [
    role ? { key: "role", label: t("role"), value: role } : null,
    teamSize
      ? {
          key: "team",
          label: t("team"),
          value: t("people", { count: teamSize }),
        }
      : null,
    duration
      ? { key: "duration", label: t("duration"), value: duration }
      : null,
  ].filter(Boolean);

  if (facts.length === 0) return null;

  return (
    <dl
      className={`m-0 grid max-w-[640px] grid-cols-1 overflow-hidden rounded-xl border border-line bg-surface ${COLUMNS[facts.length]}`}
    >
      {facts.map(({ key, label, value }) => (
        <div
          key={key}
          className="flex min-w-0 flex-col gap-1 border-line px-4 py-3 [&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-t-0"
        >
          <dt className="mono text-xs text-muted">{label}</dt>
          <dd className="m-0 text-[15px] font-semibold leading-snug text-fg">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
};
