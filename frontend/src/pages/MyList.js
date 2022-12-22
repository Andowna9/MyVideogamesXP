import {
Tabs,
TabList,
Tab,
TabPanels,
TabPanel,
Center
} from '@chakra-ui/react';
import GameList from '../components/GameList';

const MyList = () => {
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
                        <GameList />
                    </TabPanel>
                    <TabPanel>
                        On Hold games
                    </TabPanel>
                    <TabPanel>
                        Completed games
                    </TabPanel>
                    <TabPanel>
                        Dropped games
                    </TabPanel>
                </TabPanels>
            </Tabs>
    );
}

export default MyList;