/**
 * The motion tokens for script timers, in milliseconds. A mirror of the --t-* custom properties
 * in app/globals.css (:root): change one, change both. CSS timings use the custom properties
 * directly; only setTimeout-style waits come from here.
 */
export const T = { quick: 160, base: 480, slow: 960, step: 60 } as const;
