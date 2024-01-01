import './App.css';
import GuestRoutes from './routes/GuestRoutes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <GuestRoutes />
    </LocalizationProvider>
  );
}

export default App;
