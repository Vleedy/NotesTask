import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { addNote } from '../../redux/slices/NoteSlice';
import { Box, Button, TextField } from '@mui/material';
import { getHashtags } from '../../utils/getHashtags';

const AddNote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [note, setNote] = useState({ name: '', description: '' });

  const addName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setNote((item) => ({ ...item, name: e.target.value }));
  };

  const addDescripton = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setNote((item) => ({ ...item, description: e.target.value }));
  };

  const handleClickAdd = (e: React.FormEvent): void => {
    e.preventDefault();
    const date: number = new Date().getTime();
    const hashtags = Array.from(
      new Set(getHashtags(note.description).map((item) => `#${item.hashtag}`))
    );
    dispatch(addNote({ ...note, date, hashtags: hashtags }));
    setNote({ name: '', description: '' });
  };

  return (
    <Box component="form" onSubmit={(e) => handleClickAdd(e)}>
      <TextField
        fullWidth
        inputProps={{ maxLength: 55 }}
        sx={{ marginBottom: '10px' }}
        required
        label="Добавьте название"
        value={note.name}
        onChange={(e) => addName(e)}
        size="small"
      />

      <TextField
        size="small"
        fullWidth
        inputProps={{ maxLength: 300 }}
        sx={{ marginBottom: '10px' }}
        multiline
        required
        label="Добавьте описание"
        value={note.description}
        onChange={(e) => addDescripton(e)}
      />

      <Button size="small" sx={{ marginBottom: '15px' }} variant="contained" type="submit">
        Добавить
      </Button>
    </Box>
  );
};

export default AddNote;
