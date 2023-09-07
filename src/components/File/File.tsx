import React from 'react';
import { Typography } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

interface FileProps {
    file: {
        name: string;
        type: string;
    };
    marginLeft?: number;
}

const File: React.FC<FileProps> = ({ file, marginLeft = 0 }) => {
    return (
        <div style={{ marginLeft: `${marginLeft}px` }}>
            <InsertDriveFileIcon style={{ marginRight: '4px' }} />
            <Typography variant="body1">{file.name}</Typography>
        </div>
    );
};

export default File;
