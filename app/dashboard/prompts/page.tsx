'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PromptList } from '@/components/prompts/prompt-list';
import { CreatePromptDialog } from '@/components/prompts/create-prompt-dialog';

export default function PromptsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Prompts</h2>
          <p className="text-muted-foreground">
            Create and manage your custom prompts
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Prompt
        </Button>
      </div>
      <PromptList />
      <CreatePromptDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}