import 'react-native-gesture-handler';

import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { PaperProvider } from 'react-native-paper';
import DrawerRoutesBotton from './routes/DrawerRoutesBotton';
import DrawerRoutes from './routes/DrawerRoutes';


export default function App() {
  return (
    <>
      <PaperProvider>
        <DrawerRoutes />
      </PaperProvider>


      <FlashMessage position="top" />
    </>
  );
}
const styles = StyleSheet.create({
  logoStyle: {
    width: 240,
    height: 30,
  }
});