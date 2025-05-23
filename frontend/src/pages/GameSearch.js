import {
SimpleGrid,
Flex,
CircularProgress,
Stack,
Box,
Text,
Input,
InputGroup,
InputLeftElement,
Link
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../api/axiosInstance';
import GameCover from '../components/GameCover';

const GameSearch = () => {
    const [games, setGames] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams({});
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
      const search = searchParams.get('search');
      if (!search) {
        setLoading(false);
        setGames([]);
        return;
      }

      let ignore = false;
      setLoading(true);
      axios.get('/videogames/igdb/search', 
        { params: { search: search } }
      )
      .then((result) => {
        if (!ignore) {
          setGames(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
        if (!ignore) {
          setGames([]);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

      return () => {
        ignore = true;
      }
    }, [searchParams]);

    return (
      <>
      <Box paddingX={8} paddingY={4}>
        <InputGroup>
          <InputLeftElement 
          pointerEvents='none'
          children={<SearchIcon />} 
          />
          <Input 
          placeholder='Search game'
          value={searchParams.get('search') || ''} 
          onChange={(event) => {
            const val = event.target.value;
            setSearchParams(val ? { search: val } : {});
          }}/>
        </InputGroup>
      </Box>
      <Box paddingX={8} paddingY={4}>
        { isLoading? 
           <Flex 
           align='center' 
           justify='center'
           >
              <CircularProgress 
              size='60px'
              isIndeterminate 
              color='blue.500' />
           </Flex>
          :<SimpleGrid columns={{sm: 2, md: 3, xl: 5}} spacing={4}>
            {
              games.map((game) => {
                return (
                <Flex key={game.id} justify='center'>
                  <Stack width='200px' align='center' spacing={2}>
                    <Link href={`/games/${game.id}`}>
                      <GameCover 
                      src={game.cover_image}
                      width='180px'
                      /> 
                    </Link>
                    <Text textAlign='center' noOfLines={2}>
                      {game.name}
                    </Text>
                  </Stack>
                </Flex>
                );
              })
            }
          </SimpleGrid>
      }
      </Box>
      </>
    );
}

export default GameSearch;