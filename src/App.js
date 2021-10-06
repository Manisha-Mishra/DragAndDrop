import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import DropContainer from './container/DropContainer';
import './App.css'


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
        <div className='App'>
          <DropContainer></DropContainer>
        </div>
    </DndProvider>
  );
}

export default App;
