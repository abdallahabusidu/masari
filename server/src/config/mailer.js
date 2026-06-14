import nodemailer from "nodemailer";
import { env } from "./env.js";
import { logger } from "./logger.js";

let transport = null;

// Lazily create the SMTP transport. If SMTP isn't configured, fall back to a
// JSON transport that logs instead of sending (so dev/CI never breaks).
function getTransport() {
  if (transport) return transport;
  if (env.smtp.host && env.smtp.user) {
    transport = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.port === 465,
      auth: { user: env.smtp.user, pass: env.smtp.pass },
    });
  } else {
    transport = nodemailer.createTransport({ jsonTransport: true });
  }
  return transport;
}

export async function sendMail({ to, subject, text, html }) {
  const info = await getTransport().sendMail({
    from: env.smtp.from,
    to,
    subject,
    text,
    html,
  });
  if (!env.smtp.host) logger.info(`[mail:dev] -> ${to}: ${subject}`);
  return info;
}
