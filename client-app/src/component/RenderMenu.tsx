import React, { Component, MouseEvent } from 'react';
import { ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { MenuList } from '../utils/Menu';
import { Link } from 'react-router-dom';

interface MenuListProps {
    value: MenuList;
    onItemMenuClik: (e: MouseEvent<HTMLElement>) => void;
}

export default class RenderMenu extends Component<MenuListProps> {

    render() {
        const menuList = this.props.value
        const MyMenus = menuList.map((menu, index) =>
            <ListItem key={index} button component={Link} to={menu.link} onClick={this.props.onItemMenuClik}>
                <ListItemIcon>
                    <Icon>{menu.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={menu.label} />
            </ListItem>
        )

        return <List>{MyMenus}</List>
    }
}
