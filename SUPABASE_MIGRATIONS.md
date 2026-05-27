Steps to create the `lessons` table in Supabase and re-run the seed

1. Open your Supabase project and go to the SQL Editor.

2. Create a new query and paste the contents of `migrations/001_create_lessons_table.sql`.

3. Run the query. You should see a success message indicating the table was created.

4. Re-run the local seed script (example PowerShell):

```powershell
$env:NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
$env:NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
node ./scripts/seed.mjs
```

Notes:

- If you use the Supabase CLI or a migration workflow, add `migrations/001_create_lessons_table.sql` to your migration set.
- After the table exists, the seed script will insert three lessons per course.
