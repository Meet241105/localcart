import nodemailer from 'nodemailer';
import { generatePaymentReceiptPdfBuffer } from './receiptPdfService.js';

const getTransporter = () => {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const buildReceiptHtml = ({ order, customerName }) => {
  const itemsHtml = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px;border:1px solid #e5e7eb;">${item.name}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;text-align:center;">${item.quantity}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;text-align:right;">INR ${item.price}</td>
        </tr>
      `
    )
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111827;max-width:680px;margin:0 auto;">
      <div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:10px;padding:14px 16px;margin-bottom:14px;">
        <h2 style="color:#059669;margin:0 0 4px;">Payment Received - LocalKart</h2>
        <p style="margin:0;color:#065f46;font-size:13px;">Your payment is confirmed and receipt is attached as PDF.</p>
      </div>
      <p>Hi ${customerName || 'Customer'},</p>
      <p>Your payment was successful and your order is confirmed.</p>

      <div style="margin:16px 0;padding:12px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">
        <p style="margin:4px 0;"><strong>Order ID:</strong> ${order._id}</p>
        <p style="margin:4px 0;"><strong>Payment ID:</strong> ${order.paymentDetails?.razorpayPaymentId || '-'}</p>
        <p style="margin:4px 0;"><strong>Status:</strong> ${order.paymentStatus}</p>
        <p style="margin:4px 0;"><strong>Total Paid:</strong> INR ${order.total}</p>
      </div>

      <h3 style="margin-bottom:8px;">Items</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <thead>
          <tr>
            <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;background:#f3f4f6;">Product</th>
            <th style="padding:8px;border:1px solid #e5e7eb;text-align:center;background:#f3f4f6;">Qty</th>
            <th style="padding:8px;border:1px solid #e5e7eb;text-align:right;background:#f3f4f6;">Price</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>

      <p style="margin:4px 0;"><strong>Shipping Address:</strong> ${order.shippingInfo.address}, ${order.shippingInfo.city} - ${order.shippingInfo.postalCode}</p>
      <p style="margin-top:16px;">Thank you for shopping with LocalKart.</p>
    </div>
  `;
};

export const sendPaymentReceipt = async ({ to, order, customerName }) => {
  const transporter = getTransporter();

  if (!transporter) {
    console.warn('Email not sent: SMTP is not configured.');
    return { sent: false, reason: 'smtp_not_configured' };
  }

  const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;
  const pdfBuffer = await generatePaymentReceiptPdfBuffer(order);

  await transporter.sendMail({
    from: `LocalKart <${fromEmail}>`,
    to,
    subject: `Payment Receipt - Order ${order._id}`,
    html: buildReceiptHtml({ order, customerName }),
    attachments: [
      {
        filename: `receipt-${order._id}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  });

  return { sent: true };
};
