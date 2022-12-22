import {
Flex,
Box,
Text,
useDisclosure
} from '@chakra-ui/react';
import GameItem from './GameItem';
import EditItemModal from './EditItemModal';
import DeleteItemDialog from './DeleteItemDialog';

const GameList = () => {
    const editModal = useDisclosure();
    const deleteAlert = useDisclosure();

    return (
        <Box padding={8} boxShadow='lg'>
            <Flex
            justify='space-evenly'
            align='center'
            display={{base: 'none', md: 'flex'}}>
                <Box flex='1 1 20%'>
                    <Text as='b'>
                        Cover
                    </Text>
                </Box>
                <Box flex='1 1 40%'>
                    <Text as='b'>
                        Title
                    </Text>
                </Box>
                <Box flex='1 1 10%'>
                    <Text as='b'>
                        Progress
                    </Text>
                </Box>
                <Box flex='1 1 10%'>
                    <Text as='b'>
                        Score
                    </Text>
                </Box>
                <Box flex='1 1 20%'>
                </Box>
            </Flex>
            <Box>
                <GameItem title='The Legend of Zelda: Breath of the Wild' progress={50} onEdit={editModal.onOpen} onDelete={deleteAlert.onOpen} />
                <GameItem title='Super Mario Bos' progress={80} onEdit={editModal.onOpen} onDelete={deleteAlert.onOpen} />
            </Box>
            <EditItemModal isOpen={editModal.isOpen} onClose={editModal.onClose} />
            <DeleteItemDialog isOpen={deleteAlert.isOpen} onClose={deleteAlert.onClose} />
        </Box>
    );

};

export default GameList;