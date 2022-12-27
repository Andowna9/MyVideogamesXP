import {
Flex,
Box,
Button,
HStack,
useDisclosure
}
from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import GameCover from './GameCover';
import ItemModal from './ItemModal';
import DeleteItemDialog from './DeleteItemDialog';

const GameItem = ({ igdbId, status, progress, score, onEdit, onDelete }) => {
    const [igdbData, setIgdbData] = useState({});
    const editModal = useDisclosure();
    const deleteAlert = useDisclosure();

    useEffect(() => {
        axios.get(`/videogames/igdb/${igdbId}`)
        .then((result) => {
            setIgdbData(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [igdbId]);

    return (
        <>
            <Flex
            py={2}
            justify='space-between'
            align='center'>
                <Box flex='1 1 20%'>
                    <GameCover
                    src={igdbData.cover_image}
                    />
                </Box>
                <Box flex='1 1 40%'>{igdbData.name}</Box>
                <Box flex='1 1 10%'>{progress && progress.toString() + '%'}</Box>
                <Box flex='1 1 10%'>{score || 'N/A'}</Box>
                <Box flex='1 1 20%'>
                    <HStack>
                        <Button
                        colorScheme='green' onClick={editModal.onOpen}>
                            Edit
                        </Button>
                        <Button
                        colorScheme='red' onClick={deleteAlert.onOpen}>
                            Remove
                        </Button>
                    </HStack>
                </Box>
            </Flex>
            <ItemModal headerTitle='Edit Game Item' 
            actionName='Save'
            isOpen={editModal.isOpen}
            onAction={onEdit}
            onClose={editModal.onClose}
            initialState={{status: status, progress: progress, score: score}}
            />
            <DeleteItemDialog 
            isOpen={deleteAlert.isOpen} 
            onAction={onDelete} 
            onClose={deleteAlert.onClose} 
            />
        </>
    );
}

export default GameItem;