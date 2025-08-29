// 3. Define the return type
export type Faq = {
  question: string;
  answer: string;
};

const STRAPI_URL = "https://committed-paradise-9b1cb948f5.strapiapp.com/api";

function mapToFAQ(item: any): Faq {
  return {
    question: item.Question,
    answer: item.Answer,
  };
}

export async function getQuestions(): Promise<Faq[]> {
  const res = await fetch(`${STRAPI_URL}/faqs`, {
    cache: "no-store", // or { next: { revalidate: 60 } } if you want ISR
  });
  if (!res.ok) throw new Error("Failed to fetch executives");
  const json = await res.json();
  return json.data.map(mapToFAQ);
}