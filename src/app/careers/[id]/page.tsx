import { notFound } from "next/navigation";
import { getJobByDocumentId } from "../getJobs";
import JobApplicationForm from "@/components/careers/jobApplicationForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const job = await getJobByDocumentId(id);
  if (!job) notFound();

  return (
    <main className="px-4 py-8 bg-[#1b559b]">
      <h1 className="sr-only">Apply for the {job.title} position</h1>
      <JobApplicationForm jobTitle={job.title} location={job.location} description={job.description} type={job.type} fullDescription={job.fullDescription}/>
    </main>
  );
}

