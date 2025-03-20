import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Form, useActionData, useLoaderData, useNavigation } from 'react-router-dom';
import { ConfigData, getConfigDataFX } from '../../../core/config';
import { updateConfigAction } from './action';

const ConfigEditPage = () => {
  const navigation = useNavigation();
  const isLoading = navigation.formData?.get('marginPercentage') != null;
  const actionData = useActionData() as { error: string } | undefined;
  const { config } = useLoaderData() as { config: ConfigData | null };

  if (!config) {
    return <Typography>Config not found</Typography>;
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 500,
        margin: 'auto',
      }}
    >
      <Form method="post">
        <TextField
          margin="normal"
          required
          fullWidth
          label="Маржинальный процент"
          name="marginPercentage"
          defaultValue={config.marginPercentage}
          type="number"
          inputProps={{ min: 0, max: 100, step: '0.01' }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Цена за звезду"
          name="tonStarPrice"
          defaultValue={config.tonStarPrice}
          type="number"
          inputProps={{ step: '0.001' }}
        />

        <Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
          {isLoading ? <CircularProgress size={24} color="primary" /> : 'save'}
        </Button>

        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </Box>
  );
};

export const Component = ConfigEditPage;
export const action = updateConfigAction;
export const loader = async () => {
  const config = await getConfigDataFX();
  return { config };
};
