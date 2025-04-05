import { Router } from 'express';
import { memoryService } from './service';
import { MemoryCreateInput, MemoryUpdateInput, MemoryQueryParams } from './types';

const router = Router();

// Create a new memory
router.post('/', async (req, res) => {
  try {
    const input: MemoryCreateInput = req.body;
    const memory = await memoryService.createMemory(input);
    res.status(201).json(memory);
  } catch (error) {
    res.status(400).json({ message: 'Invalid memory data' });
  }
});

// Get a specific memory
router.get('/:id', async (req, res) => {
  const memory = await memoryService.getMemory(req.params.id);
  if (!memory) {
    res.status(404).json({ message: 'Memory not found' });
    return;
  }
  res.json(memory);
});

// Update a memory
router.put('/:id', async (req, res) => {
  try {
    const input: MemoryUpdateInput = req.body;
    const memory = await memoryService.updateMemory(req.params.id, input);
    if (!memory) {
      res.status(404).json({ message: 'Memory not found' });
      return;
    }
    res.json(memory);
  } catch (error) {
    res.status(400).json({ message: 'Invalid memory data' });
  }
});

// Delete a memory
router.delete('/:id', async (req, res) => {
  const success = await memoryService.deleteMemory(req.params.id);
  if (!success) {
    res.status(404).json({ message: 'Memory not found' });
    return;
  }
  res.status(204).send();
});

// Query memories
router.get('/', async (req, res) => {
  try {
    const params: MemoryQueryParams = {
      searchTerm: req.query.searchTerm as string,
      tags: req.query.tags ? (req.query.tags as string).split(',') : undefined,
      importance: req.query.importance ? parseInt(req.query.importance as string) : undefined,
      startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
      endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
      offset: req.query.offset ? parseInt(req.query.offset as string) : undefined,
    };

    const memories = await memoryService.queryMemories(params);
    res.json(memories);
  } catch (error) {
    res.status(400).json({ message: 'Invalid query parameters' });
  }
});

// Get associated memories
router.get('/:id/associated', async (req, res) => {
  const memories = await memoryService.getAssociatedMemories(req.params.id);
  res.json(memories);
});

export const memoryRoutes = router;