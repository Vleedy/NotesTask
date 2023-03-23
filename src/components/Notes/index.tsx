import React from 'react';
import NoteItem from '../NoteItem';
import styles from './Notes.module.scss';
import Empty from '../Empty';
import { useAppSelector } from '../../hooks/redux';
import { filterNotes } from './utils';

interface NotesProps {
  filterValue: string[];
}

const Notes: React.FC<NotesProps> = ({ filterValue }) => {
  const { notes } = useAppSelector((state) => state.notesReducer);
  const filteredNotes = React.useMemo(
    () => notes.filter((item) => filterNotes(item.hashtags, filterValue)),
    [notes, filterValue]
  );

  return (
    <>
      {filteredNotes.length ? (
        <ul className={styles.wrapper}>
          {filteredNotes.map((item) => (
            <NoteItem
              key={item.date}
              name={item.name}
              description={item.description}
              date={item.date}
              hashtags={item.hashtags}
            />
          ))}
        </ul>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default Notes;
