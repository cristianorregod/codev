import { notFound } from "next/navigation";

// Any unknown path under a locale renders the styled 404 with a real 404 status.
export default function CatchAllPage() {
  notFound();
}
