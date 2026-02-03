import { faker } from "@faker-js/faker";

export default function Body() {
  return (
    <main className="flex px-6 my-8">
      <div className="w-full max-w-360 mx-auto flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl text-zinc-300 font-semibold">
            {faker.lorem.words(5)}
          </h1>
        </div>
        <p className="text-zinc-300">{faker.lorem.paragraph(30)}</p>
      </div>
    </main>
  );
}
