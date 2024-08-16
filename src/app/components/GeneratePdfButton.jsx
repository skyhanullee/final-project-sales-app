'use client';

import React from 'react';

export default function GeneratePdfButton({ title, content }) {
  const handleGeneratePdf = async () => {
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'generated.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        const errorData = await response.json();
        console.error(`Failed to generate PDF: ${errorData.error}`);
      }
    } catch (error) {
      console.error(`Failed to generate PDF: ${error.message}`);
    }
  };

  return (
    <button onClick={handleGeneratePdf} className="btn flex justify-center items-center mx-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
      Generate PDF
    </button>
  );
}