import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { editNote, deleteHashtag, addHashtag } from '../../redux/slices/NoteSlice';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import NoteEditor from '../NoteEditor';
import styles from './NoteItem.module.scss';
import { oneHashtagRegex } from '../../utils/regex';
import NoteDescription from '../NoteDescription';

interface NoteItemProps {
  description: string;
  date: number;
  name: string;
  hashtags: any;
}

export default React.memo(function NoteItem({ description, date, name, hashtags }: NoteItemProps) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = React.useState(false);
  const [editingHashtags, setEditingHashtags] = React.useState(false);
  const [value, setValue] = React.useState(description);
  const [hashtagValue, setHashtagValue] = React.useState('');

  const tags = React.useMemo(
    () => hashtags?.reduce((acc: string, item: string) => acc + item + ' ', ''),
    [hashtags]
  );

  const saveChanges = React.useCallback(() => {
    dispatch(editNote({ date, text: value }));
    setEditing(false);
  }, [date, dispatch, value]);

  const undoChanges = React.useCallback(() => {
    setEditing(false);
    setValue(description);
  }, [description]);

  const addNewHashtag = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(addHashtag({ date, tag: hashtagValue }));
      setHashtagValue('');
    },
    [date, dispatch, hashtagValue]
  );

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id="date">
        <h4 className={styles.name}>{name}</h4>
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.container}>
          {editing ? (
            <>
              <NoteEditor value={value} setValue={setValue} />
              <div className={styles.wrapper}>
                <button
                  className={styles.btn}
                  disabled={value === ''}
                  onClick={saveChanges}
                  title={value === '' ? 'Добавьте описание' : 'Сохранить изменения'}>
                  <CheckIcon className={styles.icon} />
                </button>
                <button className={styles.btn} onClick={undoChanges} title="Отменить изменения">
                  <CloseIcon className={styles.icon} />
                </button>
              </div>
            </>
          ) : (
            <NoteDescription date={date} description={description} setEditing={setEditing} />
          )}
        </div>
        {!editing ? (
          <>
            <div className={styles.container}>
              {!editingHashtags ? (
                <h5 className={styles.tags}>{tags}</h5>
              ) : (
                <div className={styles.deleteBtn_wrapper}>
                  {hashtags?.map((item: string) => (
                    <button
                      key={item}
                      onClick={() => dispatch(deleteHashtag({ date, tag: item }))}
                      className={styles.deleteTagBtn}>
                      <span>{item}</span>
                      <CloseIcon />
                    </button>
                  ))}
                </div>
              )}
              <h6 className={styles.date}>Дата создания: {new Date(date).toLocaleDateString()}</h6>
            </div>
            <button className={styles.btn} onClick={() => setEditingHashtags(!editingHashtags)}>
              {!editingHashtags ? 'Редактировать хештеги' : 'Завершить редактирование'}
            </button>
            {editingHashtags ? (
              <form onSubmit={(e) => addNewHashtag(e)} className={styles.addTag_form}>
                <input
                  required
                  pattern={oneHashtagRegex}
                  value={hashtagValue}
                  onChange={(e) => setHashtagValue(e.currentTarget.value)}
                  className={styles.addTag_input}
                />
                <button className={styles.addTag_btn}>Добавить</button>
              </form>
            ) : null}
          </>
        ) : null}
      </AccordionDetails>
    </Accordion>
  );
});
