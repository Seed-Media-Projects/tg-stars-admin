import { getHealthFX } from '@core/health';

export const homeLoader = async () => {
  const [{ details }] = await Promise.all([getHealthFX()]);
  return { details };
};
