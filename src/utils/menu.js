import { Icon } from "@shopify/polaris";
import {
  HomeFilledIcon,
  OrderFilledIcon,
  ProductFilledIcon,
  SettingsIcon,
} from "@shopify/polaris-icons";

export const menu = [
  {
    id: 1,
    label: "Dashboard",
    url: "/",
    icon: <Icon source={HomeFilledIcon} tone="base" />,
  },
  {
    id: 2,
    label: "Products",
    url: "/product",
    icon: <Icon source={OrderFilledIcon} tone="base" />,
  },
  {
    id: 3,
    label: "Settings",
    url: "/setting",
    icon: <Icon source={ProductFilledIcon} tone="base" />,
  },
];

export const footer_button = {
  label: "Settings",
  url: "/setting",
  icon: <Icon source={SettingsIcon} tone="base" />,
};
