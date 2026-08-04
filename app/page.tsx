import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/medications"); // or whichever dashboard page should be the landing page
}