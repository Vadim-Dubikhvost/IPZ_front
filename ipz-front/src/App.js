import { AboutUs } from './AboutUsPage/AboutUsPage';
import './App.css';
import { CreateEditEvent } from './CreateEditEvent/CreateEditEventPage';
import { LoginPage } from './LoginPage/LoginPage';
import '@fontsource/roboto/500.css';
import { EventPage } from './EventPage/EventPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="events" element={      <EventPage />}/>
        <Route  path="event" element={      <CreateEditEvent />}/>
        <Route  path="about" element={      <AboutUs />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
