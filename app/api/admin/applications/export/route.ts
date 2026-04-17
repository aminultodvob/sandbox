import { NextResponse } from "next/server";
import { getApplicationRows } from "@/lib/dashboard";

export async function GET() {
  const applications = await getApplicationRows();
  const rows = [
    ["Reference", "Founder", "Email", "Business", "City", "Track", "Status", "Submitted"],
    ...applications.map((item) => [
      item.referenceNumber,
      item.applicant.fullName,
      item.applicant.email,
      item.applicant.businessName,
      item.applicant.city,
      item.trackName,
      item.status,
      item.submittedAt,
    ]),
  ];

  const csv = rows
    .map((row) =>
      row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","),
    )
    .join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="sandbox-applications.csv"',
    },
  });
}
