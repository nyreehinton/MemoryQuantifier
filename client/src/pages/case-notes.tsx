import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search, Tag, User } from 'lucide-react';

const CaseNotes = () => {
  const [selectedTag, setSelectedTag] = useState('all');

  const notes = [
    {
      id: 1,
      title: 'Mediation Summary & Next Steps',
      content: 'Mediation with Capital One failed. Offer deemed nuisance value. Need to prepare for trial and find successor counsel urgently.',
      author: 'Todd M. Friedman',
      date: 'Apr 3, 2025',
      tags: ['mediation', 'urgent'],
    },
    {
      id: 2,
      title: 'Evidence Collection Status',
      content: 'Critical need for credit reports used by creditors (PREQ-01). Currently missing baseline reports from Experian and TransUnion.',
      author: 'Meghan George',
      date: 'Mar 15, 2025',
      tags: ['evidence', 'follow-up'],
    },
    // More notes can be added here
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
          {notes.map((note) => (
            <div key={note.id} className="bg-card rounded-lg border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium">{note.title}</h3>
                  <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{note.author}</span>
                    <span>•</span>
                    <span>{note.date}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {note.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm">{note.content}</p>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  Edit Note
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CaseNotes;