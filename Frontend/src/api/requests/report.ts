import { get } from '../api';
import { ApiResponse } from '../models/ApiResponse';
import { ReportRequest, ReportResponse } from '../models/Report';

export const getReport = async (filters: ReportRequest): Promise<ApiResponse<ReportResponse[]>> => {
  const query = new URLSearchParams({
    activeOnly: filters.activeOnly.toString(),
    underMySupervision: filters.underMySupervision.toString(),
  }).toString();
  return await get<ReportResponse[]>(`/report?${query}`);
};
