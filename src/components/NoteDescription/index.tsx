import React from 'react';
import { deleteNote } from '../../redux/slices/NoteSlice';
import { useAppDispatch } from '../../hooks/redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '../NoteItem/NoteItem.module.scss';

interface NoteDescriptionProps {
  description: string;
  setEditing: Function;
  date: number;
}

export default React.memo(function NoteDescription({
  description,
  setEditing,
  date,
}: NoteDescriptionProps) {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.wrapper}>
        <button
          className={styles.btn}
          onClick={() => setEditing(true)}
          title="Редактировать описание">
          <EditIcon className={styles.icon} />
        </button>
        <button className={styles.btn} onClick={() => dispatch(deleteNote(date))} title="Удалить">
          <DeleteIcon className={styles.icon} />
        </button>
      </div>
    </>
  );
});
