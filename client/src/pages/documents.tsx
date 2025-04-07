import { Button } from '@/components/ui/button';
import { FileText, Filter, FolderOpen, Grid, List, Plus, Search, Upload } from 'lucide-react';
import { useState } from 'react';

const Documents = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documents = [
    {
      id: 1,
      name: 'Withdrawal Notice',
      type: 'legal',
      date: 'Apr 3, 2025',
      size: '245 KB',
      category: 'Legal Filings',
      status: 'urgent',
    },
    {
      id: 2,
      name: 'Mediation Summary',
      type: 'legal',
      date: 'Apr 3, 2025',
      size: '1.2 MB',
      category: 'Legal Filings',
      status: 'review',
    },
    {
      id: 3,
      name: 'Bank of America Credit Limit Reduction',
      type: 'evidence',
      date: 'Mar 7, 2024',
      size: '156 KB',
      category: 'Evidence',
      status: 'verified',
    },
    // More documents can be added here
  ];

  const categories = [
    'all',
    'Legal Filings',
    'Evidence',
    'Credit Reports',
    'Correspondence',
    'Settlements',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Document Repository</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Case documents, evidence, and legal filings
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="pl-10 pr-4 py-2 border rounded-md bg-background w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <Button variant="default" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Folder
              </Button>
            </div>
          </div>

          {/* Categories & View Toggle */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-card rounded-lg border p-3 sm:p-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-muted rounded-lg p-2 sm:p-3">
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">{doc.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {doc.category} • {doc.date}
                    </p>
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{doc.size}</span>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-lg border">
            <table className="min-w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Size
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-4 w-4" />
                        <span>{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{doc.category}</td>
                    <td className="px-4 py-3 text-sm">{doc.date}</td>
                    <td className="px-4 py-3 text-sm">{doc.size}</td>
                    <td className="px-4 py-3 text-sm">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Documents;
