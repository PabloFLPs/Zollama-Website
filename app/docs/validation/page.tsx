import type { Metadata } from 'next';
import DocValidation from './DocValidation';

export const metadata: Metadata = { title: 'Validation & repair' };

export default function ValidationPage() {
  return <DocValidation />;
}
