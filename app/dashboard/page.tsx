'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BookMarked } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

export default function DashboardPage() {
  const { user } = useUser();
  const [promptCount, setPromptCount] = useState(0);
  const [templateCount, setTemplateCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [promptsRes, templatesRes] = await Promise.all([
          fetch('/api/prompts'),
          fetch('/api/templates')
        ]);
        
        const prompts = await promptsRes.json();
        const templates = await templatesRes.json();
        
        setPromptCount(prompts.length);
        setTemplateCount(templates.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.firstName}!
        </h2>
        <p className="text-muted-foreground">
          Here's an overview of your prompt management
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prompts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{promptCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Templates
            </CardTitle>
            <BookMarked className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templateCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}