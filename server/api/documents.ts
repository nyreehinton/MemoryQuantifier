
import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';

export const documents = [
  {
    id: 'resume-nyree-hinton',
    title: 'Extended Resume - Nyree Hinton',
    path: 'attached_assets/Extended Resume Nyree Hinton.docx',
    type: 'docx',
    date: '2024-01-15'
  },
  {
    id: 'profile-pdf',
    title: 'Nyree Hinton Profile',
    path: 'attached_assets/Nyree Hinton Ext.pdf',
    type: 'pdf',
    date: '2024-02-10'
  }
];

// Function to extract text from Word documents
export async function extractDocxContent(docPath: string): Promise<string> {
  try {
    const result = await mammoth.extractRawText({
      path: path.resolve(docPath)
    });
    return result.value;
  } catch (error) {
    console.error('Error extracting content from Word document:', error);
    return 'Error: Could not extract content from document';
  }
}

// Function to check if file exists
export function checkFileExists(filePath: string): boolean {
  return fs.existsSync(path.resolve(filePath));
}
