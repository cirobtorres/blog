import SignInForm from "@/components/SignInForm";
import {
  FacebookSubmitButton,
  GithubSubmitButton,
  GoogleSubmitButton,
} from "../../components/SignInForm/SubmitButton";

export default function LogInPage() {
  return (
    <div className="w-full max-w-[332px] mx-auto h-full flex items-center">
      <div className="w-full m-4 mb-0 flex flex-col gap-2 justify-center items-center">
        <div className="w-full mx-auto">
          <h1 className="text-base-neutral dark:text-dark-base-neutral text-3xl font-extrabold">
            Entrar
          </h1>
        </div>
        <SignInForm />
        <div className="w-full flex flex-col gap-2 mx-auto">
          <form>
            <GoogleSubmitButton />
          </form>
          <form>
            <FacebookSubmitButton />
          </form>
          <form>
            <GithubSubmitButton />
          </form>
        </div>
      </div>
    </div>
  );
}
