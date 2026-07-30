import type { Metadata } from 'next';
import DocTelemetry from './DocTelemetry';

export const metadata: Metadata = { title: 'Telemetry' };

export default function TelemetryPage() {
  return <DocTelemetry />;
}
