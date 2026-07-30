import type { Metadata } from 'next';
import DocEvals from './DocEvals';

export const metadata: Metadata = { title: 'Evals' };

export default function EvalsPage() {
  return <DocEvals />;
}
