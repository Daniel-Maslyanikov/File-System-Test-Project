import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import File from '../File/File';
import styles from './Folder.module.scss';

interface Item {
    id: string;
    name: string;
    type: string;
    children: Item[];
    parent?: Item;
}

interface FolderProps {
    folder: Item;
    marginLeft?: number;
}

const Folder: React.FC<FolderProps> = ({ folder, marginLeft = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const [newItemType, setNewItemType] = useState('file');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [folderToDeletePath, setFolderToDeletePath] = useState('');

    const handleToggleFolder = () => {
        setIsExpanded(!isExpanded);
    };

    const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleContextMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOpenModal = (type: string) => {
        setNewItemType(type);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemName(e.target.value);
    };

    const handleAddItem = () => {
        if (newItemName.trim() === '') return;

        const newItem: Item = {
            id: `${folder.id}_${newItemName}`,
            name: newItemName,
            type: newItemType,
            children: [],
            parent: folder,
        };

        folder.children.push(newItem);

        folder.children.sort(customSort);

        setNewItemName('');
        handleCloseModal();
    };

    const customSort = (a: Item, b: Item) => {
        if (a.type === 'folder' && b.type === 'file') {
            return -1;
        } else if (a.type === 'file' && b.type === 'folder') {
            return 1;
        } else {
            return a.name.localeCompare(b.name);
        }
    };

    const getFolderPath = (currentFolder: Item) => {
        const pathSegments = [];

        const getPathRecursive = (folder: Item) => {
            pathSegments.unshift(folder.name);
            if (folder.parent) {
                getPathRecursive(folder.parent);
            }
        };

        getPathRecursive(currentFolder);

        const path = pathSegments.join('/');

        return path;
    };

    const handleDeleteClick = () => {
        setFolderToDeletePath(getFolderPath(folder));
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        const deleteFolder = (id: string, parent: Item) => {
            const removeFolder = (folder: Item) => {
                folder.children = folder.children.filter((item) => item.id !== id);
                folder.children.forEach((item) => {
                    if (item.type === 'folder') {
                        removeFolder(item);
                    }
                });
            };

            removeFolder(parent);
        };

        deleteFolder(folder.id, folder.parent);

        setIsDeleteModalOpen(false);

    };

    return (
        <div className={styles.commonColor}>
            <Box display="flex" alignItems="center">
                <span
                    style={{
                        marginRight: '8px',
                        cursor: 'pointer',
                        marginLeft: `${marginLeft}px`,
                    }}
                    onClick={handleToggleFolder}>
                    <ArrowRightIcon
                        className={`${styles.arrowIcon} ${isExpanded ? styles.expanded : ''}`}
                    />
                    <FolderIcon />
                </span>
                <Typography variant="body1">{folder.name}</Typography>
                <IconButton
                    aria-label="Add"
                    size="small"
                    onClick={handleContextMenu}
                    style={{ marginLeft: 'auto' }}>
                    <AddIcon className={styles.commonColor} />
                </IconButton>
                <IconButton aria-label="Delete" size="small" onClick={handleDeleteClick}>
                    <DeleteIcon className={styles.commonColor} />
                </IconButton>
            </Box>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleContextMenuClose}>
                <MenuItem
                    className={styles.contextMenuItem}
                    onClick={() => handleOpenModal('folder')}>
                    <FolderIcon className={`icon ${styles.commonColor}`} />
                    Add Folder
                </MenuItem>
                <MenuItem
                    className={styles.contextMenuItem}
                    onClick={() => handleOpenModal('file')}>
                    <DescriptionIcon className={`icon ${styles.commonColor}`} />
                    Add Sequence
                </MenuItem>
            </Menu>
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>{`Add ${newItemType}`}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        value={newItemName}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddItem} color="primary">
                        Add
                    </Button>
                    <Button onClick={handleCloseModal} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <DialogTitle>Подтвердите удаление</DialogTitle>
                <DialogContent>
                    <p>Вы уверены, что хотите удалить папку:</p>
                    <p>{folderToDeletePath}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmDelete} color="primary">
                        Да, удалить
                    </Button>
                    <Button onClick={() => setIsDeleteModalOpen(false)} color="secondary">
                        Нет, закрыть
                    </Button>
                </DialogActions>
            </Dialog>
            {isExpanded && (
                <div className={styles.commonColor}>
                    {folder.children.sort(customSort).map((item) => (
                        <div key={item.id}>
                            {item.type === 'folder' ? (
                                <Folder folder={item} marginLeft={marginLeft + 10} />
                            ) : (
                                <File file={item} marginLeft={marginLeft + 25} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Folder;
