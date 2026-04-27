import { http, HttpResponse } from 'msw';
import { SEEDED_PROSPECTS } from '@/mocks/seed';
import { PAGE_SIZE } from '@/lib/constants';
import type { Prospect } from '@/features/prospects/types';

function filterProspects(
  prospects: Prospect[],
  search: string,
  stages: string[],
  signals: string[],
): Prospect[] {
  return prospects.filter((p) => {
    if (stages.length > 0 && !stages.includes(p.stage)) return false;
    if (signals.length > 0 && !signals.includes(p.signal.label)) return false;

    if (search.length === 0) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.company.toLowerCase().includes(q) ||
      p.signal.label.toLowerCase().includes(q)
    );
  });
}

export const prospectsHandlers = [
  http.get('/api/prospects', ({ request }) => {
    const url = new URL(request.url);
    const tab = url.searchParams.get('tab') ?? 'hunt';
    const search = url.searchParams.get('search') ?? '';
    const rawPage = parseInt(url.searchParams.get('page') ?? '1', 10);
    const rawLimit = parseInt(url.searchParams.get('limit') ?? String(PAGE_SIZE), 10);
    const page = Number.isFinite(rawPage) && rawPage >= 1 ? rawPage : 1;
    const limit = Number.isFinite(rawLimit) && rawLimit >= 1 ? rawLimit : PAGE_SIZE;
    const stagesParam = url.searchParams.get('stages') ?? '';
    const signalsParam = url.searchParams.get('signals') ?? '';

    const stages = stagesParam.length > 0 ? stagesParam.split(',') : [];
    const signals = signalsParam.length > 0 ? signalsParam.split(',') : [];

    const pool = SEEDED_PROSPECTS.filter((p) => p.tab === tab);
    const filtered = filterProspects(pool, search, stages, signals);
    const total = filtered.length;
    const data = filtered.slice((page - 1) * limit, page * limit);

    return HttpResponse.json({ data, total, page, limit });
  }),
];
