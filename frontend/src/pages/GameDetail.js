import {
Box,
Heading,
Text,
CircularProgress,
Stack,
Wrap,
WrapItem,
Button,
Flex
}
from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import GameCover from '../components/GameCover';

const ListJoinText = ({ list, name, field }) => {
    if (list) {
        return (
            <Text>
                <b>{name}: </b>
                {   list.map((item) => {
                        return item[field];
                     }).join(', ') 
                }
            </Text>
        );
    }
    return null;
};

const GameDetail = () => {
    const { id } = useParams();
    const [game, setGame] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/videogames/igdb/${id}`)
        .then((result) => {
            setGame(result.data);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false);
        });

    }, [id]);

    if (isLoading) return (
        <Flex 
        align='center' 
        justify='center'
        minH='60vh'>
            <CircularProgress 
            size='60px'
            isIndeterminate 
            color='blue.500' />
        </Flex>
    );

    return (
        <Box padding={10} pt='80px'>
            <Wrap spacing='50px' justify='center' align='center'>
                <WrapItem>
                    <Stack spacing={2}>
                        <GameCover
                        src={game.cover_image}
                        alt={game.name}/>
                        <Button colorScheme='blue'>
                            Add to list
                        </Button>
                    </Stack>
                </WrapItem>
                <WrapItem w='800px'>
                    <Stack spacing={4}>
                        <Heading>{game.name}</Heading>
                        <Text>
                            {
                                game.first_release_date ? 
                                new Date(game.first_release_date * 1000).toDateString() : 'Date unknown'
                            }
                        </Text>
                        <Text>
                            {game.summary}
                        </Text>
                        <ListJoinText name='Genres' list={game.genres} field='name'/>
                        <ListJoinText name='Platforms' list={game.platforms} field='name'/>
                    </Stack>
                </WrapItem>
            </Wrap>
        </Box>
    );
};

export default GameDetail;