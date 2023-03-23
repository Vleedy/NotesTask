import React from 'react';
import Notes from './components/Notes';
import AddNotes from './components/AddNote';
import HashtagFilter from './components/HashtagFilter';
import './styles/app.scss';

function App() {
  const [filterValue, setFilterValue] = React.useState<string[] | []>([]);
  return (
    <div className="container">
      <div className="wrapper">
        <h2>Мои заметки</h2>
        <Notes filterValue={filterValue} />
      </div>
      <div className="wrapper">
        <h2>Добавить заметку</h2>
        <AddNotes />
        <h2>Фильтр по хештегу</h2>
        <HashtagFilter filterValue={filterValue} setFilterValue={setFilterValue} />
      </div>
    </div>
  );
}

export default App;
