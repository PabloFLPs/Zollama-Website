import type { Metadata } from 'next';
import DocInstallation from './DocInstallation';

export const metadata: Metadata = { title: 'Installation' };

export default function InstallationPage() {
  return <DocInstallation />;
}
