// app/ourTeam/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { getPersonByDocumentId } from "../getTeam"; // should return Promise<TeamMember | null/undefined>
import BackButton from "@/components/subcomponents/BackButton";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const person = await getPersonByDocumentId(id); // ensure this is async and returns the minimal fields

  if (!person) {
    notFound();
  }

  return (
    <main className="mt-20 mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8">
        <BackButton></BackButton>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {person.name}
        </h1>
        <p className="text-slate-600">{person.role}</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl border border-slate-200 shadow-sm">
          {person.headshotUrl && (
            <Image
              src={person.headshotUrl}
              alt={`${person.name} headshot`}
              fill
              className="object-cover"
              sizes="(min-width:768px) 33vw, 100vw"
              priority
            />
          )}
        </div>

        <article className="md:col-span-2 prose prose-slate max-w-none text-justify ml-10">
          <p>
            {person.bio}
          </p>
        </article>
      </section>
    </main>
  );
}
