import type { Metadata } from 'next';
import DocErrors from './DocErrors';

export const metadata: Metadata = { title: 'Errors' };

export default function ErrorsPage() {
  return <DocErrors />;
}
