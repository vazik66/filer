import classes from './App.module.css';
import FilePackList from "./FilePackList";

const filePacks = [
    {text: 'adawdawd'},
    {text: 'adawdawd'},
    {text: 'adawdawd'},
    {text: 'adawdawd'},
    {text: 'adawdawd'},
];

function App() {
    return (
        <div className={classes.app}>
            <h1>Filer</h1>
            <FilePackList filePacks={filePacks} />
        </div>
    );
}

export default App;
