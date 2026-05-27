-- Migration: add description column to courses
-- Run this in Supabase SQL Editor

alter table if exists public.courses
add column if not exists description text default '';
