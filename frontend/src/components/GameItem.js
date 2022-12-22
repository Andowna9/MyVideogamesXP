import {
Flex,
Box,
Button,
HStack,
Image
}
from '@chakra-ui/react';

const GameItem = ({ id, title, progress, score, onEdit, onDelete }) => {
    return (
        <Flex
        py={2}
        justify='space-between'
        align='center'>
            <Box flex='1 1 20%'>
                <Image
                borderRadius='md'
                src='https://images.igdb.com/igdb/image/upload/t_cover_small/co4ap4.jpg'
                />
            </Box>
            <Box flex='1 1 40%'>{title}</Box>
            <Box flex='1 1 10%'>{progress.toString() + '%'}</Box>
            <Box flex='1 1 10%'>{score || 'N/A'}</Box>
            <Box flex='1 1 20%'>
                <HStack>
                    <Button
                    colorScheme='green' onClick={onEdit}>
                        Edit
                    </Button>
                    <Button
                    colorScheme='red' onClick={onDelete}>
                        Remove
                    </Button>
                </HStack>
            </Box>
        </Flex>
    );
}

export default GameItem;