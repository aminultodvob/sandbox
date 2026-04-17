import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { render } from "@react-email/render";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-content";

type ApplicationEmailProps = {
  applicantName: string;
  trackName: string;
  statusLabel: string;
  summary: string;
};

function ApplicationStatusEmail({
  applicantName,
  trackName,
  statusLabel,
  summary,
}: ApplicationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{summary}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.logoRow}>
            <Text style={styles.brand}>Sandbox Bangladesh</Text>
            <Text style={styles.tagline}>Build → Launch → Scale → Sustain</Text>
          </Section>
          <Heading style={styles.heading}>{statusLabel}</Heading>
          <Text style={styles.text}>Hello {applicantName},</Text>
          <Text style={styles.text}>{summary}</Text>
          <Section style={styles.panel}>
            <Text style={styles.metaLabel}>Selected track</Text>
            <Text style={styles.metaValue}>{trackName}</Text>
          </Section>
          <Button style={styles.button} href={`${siteConfig.domain}/contact`}>
            Contact Sandbox
          </Button>
          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            {siteConfig.email} · {siteConfig.phone}
          </Text>
          <Text style={styles.footer}>{siteConfig.location}</Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f8f2e6",
    fontFamily: "Arial, sans-serif",
    padding: "24px 0",
  },
  container: {
    backgroundColor: "#fffdf9",
    border: "1px solid #ddd1bb",
    borderRadius: "24px",
    margin: "0 auto",
    maxWidth: "560px",
    padding: "32px",
  },
  logoRow: { marginBottom: "24px" },
  brand: {
    color: "#0e4b38",
    fontSize: "24px",
    fontWeight: "700",
    margin: "0",
  },
  tagline: {
    color: "#8e7b55",
    fontSize: "12px",
    letterSpacing: "0.12em",
    margin: "6px 0 0",
    textTransform: "uppercase" as const,
  },
  heading: {
    color: "#143528",
    fontSize: "28px",
    marginBottom: "16px",
  },
  text: {
    color: "#27483b",
    fontSize: "15px",
    lineHeight: "1.7",
  },
  panel: {
    backgroundColor: "#f3ead8",
    borderRadius: "16px",
    margin: "24px 0",
    padding: "18px 20px",
  },
  metaLabel: {
    color: "#8e7b55",
    fontSize: "12px",
    margin: "0 0 8px",
    textTransform: "uppercase" as const,
  },
  metaValue: {
    color: "#143528",
    fontSize: "18px",
    fontWeight: "700",
    margin: "0",
  },
  button: {
    backgroundColor: "#0e4b38",
    borderRadius: "999px",
    color: "#fffdf9",
    display: "inline-block",
    fontSize: "14px",
    fontWeight: "700",
    padding: "14px 22px",
    textDecoration: "none",
  },
  hr: {
    borderColor: "#e5dac5",
    margin: "28px 0",
  },
  footer: {
    color: "#6d634f",
    fontSize: "13px",
    margin: "6px 0",
  },
};

export async function renderApplicationEmail(props: ApplicationEmailProps) {
  return render(<ApplicationStatusEmail {...props} />);
}

export async function sendStatusEmail(params: {
  to: string;
  subject: string;
  applicantName: string;
  trackName: string;
  statusLabel: string;
  summary: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const html = await renderApplicationEmail(params);

  if (!apiKey) {
    return {
      status: "skipped",
      previewHtml: html,
    };
  }

  const resend = new Resend(apiKey);

  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "Sandbox Bangladesh <noreply@sandbox.bd>",
    to: params.to,
    subject: params.subject,
    html,
  });
}
