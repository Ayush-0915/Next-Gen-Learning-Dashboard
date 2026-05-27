insert into public.courses (title, progress, icon_name)
values
  ('Advanced React Patterns', 75, 'atom'),
  ('Full Stack TypeScript', 60, 'code-2'),
  ('AI Fundamentals', 40, 'brain-circuit'),
  ('Motion Design Systems', 90, 'sparkles')
on conflict do nothing;