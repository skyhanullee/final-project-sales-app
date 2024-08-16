import { jsPDF } from 'jspdf';

export async function POST(req) {
  try {
    const { title, content } = await req.json();

    if (!title) {
      return new Response(JSON.stringify({ error: 'Missing rtitle' }), { status: 400 });
    }
    else if (!content) {
      return new Response(JSON.stringify({ error: 'Missing content' }), { status: 400 });
    };

    // create new PDF document
    const doc = new jsPDF();

    // add title and content to the PDF
    doc.setFontSize(20);
    doc.text(title, 10, 10);
    
    doc.setFontSize(12);
    doc.text(content, 10, 20);

    // generate PDF as a blob
    const pdfBlob = doc.output('blob');

    // convert the blob to a buffer
    const buffer = Buffer.from(await pdfBlob.arrayBuffer());

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="generated.pdf"',
      },
    });
  } 
  catch (error) {
    console.error('Error generating PDF:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), { status: 500 });
  }
}
