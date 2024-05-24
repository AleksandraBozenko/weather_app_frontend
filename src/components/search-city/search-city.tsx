import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';
import { useGetCities } from '../dashboard/hooks/use-get-cities.ts';
import { usePageContext } from '../page-context/page-context.tsx';

export const SearchCity: FC = () => {
  const { searchState } = usePageContext();
  const { data: searchCityData, isLoading: loadingSearchCityData } = useGetCities(searchState.value || '');
  const navigate = useNavigate();
  return (
    <Autocomplete
      loading={loadingSearchCityData}
      options={searchCityData || []}
      getOptionLabel={(option) => option.name}
      onChange={(_, value) => {
        navigate(`/cityDetails/${value?.id || ''}`);
      }}
      onInputChange={(_, value) => searchState.setValue(value || '')}
      sx={{
        mt: 2,
        width: '100%',
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search City"
          variant="outlined"
          onChange={(e) => searchState.setValue(e.target.value || '')}
        />
      )}
    />
  );
};
