import { Suspense } from "react";
import SignInModal from "../../../../components/Users/Sign-in/SignInModal";

export default function AuthModalPage() {
  return (
    <Suspense fallback={null}>
      <SignInModal />
    </Suspense>
  );
}
