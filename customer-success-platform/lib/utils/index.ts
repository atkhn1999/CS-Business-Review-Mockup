import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function calculateDelta(current: number, previous: number): number {
  if (!previous || previous === 0) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}

export function downloadFile(content: string, filename: string, type: string = 'application/json') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export const PRODUCT_KPIS = {
  'Content Library': [
    { key: 'content_utilization', label: 'Content Utilization', unit: '%', higherIsBetter: true },
    { key: 'tagging_percentage', label: 'Tagging Percentage', unit: '%', higherIsBetter: true },
    { key: 'records_with_reviews', label: '% of Records with Reviews enabled', unit: '%', higherIsBetter: true },
    { key: 'content_ownership', label: '% of content with ownership', unit: '%', higherIsBetter: true },
    { key: 'obsolete_records', label: '% of obsolete records', unit: '%', higherIsBetter: false },
    { key: 'duplicated_records', label: '% of duplicated records', unit: '%', higherIsBetter: false },
  ],
  'AI': [
    { key: 'unedited_ai_responses', label: 'Unedited AI responses', unit: '%', higherIsBetter: false },
    { key: 'answer_with_ai', label: '% answer with AI', unit: '%', higherIsBetter: true },
    { key: 'ai_chatbot_usage', label: 'AI chatbot usage', unit: 'sessions', higherIsBetter: true },
  ],
  'Projects': [
    { key: 'answer_library_usage', label: '% Answer library usage', unit: '%', higherIsBetter: true },
    { key: 'manual_answers', label: '% of manual answers', unit: '%', higherIsBetter: false },
    { key: 'answers_edited', label: '% of Answers edited from Answer Library', unit: '%', higherIsBetter: false },
    { key: 'time_per_response', label: 'Time spent per response', unit: 's', higherIsBetter: false },
  ],
  'Trust Center': [
    { key: 'profile_views', label: '% of profile views', unit: '%', higherIsBetter: true },
  ],
};