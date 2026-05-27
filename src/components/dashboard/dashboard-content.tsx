import { getDashboardData } from '@/lib/dashboard-data';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';

export async function DashboardContent() {
  const data = await getDashboardData();

  return <DashboardShell data={data} />;
}