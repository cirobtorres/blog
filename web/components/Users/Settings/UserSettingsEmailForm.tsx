"use client";

import { Button } from "../../Button";
import { Fieldset, FieldsetInput, FieldsetLabel } from "../../Fieldset";

export default function UserSettingsEmailForm({ user }: { user: User | null }) {
  return (
    <form className="flex flex-col gap-2 flex-1 p-4 rounded-lg border bg-stone-900">
      <h2 className="text-neutral-500">Mudança de Email</h2>
      <div className="flex items-center gap-2">
        <Fieldset>
          <FieldsetInput defaultValue={user?.providerEmail} />
          <FieldsetLabel label="Novo Email" />
        </Fieldset>
        <Button className="ml-auto w-full max-w-30 h-9.5">Salvar</Button>
      </div>
    </form>
  );
}
