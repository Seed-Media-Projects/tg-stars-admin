import { getAllAccountsFX } from '@core/accounts';
import { LoaderFunctionArgs } from 'react-router-dom';

export const accountsLoader = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const statsInterval = searchParams.get('statsInterval') || 'all';
  const accounts = await getAllAccountsFX(statsInterval);
  return { accounts };
};
