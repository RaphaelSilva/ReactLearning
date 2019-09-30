export interface MenuItem {
    label: string
    icon: string
    link: string
}

export interface MenuList extends Array<MenuItem>{ } 
