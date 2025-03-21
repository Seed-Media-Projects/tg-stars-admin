import { useDebounce } from '@core/hooks/useDebounce';
import { Box, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  title: string;
  searchName?: string;
};

export const SearchTitle = ({ title, searchName = 'search' }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get(searchName) ?? '');
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const debouncedSearchTerm = useDebounce(searchValue, 1000);

  useEffect(() => {
    setSearchParams({ [searchName]: debouncedSearchTerm });
  }, [debouncedSearchTerm, searchName, setSearchParams]);

  return (
    <Box flexWrap="wrap" display="flex" alignItems="center">
      <Typography variant="h6" sx={{ mb: matches ? undefined : 4 }}>
        {title}
      </Typography>
      <TextField
        onChange={e => setSearchValue(e.target.value)}
        size="small"
        sx={{ ml: 1 }}
        placeholder="Search"
        value={searchValue}
      />
    </Box>
  );
};
