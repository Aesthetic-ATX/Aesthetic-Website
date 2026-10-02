/* Austin time, shared by the Groups week strip and What's happening. Everything that depends on
   today's date waits for the browser: the server can't know it, and the page is built once. */

export type Now = { today: Date; iso: string; wd: number; min: number };

/** `?now=2026-10-10T18:30` previews another moment (any page, any visitor). */
export const previewing = () => /^\d{4}-\d\d-\d\d(T\d\d:\d\d)?$/.test(new URLSearchParams(location.search).get("now") ?? "");

/** Austin's date and time, whatever the visitor's clock or time zone says. */
export function austinNow(): Now {
  const q = new URLSearchParams(location.search).get("now");
  let y: number, m: number, d: number, min: number;
  if (q && previewing()) {
    const [date, time = "00:00"] = q.split("T");
    [y, m, d] = date.split("-").map(Number);
    const [h, mi] = time.split(":").map(Number);
    min = h * 60 + mi;
  } else {
    const p = Object.fromEntries(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago", year: "numeric", month: "numeric", day: "numeric",
        hour: "numeric", minute: "numeric", hourCycle: "h23",
      }).formatToParts(new Date()).map((x) => [x.type, x.value]),
    );
    [y, m, d, min] = [+p.year, +p.month, +p.day, +p.hour * 60 + +p.minute];
  }
  const today = new Date(Date.UTC(y, m - 1, d));
  return { today, iso: today.toISOString().slice(0, 10), wd: (today.getUTCDay() + 6) % 7, min };
}

/** The date of weekday `wd` (0 = Monday) in the week `now` falls in; past 6 reaches into next week. */
export const dayOf = (now: Now, wd: number) => { const d = new Date(now.today); d.setUTCDate(d.getUTCDate() - now.wd + wd); return d; };
export const fmt = (d: Date, o: Intl.DateTimeFormatOptions) => d.toLocaleDateString("en-US", { timeZone: "UTC", ...o });
/** Minutes after midnight for "6:30pm" or "10am". */
export function startMin(t: string) {
  const [, h, mi = "0", ap] = t.match(/(\d+)(?::(\d+))?(am|pm)/)!;
  return ((+h % 12) + (ap === "pm" ? 12 : 0)) * 60 + +mi;
}
