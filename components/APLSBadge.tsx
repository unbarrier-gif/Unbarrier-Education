type Props = { width?: number; className?: string };

const ASPECT = 307 / 68;

export function APLSBadge({ width = 96, className }: Props) {
  return (
    <img
      src="/assets/apls-badge.svg"
      alt="Apple Professional Learning Specialist"
      width={width}
      height={Math.round(width / ASPECT)}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    />
  );
}
