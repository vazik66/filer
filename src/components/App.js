import classes from './App.module.css';
import FilePackList from "./FilePackList";

function App() {
    return (
        <div className={classes.app}>
            <h1>Filer</h1>
            <FilePackList />
        </div>
    );
}

export default App;
