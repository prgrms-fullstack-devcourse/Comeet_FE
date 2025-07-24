import { Home, MapPin, MessageCircle, User, type LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  icon: LucideIcon;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    icon: Home,
    path: '/'
  },
  {
    id: 'nearby',
    icon: MapPin,
    path: '/nearby'
  },
  {
    id: 'chat',
    icon: MessageCircle,
    path: '/chat'
  },
  {
    id: 'profile',
    icon: User,
    path: '/profile'
  }
];