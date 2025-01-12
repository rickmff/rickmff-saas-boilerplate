import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { title, description, tags } = body;

    const prompt = await prisma.prompt.create({
      data: {
        title,
        description,
        tags,
        userId
      }
    });

    return NextResponse.json(prompt);
  } catch (error) {
    console.error('[PROMPTS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const prompts = await prisma.prompt.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(prompts);
  } catch (error) {
    console.error('[PROMPTS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}