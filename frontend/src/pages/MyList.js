import {
Tabs,
TabList,
Tab,
TabPanels,
TabPanel,
Center
} from '@chakra-ui/react';
import GameList from '../components/GameList';
import { useState, useEffect } from 'react';
import axios from '../api/axiosInstance';

const MyList = () => {
    const [list, setList] = useState([]);

    const editListItem = (id, data) => {
        axios.put(`/videogames/lists/my-games/${id}`, data)
        .then((result) => {
            const editedGame = result.data;
            setList(list.map((game) => {
                if (game._id === editedGame._id) {
                    return editedGame;
                }
                return game;
            }));
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const removeListItem = (id) => {
        axios.delete(`/videogames/lists/my-games/${id}`)
        .then((result) => {
            const removedGame = result.data;
            setList(list.filter((game) => game._id !== removedGame._id));
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        axios.get('/videogames/lists/my-games')
        .then((result) => {
            setList(result.data);
            console.log(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
            <Tabs>
                <Center>
                    <TabList>
                        <Tab>Playing</Tab>
                        <Tab>On Hold</Tab>
                        <Tab>Completed</Tab>
                        <Tab>Dropped</Tab>
                    </TabList>
                </Center>
                <TabPanels>
                    <TabPanel>
                        { <GameList
                            games={list.filter((game) => game.status === 'Playing')}
                            removeGameItem={removeListItem}
                            editGameItem={editListItem}
                            /> 
                        }
                    </TabPanel>
                    <TabPanel>
                        { <GameList
                            games={list.filter((game) => game.status === 'On Hold')}
                            removeGameItem={removeListItem}
                            editGameItem={editListItem}
                            /> 
                        }
                    </TabPanel>
                    <TabPanel>
                        { <GameList
                            games={list.filter((game) => game.status === 'Completed')}
                            removeGameItem={removeListItem}
                            editGameItem={editListItem}
                            /> 
                        }
                    </TabPanel>
                    <TabPanel>
                        { 
                            <GameList
                            games={list.filter((game) => game.status === 'Dropped')}
                            removeGameItem={removeListItem}
                            editGameItem={editListItem}
                            /> 
                        }
                    </TabPanel>
                </TabPanels>
            </Tabs>
    );
}

export default MyList;