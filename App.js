import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './file/home';
import Identifikasi_Emosi from './file/identifikasi_emosi';
import Riwayat_Analisis from './file/riwayat_analisis';
import Identifikasi_Emosi_2 from './file/identifikasi_emosi_2';

const Stack = createStackNavigator();

export default function App() {
return (
<NavigationContainer>
<Stack.Navigator initialRouteName="Home">
<Stack.Screen name="Home" component={Home} />
<Stack.Screen name="Identifikasi_Emosi" component={Identifikasi_Emosi} />
<Stack.Screen name="Riwayat_Analisis" component={Riwayat_Analisis} />
<Stack.Screen name="Identifikasi_Emosi_2" component={Identifikasi_Emosi_2} />
</Stack.Navigator>
</NavigationContainer>
);
}