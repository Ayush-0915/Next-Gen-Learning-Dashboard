export interface CourseRow {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
  description?: string | null;
}

export interface CourseCardModel {
  id: string;
  title: string;
  progress: number;
  iconName: string;
  createdAt: string;
  description?: string | null;
  lessonsCompleted?: number;
  lessonsTotal?: number;
}

export interface ActivityCell {
  id: string;
  value: number;
  label: string;
  month: string;
}

export interface DashboardData {
  userName: string;
  streak: number;
  courses: CourseCardModel[];
  activity: ActivityCell[];
  communityCount?: number;
  achievementsCount?: number;
}

export interface SidebarItemModel {
  label: string;
  icon: string;
  active?: boolean;
}