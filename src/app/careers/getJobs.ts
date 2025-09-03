import { Job } from "@/components/careers/careers-card";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function mapToJob(item: any): Job {
  

  return {
    id: item.documentId,
    title: item.Title,
    department: item.Department,
    type: item.Type,
    location: item.Location,
    description: item.Description,
    fullDescription: item.FullDescription
    ? (item.FullDescription.url.startsWith("http")
        ? item.FullDescription.url
        : `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.FullDescription.url}`)
    : null,
  };
}

export async function getJobs(): Promise<Job[]> {
  const res = await fetch(`${STRAPI_URL}/jobs`, {
    cache: "no-store", // or { next: { revalidate: 60 } } if you want ISR
  });
  if (!res.ok) throw new Error("Failed to fetch executives");
  const json = await res.json();
  return json.data.map(mapToJob);
}

export async function getJobByDocumentId(documentId: string): Promise<Job> {
  const res = await fetch(
    `${STRAPI_URL}/jobs/${documentId}?populate=FullDescription`,
    { cache: "no-store" }
  );

  const json = await res.json();

  // Strapi v4: single entry response is in `data`


  return mapToJob(json.data);
}