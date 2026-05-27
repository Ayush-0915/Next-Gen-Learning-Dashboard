-- Migration: Create lessons table
-- Run this in Supabase SQL Editor (or via the Supabase CLI) to create the lessons table

create table if not exists public.lessons (
  id uuid default gen_random_uuid() primary key,
  course_id uuid references public.courses(id) on delete cascade,
  title text not null,
  completed boolean default false not null,
  position int default 1 not null,
  created_at timestamptz default now()
);
