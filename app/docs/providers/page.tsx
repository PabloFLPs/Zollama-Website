import type { Metadata } from 'next';
import DocProviders from './DocProviders';

export const metadata: Metadata = { title: 'Providers' };

export default function ProvidersPage() {
  return <DocProviders />;
}
