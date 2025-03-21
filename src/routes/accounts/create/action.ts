import { createAccountFX, CreateAccountPayload } from '@core/accounts';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const createAccountAcction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as CreateAccountPayload;

  if (payload.password.length < 8) {
    return {
      error: 'Пароль должен быть мин 8 символов',
    };
  }

  try {
    await createAccountFX(payload);
  } catch (error) {
    return {
      error: 'Cannot create account',
    };
  }

  return redirect('/accounts');
};
