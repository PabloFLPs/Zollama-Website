import type { Metadata } from 'next';
import DocGenerate from './DocGenerate';

export const metadata: Metadata = { title: 'The generate() call' };

export default function GeneratePage() {
  return <DocGenerate />;
}
