import { SEAT_IDS, seatLabel, type SeatId } from "@/lib/poker/position/nine-max";

type Props = {
  highlightSeatId?: SeatId;
  className?: string;
};

/** Top-down 9-max: BTN at bottom, seats clockwise. */
export function NineMaxTable({ highlightSeatId, className = "" }: Props) {
  const cx = 200;
  const cy = 200;
  const r = 150;
  const seatR = 22;
  const n = SEAT_IDS.length;

  const seats = SEAT_IDS.map((id, i) => {
    const a = Math.PI / 2 - (i * (2 * Math.PI)) / n;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    return { id, x, y };
  });

  return (
    <svg
      viewBox="0 0 400 400"
      className={`h-auto w-full max-w-md text-stone-900 dark:text-stone-100 ${className}`}
      role="img"
      aria-label="Nine-handed table with seat positions clockwise from the button"
    >
      <ellipse
        cx={cx}
        cy={cy}
        rx={r + 28}
        ry={r * 0.55 + 28}
        fill="none"
        stroke="currentColor"
        className="text-stone-300 dark:text-stone-600"
        strokeWidth={2}
      />
      {seats.map(({ id, x, y }) => {
        const hi = id === highlightSeatId;
        return (
          <g key={id}>
            <circle
              cx={x}
              cy={y}
              r={seatR}
              className={
                hi
                  ? "fill-emerald-200 stroke-emerald-700 dark:fill-emerald-900/50 dark:stroke-emerald-400"
                  : "fill-stone-100 stroke-stone-400 dark:fill-stone-800 dark:stroke-stone-500"
              }
              strokeWidth={2}
            />
            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              className="fill-stone-900 text-[11px] font-semibold dark:fill-stone-100"
            >
              {seatLabel(id)}
            </text>
          </g>
        );
      })}
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        className="fill-stone-500 text-xs font-medium dark:fill-stone-400"
      >
        Table
      </text>
    </svg>
  );
}
