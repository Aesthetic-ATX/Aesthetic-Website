import { GroupsWeek } from "@/components/GroupsWeek";
import { metaFor } from "@/data/meta";

export const metadata = metaFor("groups");

export default function Groups() {
  return (
    <section className="sec page-groups">
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "clamp(32px,4vw,44px)" }}>
        <div className="col" style={{ gap: 18 }}>
          <span className="lbl">GROUPS</span>
          <h1 className="h1" style={{ fontSize: "clamp(40px,5.6vw,62px)", maxWidth: "19ch" }}>
            Honest questions, in a room with other people.
          </h1>
          <p className="bl" style={{ maxWidth: "62ch" }}>
            Three groups meet through the week. One reads through Luke on Wednesday evenings, one
            walks a different trail every Sunday, and one meets over coffee on Saturday mornings. You do not need to have
            read anything, know anyone, or have an answer ready. Turning up is the whole requirement.
          </p>
        </div>

        <div>
          <GroupsWeek />
        </div>
      </div>
    </section>
  );
}
