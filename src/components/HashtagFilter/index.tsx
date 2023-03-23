import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { getHashTagList } from './utils';

interface HashtagFilterProps {
  filterValue: string[];
  setFilterValue: Function;
}

export default React.memo(function HashtagFilter({
  filterValue,
  setFilterValue,
}: HashtagFilterProps) {
  const notes = useAppSelector((state) => state.notesReducer.notes);
  const hashtags = React.useMemo(() => getHashTagList(notes), [notes]);

  return (
    <div>
      <Autocomplete
        noOptionsText="Ничего не найдено"
        value={filterValue}
        size="small"
        sx={{ marginBottom: '15px' }}
        multiple
        id="tags"
        options={hashtags}
        onChange={(_, value) => setFilterValue(value)}
        getOptionLabel={(option: string) => option}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Выберите хештеги" />
        )}
      />
    </div>
  );
});
