import { SubNavigationItems } from "./submenu-items";

export interface NavigationItems{

  icon?: string;
  name?: string;
  isSubItemPresent?: boolean;
  submenu?: SubNavigationItems[];
  isActive?: boolean;
  route?: string;
}
