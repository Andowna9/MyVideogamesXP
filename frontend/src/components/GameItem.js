import {
Flex,
Box,
Button,
HStack,
Center,
Text,
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
        axios.get(`/videogames/igdb/${igdbId}`,
        { params: {cover_size: 'small'} }
        )
        .then((result) => {
            setIgdbData(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [igdbId]);

    return (
        <>
            <DesktopGameItem
            igdbData={igdbData}
            progress={progress}
            score={score}
            openEdit={editModal.onOpen}
            openDelete={deleteAlert.onOpen}
             />
            <MobileGameItem
            igdbData={igdbData}
            progress={progress}
            score={score}
            openEdit={editModal.onOpen}
            openDelete={deleteAlert.onOpen}
            />
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

const DesktopGameItem = ({ igdbData, progress, score, openEdit, openDelete }) => {
    return (
        <Flex
        display={{base: 'none', lg: 'flex'}}
        py={2}
        justify='space-between'
        align='center'>
            <Box flex='1 1 20%'>
                <GameCover
                src={igdbData.cover_image}
                width='80px'
                />
            </Box>
            <Box flex='1 1 40%'>{igdbData.name}</Box>
            <Box flex='1 1 10%'>{progress && progress.toString() + '%'}</Box>
            <Box flex='1 1 10%'>{score || 'N/A'}</Box>
            <Box flex='1 1 20%'>
                <HStack>
                    <Button
                    colorScheme='green' onClick={openEdit}>
                        Edit
                    </Button>
                    <Button
                    colorScheme='red' onClick={openDelete}>
                        Remove
                    </Button>
                </HStack>
            </Box>
        </Flex> 
    );
}

const MobileGameItem = ({ igdbData, progress, score, openEdit, openDelete }) => {
    return (
        <Box display={{lg: 'none'}}>
            <Flex
            justify='center'
            align='center'
            gap={6}>
                <Box>
                    <GameCover
                    src={igdbData.cover_image}
                    width='80px'
                    />
                </Box>
                <Flex
                width='300px' 
                direction='column'>
                    <Flex
                    gap={3}>
                        <Text as='b'>Title:</Text>
                        <Text>{igdbData.name}</Text>
                    </Flex>
                    <Flex
                    gap={3}>
                        <Text as='b'>Progress:</Text>
                        <Text>{progress && progress.toString() + '%'}</Text>
                    </Flex>
                    <Flex
                    gap={3}>
                        <Text as='b'>Score:</Text>
                        <Text>{score}</Text>
                    </Flex>
                </Flex>
            </Flex>
            <Center pt={4}>
                <HStack>
                    <Button
                    colorScheme='green' onClick={openEdit}>
                        Edit
                    </Button>
                    <Button
                    colorScheme='red' onClick={openDelete}>
                        Remove
                    </Button>
                </HStack>
            </Center>
        </Box>
    );
};

export default GameItem;