"use client";

import React from "react";
import { Button } from "../../Button";
import {
  Fieldset,
  FieldsetError,
  FieldsetInput,
  FieldsetLabel,
} from "../../Fieldset";
import { sonnerPromise, sonnerToastPromise } from "../../../utils/sonner";
import { slugify } from "../../../utils/strings-transforms";
import Spinner from "../../Spinner";
import { useCreateTag, useTags } from "../../../services/hooks/tags/hook-tags";

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

interface TagErrors {
  name?: string[];
}

const MIN_LENGTH = 3;
const MAX_LENGTH = 65;

export default function TagCreate() {
  const { data } = useTags();
  const { mutateAsync } = useCreateTag();
  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [errors, setErrors] = React.useState<TagErrors | null>(null);

  const [state, action, isPending] = React.useActionState(
    async (prevState: ActionState, formData: FormData) => {
      const success = (serverResponse: ActionState) => {
        return <p>{serverResponse?.success || "Tag salva!"}</p>;
      };
      const error = (serverResponse: ActionState) => {
        return <p>{serverResponse?.error || "Ocorreu algum erro"}</p>;
      };

      const result = mutateAsync({ prevState, formData });
      const promise = sonnerPromise(result);
      sonnerToastPromise(promise, success, error, "Salvando tag...");

      return result;
    },
    defaultState,
  );

  const onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const formDataName = formData.get("name")?.toString() ?? "";
    const formDataSlug = formData.get("slug")?.toString() ?? "";
    const errors: TagErrors = {};

    if (formDataName.length < MIN_LENGTH) {
      (errors["name"] ??= []).push("Tag muito pequena");
    }

    if (formDataName.length > MAX_LENGTH) {
      (errors["name"] ??= []).push("Tag grande demais");
    }

    if (data?.content.filter((tag) => tag.slug === formDataSlug)?.[0]) {
      (errors["name"] ??= []).push("Tag já existe");
    }

    if (Object.entries(errors).length > 0) {
      event.preventDefault(); // Interrupct Action
      setErrors(errors);
      return;
    }

    setErrors(null);
  };

  React.useEffect(() => {
    setSlug(slugify(name));
  }, [name]);

  React.useEffect(() => {
    setErrors({ name: state.error });
  }, [state]);

  return (
    <form
      action={action}
      onSubmit={onSubmit} // VALIDATIONS
      className="w-full max-w-md p-4 rounded border bg-stone-850"
    >
      <div className="flex items-center gap-2">
        <input
          hidden
          type="hidden"
          name="slug"
          value={slug}
          className="appearance-none"
        />
        <div className="w-full flex flex-col gap-2">
          <Fieldset>
            <FieldsetInput
              name="name"
              value={name}
              maxLength={MAX_LENGTH}
              onChange={(e) => setName(e.target.value)}
              error={!!errors?.name}
            />
            <FieldsetLabel label="Nome" />
          </Fieldset>
          <div className="flex justify-between items-center">
            <FieldsetError error={errors?.name} className="mb-auto mt-0" />
            <Button
              disabled={isPending}
              className="w-full h-7 max-w-30 mt-0 mb-auto ml-auto mr-0"
            >
              {isPending && <Spinner />}Criar
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
