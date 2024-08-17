"use server";

import AdminSignInForm from "@/components/AdminSignInForm";
import Body from "../../components/Body";

export default async function AdminPage() {
  return (
    <Body>
      <AdminSignInForm />
    </Body>
  );
}
