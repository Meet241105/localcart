import PDFDocument from 'pdfkit';

const formatCurrency = (value) => `INR ${Number(value || 0).toFixed(2)}`;
const safe = (v) => (v === undefined || v === null ? '-' : String(v));

export const generatePaymentReceiptPdfBuffer = async (order) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 40, size: 'A4' });
            const chunks = [];

            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', reject);

            const left = 40;
            const width = 515;

            doc.rect(left, 40, width, 96).fill('#065f46');
            doc.roundedRect(left + 16, 58, 58, 58, 10).fill('#10b981');
            doc.fillColor('#ecfdf5').fontSize(26).text('L', left + 36, 72);
            doc.fillColor('#ecfdf5').fontSize(24).text('LocalKart', left + 90, 64);
            doc.fillColor('#a7f3d0').fontSize(12).text('Official Payment Receipt', left + 90, 94);

            doc.fillColor('#d1fae5').fontSize(10).text(`Date: ${new Date().toLocaleString()}`, left + 330, 64, {
                width: 170,
                align: 'right',
            });
            doc.text(`Order ID: ${safe(order._id)}`, left + 330, 80, { width: 170, align: 'right' });

            const badgeLabel = String(order.paymentStatus || 'created').toUpperCase();
            const badgeColor = badgeLabel === 'PAID' ? '#10b981' : badgeLabel === 'FAILED' ? '#ef4444' : '#f59e0b';
            doc.roundedRect(left + 420, 100, 80, 20, 10).fill(badgeColor);
            doc.fillColor('#ffffff').fontSize(9).text(badgeLabel, left + 420, 106, { width: 80, align: 'center' });

            doc.roundedRect(left, 150, 350, 102, 10).fill('#f8fafc');
            doc.fillColor('#111827').fontSize(12).text('Customer Details', left + 14, 164);
            doc.fontSize(10).fillColor('#374151');
            doc.text(`Name: ${safe(order.shippingInfo?.name)}`, left + 14, 186);
            doc.text(`Email: ${safe(order.userEmail)}`, left + 14, 202);
            doc.text(
                `Address: ${safe(order.shippingInfo?.address)}, ${safe(order.shippingInfo?.city)} - ${safe(order.shippingInfo?.postalCode)}`,
                left + 14,
                218,
                { width: 322 }
            );

            doc.roundedRect(left + 368, 150, 147, 102, 10).fill('#ecfdf5');
            doc.fillColor('#065f46').fontSize(11).text('Payment Summary', left + 382, 164);
            doc.fontSize(10).fillColor('#065f46');
            doc.text(`Subtotal`, left + 382, 188, { width: 65 });
            doc.text(formatCurrency(order.subtotal), left + 442, 188, { width: 62, align: 'right' });
            doc.text(`Shipping`, left + 382, 204, { width: 65 });
            doc.text(formatCurrency(order.shipping), left + 442, 204, { width: 62, align: 'right' });
            doc.moveTo(left + 382, 222).lineTo(left + 504, 222).strokeColor('#a7f3d0').stroke();
            doc.fontSize(11).fillColor('#047857').text(`Total Paid`, left + 382, 230, { width: 65 });
            doc.text(formatCurrency(order.total), left + 442, 230, { width: 62, align: 'right' });

            let y = 275;
            doc.fontSize(13).fillColor('#111827').text('Items', left, y);
            y += 18;

            doc.roundedRect(left, y, width, 24, 6).fill('#ecfdf5');
            doc.fillColor('#065f46').fontSize(10);
            doc.text('Product', left + 10, y + 8, { width: 280 });
            doc.text('Qty', left + 300, y + 8, { width: 60, align: 'center' });
            doc.text('Unit Price', left + 360, y + 8, { width: 80, align: 'right' });
            doc.text('Line Total', left + 445, y + 8, { width: 60, align: 'right' });

            y += 30;
            order.items.forEach((item, index) => {
                if (y > 730) {
                    doc.addPage();
                    y = 50;
                }

                if (index % 2 === 0) {
                    doc.rect(left, y - 2, width, 20).fill('#f9fafb');
                }

                doc.fillColor('#111827').fontSize(10);
                doc.text(safe(item.name), left + 10, y + 2, { width: 280, ellipsis: true });
                doc.text(safe(item.quantity), left + 300, y + 2, { width: 60, align: 'center' });
                doc.text(formatCurrency(item.price), left + 360, y + 2, { width: 80, align: 'right' });
                doc.text(formatCurrency(Number(item.price || 0) * Number(item.quantity || 0)), left + 445, y + 2, {
                    width: 60,
                    align: 'right',
                });

                y += 20;
            });

            y += 12;
            doc.moveTo(left, y).lineTo(left + width, y).strokeColor('#d1d5db').stroke();

            doc.fillColor('#6b7280').fontSize(9).text(
                `Payment ID: ${safe(order.paymentDetails?.razorpayPaymentId)} | Paid At: ${order.paidAt ? new Date(order.paidAt).toLocaleString() : '-'
                }`,
                left,
                y + 10,
                { width: width, align: 'center' }
            );

            doc.fillColor('#6b7280').fontSize(9).text(
                'Thank you for shopping with LocalKart. Keep this receipt for your records.',
                left,
                y + 26,
                { width: width, align: 'center' }
            );

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};
