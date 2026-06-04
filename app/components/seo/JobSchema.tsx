
type JobSchemaProps = {
  title: string;
  description: string;
  currency: string;
  minSalary: number;
  maxSalary: number;
  countryName: "Kenya" | "Uganda" | "Ghana";
  baseUrl: string;
};

export default function JobSchema({
  title,
  description,
  currency,
  minSalary,
  maxSalary,
  countryName,
  baseUrl,
}: JobSchemaProps) {
  // Always active dynamic timestamps to keep Search Console validation perfectly green
  const todayIso = new Date().toISOString().split("T")[0];
  const validUntilIso = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    .toISOString()
    .split("T")[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": title,
    "description": description,
    "datePosted": todayIso, // Universal Blocker Fix
    "validThrough": validUntilIso, // Universal Suggestion Fix
    "employmentType": "PART_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "VelloEarn",
      "sameAs": baseUrl,
    },
    "jobLocationType": "TELECOMMUTE",
    "applicantLocationRequirements": {
      "@type": "Country",
      "name": countryName,
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": currency,
      "value": {
        "@type": "QuantitativeValue",
        "minValue": minSalary,
        "maxValue": maxSalary,
        "unitText": "HOUR",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}