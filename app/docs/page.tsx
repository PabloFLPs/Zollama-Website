import type { Metadata } from 'next';
import DocOverview from './DocOverview';

// Thin server shell keeps the static <title>; the translated content is a client
// component (it needs the language from useT). Same pattern for every docs page.
export const metadata: Metadata = { title: 'Overview' };

export default function OverviewPage() {
  return <DocOverview />;
}
