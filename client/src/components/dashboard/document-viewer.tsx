
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

interface DocumentViewerProps {
  documentId: string;
  title?: string;
}

export default function DocumentViewer({ documentId, title }: DocumentViewerProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocumentContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/documents/${documentId}/content`);
        
        if (!response.ok) {
          throw new Error('Failed to load document content');
        }
        
        const data = await response.json();
        setContent(data.content);
        setError(null);
      } catch (err) {
        setError('Could not load document content. The file may be in an unsupported format.');
        console.error('Error fetching document content:', err);
      } finally {
        setLoading(false);
      }
    };

    if (documentId) {
      fetchDocumentContent();
    }
  }, [documentId]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">
          <FileText className="h-5 w-5 mr-2 inline-block text-blue-600" />
          {title || 'Document Content'}
        </CardTitle>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download Original
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse text-muted-foreground">Loading document content...</div>
          </div>
        ) : error ? (
          <div className="py-4 text-red-500">{error}</div>
        ) : (
          <div className="whitespace-pre-line p-4 bg-slate-50 dark:bg-slate-900 rounded-md max-h-[500px] overflow-y-auto">
            {content}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
