"use server";

import { TeamMember } from "@/components/ExecutiveCarousel";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function mapToTeamMember(item: any): TeamMember {
  const headshot = item.Headshot;
  const headshotUrl =
    headshot?.formats?.large?.url ||
    headshot?.formats?.medium?.url ||
    headshot?.formats?.small?.url ||
    headshot?.url ||
    null;

  return {
    id: item.documentId,
    name: item.Name,
    role: item.Role,
    bio: item.Bio,
    headshotUrl,
  };
}

export async function getExecs(): Promise<TeamMember[]> {
  const res = await fetch(`${STRAPI_URL}/executives?populate=Headshot`, {
    cache: "no-store", // or { next: { revalidate: 60 } } if you want ISR
  });
  if (!res.ok) throw new Error("Failed to fetch executives");
  const json = await res.json();
  return json.data.map(mapToTeamMember);
}

export async function getTeam(): Promise<TeamMember[]> {
  const res = await fetch(`${STRAPI_URL}/team-members?populate=Headshot`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch board members");
  const json = await res.json();
  return json.data.map(mapToTeamMember);
}

export async function getTeamByDocumentId(documentId: string): Promise<TeamMember | null> {
  const res = await fetch(
    `${STRAPI_URL}/team-members/${documentId}?populate=Headshot`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    if (res.status === 404) return null;
    console.error("Failed to fetch team member:", res.status);
    return null;
  }

  const json = await res.json();

  // Strapi v4: single entry response is in `data`
  if (!json.data) return null;

  return mapToTeamMember(json.data);
}

export async function getExecByDocumentId(documentId: string): Promise<TeamMember | null> {
  const res = await fetch(
    `${STRAPI_URL}/executives/${documentId}?populate=Headshot`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    if (res.status === 404) return null;
    console.error("Failed to fetch executive:", res.status);
    return null;
  }

  const json = await res.json();

  // Strapi v4: single entry response is in `data`
  if (!json.data) return null;

  return mapToTeamMember(json.data);
}

export async function getPersonByDocumentId(id: string): Promise<TeamMember | null> {
  const team = await getTeamByDocumentId(id);
  if (team) return team;

  const exec = await getExecByDocumentId(id);
  if (exec) return exec;

  return null;
}
