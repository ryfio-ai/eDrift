import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // A very basic markdown to HTML converter for specific use cases in this project
  const parseMarkdown = (text: string) => {
    let html = text;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-slate-900 mt-12 mb-6">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-slate-900 mt-16 mb-8">$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');

    // Tables
    const lines = html.split('\n');
    let inTable = false;
    let tableHtml = '';
    const processedLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('|') && line.endsWith('|')) {
        if (!inTable) {
          inTable = true;
          tableHtml = '<div class="overflow-x-auto my-8 border border-slate-100 rounded-xl"><table class="w-full border-collapse text-left text-sm">';
        }
        
        const cells = line.split('|').filter(c => c.trim().length > 0 || line.indexOf('|' + c + '|') !== -1).map(c => c.trim());
        
        // Check if it's a separator line
        if (line.includes('---')) {
            continue;
        }

        const isHeader = !tableHtml.includes('<tbody>') && !line.includes('---');
        
        if (isHeader && !tableHtml.includes('<thead>')) {
            tableHtml += '<thead class="bg-slate-50"><tr>';
            cells.forEach(cell => {
                tableHtml += `<th class="p-4 font-bold uppercase tracking-widest text-[10px] text-slate-500">${cell}</th>`;
            });
            tableHtml += '</tr></thead><tbody>';
        } else {
            tableHtml += '<tr class="border-t border-slate-100">';
            cells.forEach(cell => {
                tableHtml += `<td class="p-4 text-slate-600 font-medium">${cell}</td>`;
            });
            tableHtml += '</tr>';
        }
      } else {
        if (inTable) {
          inTable = false;
          tableHtml += '</tbody></table></div>';
          processedLines.push(tableHtml);
          tableHtml = '';
        }
        processedLines.push(line);
      }
    }
    if (inTable) {
        tableHtml += '</tbody></table></div>';
        processedLines.push(tableHtml);
    }

    html = processedLines.join('\n');

    // Lists
    html = html.replace(/^\s*-\s+(.*$)/gim, '<li class="ml-6 list-disc mb-2">$1</li>');
    html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li class="ml-6 list-decimal mb-2">$1</li>');

    // Newlines to BR (only if not already in HTML tags)
    // This is tricky, so we'll just handle double newlines as paragraphs
    html = html.split('\n\n').map(p => {
        if (p.trim().startsWith('<h') || p.trim().startsWith('<div') || p.trim().startsWith('<li')) {
            return p;
        }
        return `<p class="mb-6 leading-relaxed">${p}</p>`;
    }).join('\n');

    return html;
  };

  return (
    <div 
      className="prose prose-slate prose-lg max-w-none mb-32"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  );
};

export default MarkdownRenderer;
