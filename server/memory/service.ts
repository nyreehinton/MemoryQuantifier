import { v4 as uuidv4 } from 'uuid';
import { Memory, MemoryCreateInput, MemoryUpdateInput, MemoryQueryParams } from './types';

class MemoryService {
  private memories: Map<string, Memory>;

  constructor() {
    this.memories = new Map();
  }

  async createMemory(input: MemoryCreateInput): Promise<Memory> {
    const id = uuidv4();
    const memory: Memory = {
      id,
      title: input.title,
      description: input.description,
      importance: input.importance || 1,
      timestamp: new Date(),
      tags: input.tags || [],
      context: input.context,
      associatedMemories: input.associatedMemories || []
    };

    this.memories.set(id, memory);
    return memory;
  }

  async getMemory(id: string): Promise<Memory | null> {
    const memory = this.memories.get(id);
    return memory || null;
  }

  async updateMemory(id: string, input: MemoryUpdateInput): Promise<Memory | null> {
    const existingMemory = this.memories.get(id);
    if (!existingMemory) return null;

    const updatedMemory: Memory = {
      ...existingMemory,
      ...input,
      timestamp: existingMemory.timestamp // Preserve original timestamp
    };

    this.memories.set(id, updatedMemory);
    return updatedMemory;
  }

  async deleteMemory(id: string): Promise<boolean> {
    return this.memories.delete(id);
  }

  async queryMemories(params: MemoryQueryParams): Promise<Memory[]> {
    let results = Array.from(this.memories.values());

    if (params.searchTerm) {
      const searchLower = params.searchTerm.toLowerCase();
      results = results.filter(memory => 
        memory.title.toLowerCase().includes(searchLower) ||
        memory.description.toLowerCase().includes(searchLower)
      );
    }

    if (params.tags && params.tags.length > 0) {
      results = results.filter(memory =>
        params.tags!.some(tag => memory.tags.includes(tag))
      );
    }

    if (params.importance !== undefined) {
      results = results.filter(memory => memory.importance >= params.importance!);
    }

    if (params.startDate) {
      results = results.filter(memory => memory.timestamp >= params.startDate!);
    }

    if (params.endDate) {
      results = results.filter(memory => memory.timestamp <= params.endDate!);
    }

    // Sort by importance and timestamp
    results.sort((a, b) => {
      if (a.importance !== b.importance) {
        return b.importance - a.importance;
      }
      return b.timestamp.getTime() - a.timestamp.getTime();
    });

    // Apply pagination
    if (params.offset !== undefined || params.limit !== undefined) {
      const offset = params.offset || 0;
      const limit = params.limit || 10;
      results = results.slice(offset, offset + limit);
    }

    return results;
  }

  async getAssociatedMemories(id: string): Promise<Memory[]> {
    const memory = this.memories.get(id);
    if (!memory || !memory.associatedMemories) return [];

    return memory.associatedMemories
      .map(associatedId => this.memories.get(associatedId))
      .filter((m): m is Memory => m !== undefined);
  }
}

// Export a singleton instance
export const memoryService = new MemoryService();