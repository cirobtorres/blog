import Image from "next/image";
import { Button } from "../../../components/Button";
import {
  Fieldset,
  FieldsetInput,
  FieldsetLabel,
} from "../../../components/Fieldset";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import UserSettingsPassForm from "../../../components/Users/Settings/UserSettingsPassForm";
import { Alert } from "../../../components/Alert";
import UserSettingsEmailForm from "../../../components/Users/Settings/UserSettingsEmailForm";
import getUser from "../../../services/auth/session/server/getUser";

export default async function UserSettingsPage() {
  const userData = await getUser();

  const { data: user } = userData;

  const isEmailUnverified = !user?.isProviderEmailVerified;

  return (
    <div
      className="min-h-screen grid grid-rows-[1fr_var(--height-footer)]" // grid-rows-[var(--height-header)_1fr_var(--height-footer)]
    >
      <Header className="fixed" />
      <main className="mt-height-header px-4">
        <div className="w-full max-w-140 h-full flex flex-col gap-2 py-10 mx-auto">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Placeholder</h1>
          </div>
          {isEmailUnverified && (
            <Alert title="Autenticação de email necessária" variant="warn">
              Você ainda não validou este email:{" "}
              <strong className="text-yellow-500">{user?.providerEmail}</strong>
            </Alert>
          )}
          <div className="grid grid-cols-1 gap-2">
            <UserCard user={user} isEmailUnverified={isEmailUnverified} />
            <div className="grid grid-cols-1 gap-2">
              <form className="flex flex-col gap-2 flex-1 p-4 rounded-lg border bg-stone-900">
                <h2 className="text-neutral-500">Profile</h2>
                <div className="flex items-center gap-2">
                  <Fieldset>
                    <FieldsetInput defaultValue={user?.name} />
                    <FieldsetLabel label="Nome" />
                  </Fieldset>
                  <Button className="ml-auto w-full max-w-30 h-9.5">
                    Salvar
                  </Button>
                </div>
              </form>
              <UserSettingsEmailForm user={user} />
              <UserSettingsPassForm />
              <form className="flex flex-col gap-2 flex-1 p-4 rounded-lg border bg-stone-900">
                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    className="ml-auto w-full max-w-30 h-9.5"
                  >
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const UserCard = ({
  user,
  isEmailUnverified,
}: { user: User | null } & { isEmailUnverified?: boolean }) => (
  <div className="w-full flex items-center border rounded-lg p-4 gap-4 bg-stone-900">
    <Image
      src={user?.pictureUrl ?? "https://placehold.co/160x160/000/fff/jpeg"}
      alt={"Avatar " + !!user ? "de " + user?.name : "anônimo"}
      width={160}
      height={160}
      className="rounded-full"
    />
    <div className="flex flex-col gap-2">
      <p className="text-xs font-bold text-neutral-500">
        Nome: <span className="text-neutral-300">{user?.name}</span>
      </p>
      <div className="text-xs font-bold text-neutral-500">
        <span className="relative">
          Email
          {isEmailUnverified && (
            <div className="absolute size-2 -top-1 -left-2 rounded-full animate-pulse-yellow bg-yellow-500" />
          )}
        </span>
        : <strong className="text-neutral-300">{user?.providerEmail} </strong>
      </div>
      {user && (
        <div className="flex items-center gap-1">
          {user.authorities.map((authority) => (
            <p
              key={authority}
              className="w-fit text-xs text-neutral-500 font-bold uppercase rounded px-1 py-0.5 bg-stone-800"
            >
              {authority}
            </p>
          ))}
        </div>
      )}
    </div>
  </div>
);
