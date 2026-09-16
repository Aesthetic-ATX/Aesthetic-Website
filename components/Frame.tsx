/**
 * A labelled photo slot at final dimensions, so dropping the real image in
 * never shifts the layout. Never a stock photo, never a grey blur.
 */
export function Frame({
  waitingFor, note, ratio, minHeight, className = "", style,
}: {
  waitingFor: string;
  note?: string;
  ratio?: string;
  minHeight?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`frame ${className}`}
      style={{ aspectRatio: ratio, minHeight, ...style }}
    >
      <span className="fl">{waitingFor}</span>
      {note ? <p className="sm" style={{ maxWidth: "34ch" }}>{note}</p> : null}
    </div>
  );
}

/** Marks a fact the church still owes. Uses no colour, only weight and a keyline. */
export function Needed({ children }: { children: React.ReactNode }) {
  return <p className="bd need">{children}</p>;
}
