import { Drawer } from "expo-router/drawer";
import UserMenu from "../../components/UserMenu";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerRight: () => <UserMenu />,
        drawerType: "slide",
      }}
    >
      <Drawer.Screen name="home" options={{ title: "Home" }} />
      <Drawer.Screen name="profile" options={{ title: "Profile" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
    </Drawer>
  );
}
