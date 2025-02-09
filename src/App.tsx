import CardDisplay from "./components/CardDisplay.tsx";
import Sidebar from "./components/Sidebar.tsx";


function App() {

    return (
        <div className="flex h-screen w-screen bg-stone-900">
            <Sidebar/>
            <CardDisplay/>
        </div>
    )
}

export default App;