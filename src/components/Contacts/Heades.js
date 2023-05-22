import {Avatar, Flex, HStack, IconButton, Tooltip} from '@chakra-ui/react';
import {
    CommunityIcon,
    MenuIcon,
    NewChatIcon,
    StatusIcon,
} from '../../common/images/icons';

const iconData = [
    {icon: <CommunityIcon/>, label: 'Community chat'},
    {icon: <StatusIcon/>, label: 'Status'},
    {icon: <NewChatIcon/>, label: 'New Chat'},
    {icon: <MenuIcon/>, label: 'Menu'},
];

function CustomTooltip({label, icon, ...rest}) {
    return (
        <Tooltip
            shouldWrapChildren
            label={label}
            bg='#eae6df'
            color='black'
            fontSize='xs'
            {...rest}
        >
            <IconButton aria-label='icon' variant='ghost'>{icon}</IconButton>
        </Tooltip>
    );
}

export const Header = (props) => {
    return (
        <Flex
            bg='#f0f2f5'
            justify='space-between'
            py='2'
            px='4'
            borderRight='1px solid #f2f2f2'
            color='#54656f'
            {...props}
        >
            <Avatar
                boxSize='40px'
                name='Yahiko'
                src='https://qph.cf2.quoracdn.net/main-qimg-439b88568e90f2b1941d432ad4aa769a-lq'
            />
            <HStack spacing='3'>
                {iconData.map((item, index) => (
                    <CustomTooltip key={index} label={item.label} icon={item.icon}/>
                ))}
            </HStack>
        </Flex>
    );
}
