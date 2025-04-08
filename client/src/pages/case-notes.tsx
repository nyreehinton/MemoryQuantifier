import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search, Tag, User } from 'lucide-react';

const CaseNotes = () => {
  const [selectedTag, setSelectedTag] = useState('all');

  const notes = [
    // Case notes have been removed as requested
  ];

  const tags = ['all', 'urgent', 'evidence', 'mediation', 'follow-up', 'settlement'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Case Notes</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Attorney observations and case documentation
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  className="pl-10 pr-4 py-2 border rounded-md bg-background w-64"
                />
              </div>
              <Button variant="default" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Note
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center space-x-2 mt-4">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-2">
              {tags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-card rounded-lg border p-6 text-center">
            <p className="text-muted-foreground">No case notes available.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CaseNotes;