import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

const Empty = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        color: 'rgb(217, 217, 217)',
      }}>
      <AssignmentLateIcon sx={{ fontSize: 70 }} />
      <h1 style={{ textAlign: 'center', color: 'rgb(217, 217, 217)' }}>
        У вас нет ни одной заметки :(
      </h1>
    </div>
  );
};

export default Empty;
