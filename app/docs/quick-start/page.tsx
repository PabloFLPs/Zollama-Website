import type { Metadata } from 'next';
import DocQuickStart from './DocQuickStart';

export const metadata: Metadata = { title: 'Quick start' };

export default function QuickStartPage() {
  return <DocQuickStart />;
}
