import { SaveConfigPayload, updateConfigFX } from '@core/config';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const updateConfigAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveConfigPayload;

  try {
    await updateConfigFX({
      tonStarPrice: Number(payload.tonStarPrice),
      marginPercentage: Number(payload.marginPercentage),
    });
  } catch (error) {
    return {
      error: 'Cannot update config',
    };
  }

  return redirect('/config');
};
