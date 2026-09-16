"use client";

import { useState } from "react";

/**
 * Monthly email sign-up. Phase 1 ships the layout only: nothing is sent
 * anywhere yet, and submitting says so plainly. Phase 2 passes onSubscribe.
 */
export function SignUp({ onSubscribe }: { onSubscribe?: (email: string) => Promise<void> }) {
  const [status, setStatus] = useState<"idle" | "unwired" | "done" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!onSubscribe) return setStatus("unwired");
    try {
      await onSubscribe(email);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const message = {
    idle: "",
    unwired: "Sign-up isn't live yet. Follow us on Instagram in the meantime.",
    done: "You're in. See you in your inbox.",
    error: "That didn't go through. Please try again.",
  }[status];

  return (
    <form className="signup" onSubmit={submit}>
      <label htmlFor="signup-email" className="sr-only">Email address</label>
      <input
        id="signup-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Enter your email"
        className="signup-input"
      />
      <button type="submit" className="btn btn-v">Sign me up</button>
      <p className="sm signup-msg" role="status" aria-live="polite">{message}</p>
    </form>
  );
}
