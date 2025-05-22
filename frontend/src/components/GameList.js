import {
Flex,
Box,
Text,
VStack
} from '@chakra-ui/react';
import GameItem from './GameItem';

const GameList = ({ games, editGameItem, removeGameItem }) => {

    if (games.length === 0) {
        return (
            <Box padding={8}>
                <Text textAlign='center'>
                    No games added with this status
                </Text>
            </Box>
        );
    }

    return (
        <Box padding={8}>
            <Flex
            justify='space-evenly'
            align='center'
            display={{base: 'none', lg: 'flex'}}>
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
            <Flex
            direction='column'
            gap={8}
            align='stretch'>
                { 
                    games && games.map((game, index) => {
                        return <GameItem 
                                key={index} 
                                id={game._id}
                                igdbId={game.igdb_id}
                                status={game.status}
                                progress={game.progress}
                                score={game.score}
                                onEdit={(data) => editGameItem(game._id, data)}
                                onDelete={() => removeGameItem(game._id)}
                                />
                    }) 
                }
            </Flex>
        </Box>
    );

};

export default GameList;