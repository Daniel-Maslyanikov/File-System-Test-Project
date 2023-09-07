import React, { useState } from 'react';
import Folder from '../Folder/Folder';
import File from '../File/File';

interface FileSystemProps {
    initialFileSystem?: {
        name: string;
        type: string;
        children: { name: string; type: string }[];
    };
}

const FileSystem: React.FC<FileSystemProps> = ({
    initialFileSystem = {
        name: 'Root',
        type: 'folder',
        children: [],
    },
}) => {
    const [fileSystem, setFileSystem] = useState({
        ...initialFileSystem,
        children: initialFileSystem.children.sort((a, b) => a.name.localeCompare(b.name)),
    });

    return (
        <div>
            <div>
                {fileSystem.children.map((item, index) => {
                    if (item.type === 'folder') {
                        return <Folder key={index} folder={item} />;
                    } else {
                        return <File key={index} file={item} />;
                    }
                })}
            </div>
        </div>
    );
};

export default FileSystem;
