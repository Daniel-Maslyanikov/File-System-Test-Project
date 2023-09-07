import FileSystem from './components/FileSystem/FileSystem';
import './style/index.scss';

const initialFileSystem = {
    id: 'root',
    name: 'Root',
    type: 'folder',
    children: [
        {
            id: 'assets',
            name: 'ASSETS',
            type: 'folder',
            children: [
                {
                    id: 'lndg',
                    name: 'LNDG',
                    type: 'folder',
                    children: [
                        {
                            id: 'lndg_0120',
                            name: 'LNDG_0120',
                            type: 'file',
                        },
                        {
                            id: 'lndg_0140',
                            name: 'LNDG_0140',
                            type: 'file',
                        },
                        {
                            id: 'lndg_0160',
                            name: 'LNDG_0160',
                            type: 'file',
                        },
                        {
                            id: 'lndg_0180',
                            name: 'LNDG_0180',
                            type: 'file',
                        },
                        {
                            id: 'lndg_0200',
                            name: 'LNDG_0200',
                            type: 'file',
                        },
                        {
                            id: 'lndg_0220',
                            name: 'LNDG_0220',
                            type: 'file',
                        },
                    ],
                },
            ],
        },
        {
            id: 'barr',
            name: 'BARR',
            type: 'folder',
            children: [],
        },
        {
            id: 'bngl',
            name: 'BNGL',
            type: 'folder',
            children: [],
        },
        {
            id: 'bnrk',
            name: 'BNRK',
            type: 'folder',
            children: [],
        },
        {
            id: 'bttl',
            name: 'BTTL',
            type: 'folder',
            children: [],
        },
        {
            id: 'clps',
            name: 'CLPS',
            type: 'folder',
            children: [],
        },
        {
            id: 'engn',
            name: 'ENGN',
            type: 'folder',
            children: [],
        },
        {
            id: 'intr',
            name: 'INTR',
            type: 'folder',
            children: [],
        },
        {
            id: 'lndg2',
            name: 'LNDG',
            type: 'folder',
            children: [],
        },
    ],
};

function App() {
    return (
        <div className="app">
            <div className="sidebar">
                <FileSystem initialFileSystem={initialFileSystem} />
            </div>
        </div>
    );
}

export default App;
