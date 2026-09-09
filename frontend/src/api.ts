export async function fetchHealth(): Promise<{ status: string }> {
  const response = await fetch('/api/v1/health');
  if (!response.ok) throw new Error('Không thể kết nối backend');
  const payload = (await response.json()) as { data: { status: string } };
  return payload.data;
}
