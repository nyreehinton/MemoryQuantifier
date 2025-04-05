export interface Memory {
  id: string;
  title: string;
  description: string;
  importance: number;
  timestamp: Date;
  tags: string[];
  context?: string;
  associatedMemories?: string[]; // IDs of related memories
}

export interface MemoryCreateInput {
  title: string;
  description: string;
  importance?: number;
  tags?: string[];
  context?: string;
  associatedMemories?: string[];
}

export interface MemoryUpdateInput {
  title?: string;
  description?: string;
  importance?: number;
  tags?: string[];
  context?: string;
  associatedMemories?: string[];
}

export interface MemoryQueryParams {
  searchTerm?: string;
  tags?: string[];
  importance?: number;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}