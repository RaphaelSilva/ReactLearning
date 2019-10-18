import React, { Component, MouseEvent } from 'react';
import { ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { MenuList } from '../utils/Menu';
import { Link, LinkProps } from 'react-router-dom';

interface MenuListProps {
    value: MenuList;
    onItemMenuClik: (e: MouseEvent<HTMLElement>) => void;
}

export default class RenderMenu extends Component<MenuListProps> {

    render() {
        const menuList = this.props.value
        const MyMenus = menuList.map((menu, index) =>
            <ListItem key={index} button 
                component={React.forwardRef<HTMLAnchorElement, Omit<LinkProps, 'innerRef' | 'to'>>(
                    (props, ref) => (
                    <Link to={menu.link} {...props} innerRef={ref} onClick={(e) => {
                        this.props.onItemMenuClik(e as MouseEvent<HTMLElement>)
                    }}>
                        <ListItemIcon>
                            <Icon>{menu.icon}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={menu.label} />
                    </Link>))}
            />
        )

        return <List>{MyMenus}</List>
    }
}
