"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Bookmark,
  ChevronDown,
  Code2,
  Flame,
  Heart,
  ListFilter,
  MessageSquare,
  Plus,
  Search,
  Sparkles,
  Users,
  Eye
} from 'lucide-react';
import Button from '@/components/ui/button';
import { CardShell } from '@/components/ui/card-shell';
import styles from './community.module.css';

type FeedTab = 'For You' | 'Following' | 'New' | 'Trending';
type PostKind = 'Question' | 'Article' | 'Discussion';

type FeedPost = {
  id: string;
  author: string;
  role: string;
  avatarColor: string;
  time: string;
  category: string;
  kind: PostKind;
  title: string;
  body: string;
  likes: number;
  replies: number;
  views: string;
  image?: boolean;
  trending?: boolean;
  following?: boolean;
  newPost?: boolean;
};

const feedTabs: FeedTab[] = ['For You', 'Following', 'New', 'Trending'];
const categories = ['All Categories', 'General Discussion', 'Web Development', 'Data Structures', 'System Design', 'Career Advice', 'Study Groups', 'Announcements'];
const tagCloud = ['#reactjs', '#javascript', '#nodejs', '#nextjs', '#python', '#systemdesign', '#typescript', '#webdev'];

const feedPosts: FeedPost[] = [
  {
    id: 'rohit',
    author: 'Rohit Sharma',
    role: 'Top Contributor',
    avatarColor: 'from-amber-400 to-orange-500',
    time: '2 hours ago',
    category: 'React.js',
    kind: 'Question',
    title: 'How to optimize React performance in large applications?',
    body:
      'I am working on a large React application and facing performance issues. What are the best practices and tools you use to optimize performance?'
      ,
    likes: 64,
    replies: 23,
    views: '1.2K',
    trending: true,
    following: true
  },
  {
    id: 'priya',
    author: 'Priya Verma',
    role: 'Instructor',
    avatarColor: 'from-emerald-400 to-teal-500',
    time: '5 hours ago',
    category: 'Node.js',
    kind: 'Article',
    title: 'Understanding Event Loop in Node.js (Explained Simply)',
    body:
      'I have created a simple diagram and explanation to help you understand the event loop better. ✨',
    likes: 128,
    replies: 18,
    views: '2.4K',
    image: true,
    trending: true,
    following: true
  },
  {
    id: 'ankit',
    author: 'Ankit Patel',
    role: 'Student',
    avatarColor: 'from-sky-400 to-blue-500',
    time: '1 day ago',
    category: 'System Design',
    kind: 'Discussion',
    title: 'System Design: Design Instagram from Scratch',
    body: 'Let’s break down Instagram’s system design step by step. Share your thoughts and suggestions!',
    likes: 92,
    replies: 31,
    views: '3.1K',
    trending: true,
    following: false
  },
  {
    id: 'sana',
    author: 'Sana Khan',
    role: 'Mentor',
    avatarColor: 'from-fuchsia-400 to-violet-500',
    time: '3 days ago',
    category: 'Study Groups',
    kind: 'Discussion',
    title: 'Weekly study group for frontend builders',
    body: 'Looking for a focused study group this week? We’ll pair up on component architecture and accessibility.',
    likes: 47,
    replies: 14,
    views: '880',
    following: true,
    newPost: true
  }
];

const topContributors = [
  { name: 'Aditya Raj', handle: '@adityaraj', xp: '2,450 XP', rank: 1, avatarColor: 'from-amber-400 to-orange-500' },
  { name: 'Sneha Sharma', handle: '@sneha_code', xp: '2,120 XP', rank: 2, avatarColor: 'from-rose-400 to-pink-500' },
  { name: 'Karan Dev', handle: '@karandev', xp: '1,980 XP', rank: 3, avatarColor: 'from-cyan-400 to-blue-500' },
  { name: 'Riya Patel', handle: '@riya_patel', xp: '1,420 XP', rank: 4, avatarColor: 'from-emerald-400 to-teal-500' },
  { name: 'Mohit Kumar', handle: '@mohit_kumar', xp: '1,210 XP', rank: 5, avatarColor: 'from-violet-400 to-fuchsia-500' }
];

const events = [
  { month: 'MAY', day: '28', title: 'React Advanced Workshop', time: '7:00 PM IST', type: 'Online', attendees: '356' },
  { month: 'MAY', day: '30', title: 'System Design AMA', time: '8:00 PM IST', type: 'Online', attendees: '412' },
  { month: 'JUN', day: '02', title: 'JavaScript Quiz Night', time: '9:00 PM IST', type: 'Online', attendees: '289' }
];

const onlineMembers = [
  { initials: 'AR', color: 'from-violet-400 to-fuchsia-500' },
  { initials: 'SV', color: 'from-sky-400 to-blue-500' },
  { initials: 'MK', color: 'from-amber-400 to-orange-500' },
  { initials: 'RV', color: 'from-emerald-400 to-teal-500' },
  { initials: 'AP', color: 'from-rose-400 to-pink-500' }
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<FeedTab>('For You');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState(feedPosts);

  const visiblePosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !searchTerm ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;

      const matchesTab =
        activeTab === 'For You'
          ? true
          : activeTab === 'Following'
            ? post.following
            : activeTab === 'New'
              ? post.newPost || post.time.includes('hour') || post.time.includes('minutes')
              : post.trending;

      return matchesSearch && matchesCategory && matchesTab;
    });
  }, [activeTab, posts, searchTerm, selectedCategory]);

  function toggleLike(id: string) {
    setPosts((current) => current.map((post) => (post.id === id ? { ...post, likes: post.likes + 1 } : post)));
  }

  return (
    <main className={`${styles.page} mx-auto w-full max-w-[1240px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6`}>
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Community</h1>
          <p className="mt-1 text-sm text-white/60">Connect, learn and grow together with fellow learners.</p>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3 lg:max-w-[560px]">
          <div className="hidden min-w-0 flex-1 items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/55 shadow-[0_12px_40px_rgba(0,0,0,0.18)] lg:flex">
            <Search className="h-4 w-4 text-white/35" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search community..."
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-white/35"
            />
            <kbd className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] text-white/55">⌘ K</kbd>
          </div>

          <button className="grid h-11 w-11 place-items-center rounded-full border border-white/8 bg-white/[0.03] text-white/70 lg:hidden">
            <Search className="h-4 w-4" />
          </button>

          <button className="relative grid h-11 w-11 place-items-center rounded-full border border-white/8 bg-white/[0.03] text-white/70">
            <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-violet-500 text-[10px] font-semibold text-white">3</span>
            <span className="text-lg">🔔</span>
          </button>

          <div className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-2 py-1.5">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-xs font-semibold text-white">AS</div>
            <ChevronDown className="h-4 w-4 text-white/45" />
          </div>

          <Button variant="primary" className="hidden items-center gap-2 lg:inline-flex">
            <Plus className="h-4 w-4" />
            Create Post
          </Button>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[260px_minmax(0,1fr)_320px]">
        <aside className="space-y-5">
          <CardShell className={`${styles.headerShell} overflow-hidden p-0`}>
            <div className="relative px-4 py-6 sm:px-6">
              <div className={styles.headerGlow} />
              <div className="relative">
                <div className="mb-4 flex items-center gap-3 text-violet-200">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-sm font-medium">Upgrade to Premium</span>
                </div>
                <p className="max-w-[18ch] text-sm leading-6 text-white/70">Unlock exclusive content, connect with experts and grow faster.</p>
                <Button href="/pricing" variant="primary" className="mt-5 inline-flex items-center gap-2">
                  Upgrade Now <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardShell>

          <CardShell className="p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-base font-semibold text-white">AS</div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-white">Ayush Singh</div>
                <div className="truncate text-xs text-white/55">ayush@example.com</div>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/65">
              <div className="flex items-center justify-between">
                <span>Community Rank</span>
                <span className="font-medium text-violet-300">#18</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-white/45">
                <span>246 XP to next level</span>
                <span>Premium Plan</span>
              </div>
            </div>
          </CardShell>
        </aside>

        <section className="space-y-5">
          <CardShell className="overflow-hidden p-0">
            <div className="relative px-4 py-6 sm:px-6 sm:py-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(168,85,247,0.26),transparent_18%),radial-gradient(circle_at_70%_65%,rgba(56,189,248,0.12),transparent_22%)]" />
              <div className="relative flex flex-col gap-5">
                <div>
                  <h2 className="text-xl font-semibold text-white sm:text-2xl">Welcome to the LearnHub Community! 👋</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">Ask questions, share knowledge and help each other grow.</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-violet-500/15 text-violet-300">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xl font-semibold text-white">12.5K+</div>
                        <div className="text-sm text-white/55">Members</div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-fuchsia-500/15 text-fuchsia-300">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xl font-semibold text-white">3.2K+</div>
                        <div className="text-sm text-white/55">Discussions</div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-blue-500/15 text-blue-300">
                        <Code2 className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xl font-semibold text-white">240+</div>
                        <div className="text-sm text-white/55">Study Groups</div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-amber-500/15 text-amber-300">
                        <Flame className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xl font-semibold text-white">98%</div>
                        <div className="text-sm text-white/55">Active Users</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardShell>

          <CardShell className="p-0">
            <div className="flex flex-col gap-3 border-b border-white/8 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                {feedTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-4 py-2 text-sm transition ${activeTab === tab ? 'bg-violet-500/15 text-violet-100 shadow-[0_0_0_1px_rgba(168,85,247,0.2)]' : 'text-white/55 hover:bg-white/[0.03] hover:text-white'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-white/60">
                  <ListFilter className="h-4 w-4" />
                  All Categories
                </button>
                <button className="grid h-10 w-10 place-items-center rounded-2xl border border-white/8 bg-white/[0.03] text-white/55">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.7]">
                    <path d="M4 6h7M4 12h7M4 18h7M14 6h6M14 12h6M14 18h6" strokeLinecap="round" />
                  </svg>
                </button>
                <button className="grid h-10 w-10 place-items-center rounded-2xl border border-violet-400/25 bg-violet-500/15 text-violet-200">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.7]">
                    <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-4 px-4 py-4 sm:px-5">
              {visiblePosts.map((post) => (
                <article key={post.id} className={`${styles.feedCard} rounded-2xl border border-white/8 bg-white/[0.025] p-4 shadow-[0_16px_50px_rgba(0,0,0,0.16)]`}>
                  <div className="flex items-start gap-4">
                    <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${post.avatarColor} text-sm font-semibold text-white`}>
                      {post.author
                        .split(' ')
                        .map((part) => part[0])
                        .join('')
                        .slice(0, 2)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <strong className="text-white">{post.author}</strong>
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${post.role === 'Top Contributor' ? 'bg-violet-500/15 text-violet-200' : post.role === 'Instructor' ? 'bg-emerald-500/15 text-emerald-200' : 'bg-blue-500/15 text-blue-200'}`}>
                          {post.role}
                        </span>
                        <span className="text-white/45">{post.time} · in {post.category}</span>
                      </div>

                      <div className="mt-3 flex items-start justify-between gap-4">
                        <div className="min-w-0 max-w-2xl">
                          <div className="mb-2 flex items-center gap-2">
                            <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${post.kind === 'Question' ? 'bg-violet-500/15 text-violet-200' : post.kind === 'Article' ? 'bg-emerald-500/15 text-emerald-200' : 'bg-blue-500/15 text-blue-200'}`}>
                              {post.kind}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold tracking-tight text-white sm:text-[18px]">{post.title}</h3>
                          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">{post.body}</p>
                        </div>

                        <button className="rounded-full p-2 text-white/45 transition hover:bg-white/[0.04] hover:text-white">
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>

                      {post.image ? (
                        <div className="mt-4 flex justify-end">
                          <div className="h-24 w-32 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.22),transparent_48%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.22),transparent_40%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(30,41,59,0.9))] p-3 shadow-[0_14px_40px_rgba(0,0,0,0.22)]">
                            <div className="flex h-full items-center justify-center rounded-xl border border-white/10 bg-black/20 text-[11px] text-white/60">Event Loop Visual</div>
                          </div>
                        </div>
                      ) : null}

                      <footer className="mt-4 flex flex-wrap items-center gap-5 text-sm text-white/60">
                        <button onClick={() => toggleLike(post.id)} className="inline-flex items-center gap-2 transition hover:text-violet-200">
                          <Heart className="h-4 w-4 text-violet-400" /> {post.likes}
                        </button>
                        <button className="inline-flex items-center gap-2 transition hover:text-white">
                          <MessageSquare className="h-4 w-4" /> {post.replies}
                        </button>
                        <span className="inline-flex items-center gap-2">
                          <Eye className="h-4 w-4" /> {post.views}
                        </span>
                      </footer>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </CardShell>
        </section>

        <aside className="space-y-5">
          <CardShell className={`${styles.sidebarCard} p-4`}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">Top Contributors</h3>
              <Link href="/achievements" className="text-xs text-white/55 transition hover:text-white">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {topContributors.map((person) => (
                <div key={person.name} className="flex items-center justify-between gap-3 rounded-2xl bg-white/[0.025] px-3 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-[11px] font-semibold text-white/80">{person.rank}</div>
                    <div className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${person.avatarColor} text-[11px] font-semibold text-white`}>
                      {person.name.split(' ').map((part) => part[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{person.name}</div>
                      <div className="text-xs text-white/45">{person.handle}</div>
                    </div>
                  </div>
                  <div className="text-right text-xs text-violet-200">{person.xp}</div>
                </div>
              ))}
            </div>

            <Button href="/leaderboard" variant="ghost" className="mt-4 w-full justify-center">
              See Full Leaderboard <ArrowRight className="h-4 w-4" />
            </Button>
          </CardShell>

          <CardShell className={`${styles.sidebarCard} p-4`}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">Categories</h3>
              <button className="text-xs text-white/55 transition hover:text-white">All Categories</button>
            </div>

            <div className="space-y-2">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm transition ${selectedCategory === category ? 'bg-violet-500/15 text-violet-100' : 'bg-white/[0.025] text-white/65 hover:bg-white/[0.04]'}`}
                >
                  <span>{category}</span>
                  <span className="text-xs text-white/45">{[12, 342, 412, 186, 231, 128, 96, 45][index]}{index === 0 ? 'K' : ''}</span>
                </button>
              ))}
            </div>

            <Button variant="ghost" className="mt-4 w-full justify-center">
              View All Categories <ArrowRight className="h-4 w-4" />
            </Button>
          </CardShell>

          <CardShell className={`${styles.sidebarCard} p-4`}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">Popular Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {tagCloud.map((tag) => (
                <button key={tag} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs text-white/65 transition hover:border-violet-400/20 hover:bg-violet-500/10 hover:text-violet-100">
                  {tag}
                </button>
              ))}
            </div>
            <Button variant="ghost" className="mt-4 w-full justify-center">
              View All Tags <ArrowRight className="h-4 w-4" />
            </Button>
          </CardShell>

          <CardShell className={`${styles.sidebarCard} p-4`}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">Upcoming Events</h3>
              <Link href="/community" className="text-xs text-white/55 transition hover:text-white">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.title} className="flex items-center gap-3 rounded-2xl bg-white/[0.025] px-3 py-3">
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/8 bg-white/[0.04] text-center">
                    <span className="text-[10px] font-medium text-violet-200">{event.month}</span>
                    <span className="text-lg font-semibold leading-none text-white">{event.day}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-white">{event.title}</div>
                    <div className="mt-1 text-xs text-white/50">{event.time} · {event.type}</div>
                  </div>
                  <div className="text-xs text-white/45">👥 {event.attendees}</div>
                </div>
              ))}
            </div>

            <Button variant="ghost" className="mt-4 w-full justify-center">
              View All Events <ArrowRight className="h-4 w-4" />
            </Button>
          </CardShell>

          <CardShell className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">Online Members</h3>
              <div className="flex items-center gap-2 text-xs text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                246 online
              </div>
            </div>
            <div className="flex items-center gap-2">
              {onlineMembers.map((member) => (
                <div key={member.initials} className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${member.color} text-[11px] font-semibold text-white`}>
                  {member.initials}
                </div>
              ))}
              <div className="grid h-10 w-10 place-items-center rounded-full border border-white/8 bg-white/[0.03] text-xs text-white/70">+241</div>
            </div>
          </CardShell>
        </aside>
      </div>
    </main>
  );
}
