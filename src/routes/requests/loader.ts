import { initGetRequestsListFX } from '@core/requests';
import { LoaderFunctionArgs } from 'react-router-dom';

export const adminRequestsLoader = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const requestId = searchParams.get('requestId') ?? '';
  const requests = await initGetRequestsListFX(requestId);
  return { requests };
};
