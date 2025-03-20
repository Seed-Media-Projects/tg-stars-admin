import { ConfigData, getConfigDataFX } from '@core/config';
import { Box, Button, Link, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

export const Component = () => {
  const { config } = useLoaderData() as { config: ConfigData | null };

  if (!config) {
    return (
      <Box>
        <Typography gutterBottom>Active config not found</Typography>

        <Link href={`/config/create`}>
          <Button variant="contained">Create</Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Config info
      </Typography>
      <Box my={2} display="flex" gap={2}>
        <Link href="/config/edit">
          <Button variant="contained">Edit</Button>
        </Link>
      </Box>
      <Typography gutterBottom>Маржинальный процент: {config.marginPercentage * 100}%</Typography>
      <Typography gutterBottom>Цена за TON: {config.tonRubPrice} ₽</Typography>
      <Typography gutterBottom>Цена за звезду: {config.tonStarPrice} TON</Typography>
    </Box>
  );
};

Component.displayName = 'ConfigPage';

export const loader = async () => {
  const config = await getConfigDataFX();
  return { config };
};
