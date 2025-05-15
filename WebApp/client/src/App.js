import './App.css';
import Cpumetrics from './Cpumetrics';
import Diskmetrics from './Diskmetrics';
import Memorymetrics from './Memorymetrics';
import Networkmetrics from './Networkmetrics';
function App() {
  const props = {
    time:100000,
    ip: `192.168.1.67`
  }
  return (
      <div className='App'>
        <Cpumetrics className='Cpum' {...props}></Cpumetrics>
        <Diskmetrics className='Cpum' {...props}></Diskmetrics>
        <Memorymetrics className='Cpum' {...props}></Memorymetrics>
        <Networkmetrics className='Cpum' {...props}></Networkmetrics>
      </div>
  );
}

export default App;
