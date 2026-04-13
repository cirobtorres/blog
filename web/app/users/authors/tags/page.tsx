import {
  Fieldset,
  FieldsetError,
  FieldsetInput,
  FieldsetLabel,
} from "../../../../components/Fieldset";

export default async function TagsPage() {
  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col gap-2 p-2">
      <h1 className="text-3xl font-extrabold my-6">Tags</h1>
      <Fieldset>
        <FieldsetInput />
        <FieldsetLabel label="Tag" />
      </Fieldset>
      <FieldsetError />
    </section>
  );
}
