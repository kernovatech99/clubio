import {Button, Sidebar, SidebarItem, SidebarItemGroup, SidebarItems} from 'flowbite-react';
import {Link, Outlet, useLocation} from 'react-router';
import logo from '../assets/logo.svg';
import {useAuth} from '../auth/AuthContext.jsx';
import {MdEmojiEvents, MdMonetizationOn, MdOutlineCategory, MdChecklistRtl} from 'react-icons/md';

const menu = [
    {label: 'Buchungen', to: '/entry', icon: MdChecklistRtl},
    {label: 'Kassen', to: '/book', icon: MdOutlineCategory},
    {label: 'Konten', to: '/category', icon: MdMonetizationOn},
    {label: 'Kostenstellen', to: '/unit', icon: MdEmojiEvents},
];

export default function AppLayout() {
    const {user, logout} = useAuth();
    const {pathname} = useLocation();

    return (
        <div className="flex min-h-svh flex-col">
            <header className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
                <img src={logo} alt="Clubio" className="size-12" />
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">{user.name}</span>
                    <Button size="sm" color="alternative" onClick={logout}>
                        Abmelden
                    </Button>
                </div>
            </header>
            <div className="flex flex-1">
                <Sidebar className="h-auto border-r border-gray-800">
                    <SidebarItems>
                        <SidebarItemGroup>
                            {menu.map((item) => (
                                <SidebarItem icon={item.icon} key={item.to} as={Link} to={item.to} active={pathname === item.to || pathname.startsWith(`${item.to}/`)}>
                                    {item.label}
                                </SidebarItem>
                            ))}
                        </SidebarItemGroup>
                    </SidebarItems>
                </Sidebar>
                <main className="flex-1 p-4 text-gray-400">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
