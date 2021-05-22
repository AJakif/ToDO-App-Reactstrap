import './App.css';
import TodoList from './components/TodoList'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import {Container} from "reactstrap"

function App() {
  return (
    <div className="App">
      <Container>
        <TodoList />
      </Container>
    </div>
  );
}

export default App;
