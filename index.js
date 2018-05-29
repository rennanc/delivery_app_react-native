import { Navigation } from 'react-native-navigation'
import { AsyncStorage } from 'react-native';
import App from './src/Screens/App';

Navigation.registerComponent('deliveryApp', () => App);

AsyncStorage.getItem('token')
    .then(token => {
        if (token) {
            return {
                screen: 'deliveryApp',
                title: 'deliveryApp',
                navigatorStyle: {
                    navBarHidden: true
                }
            }
        }

        return {
            screen: 'deliveryApp',
            title: 'deliveryApp',
            navigatorStyle: {
                navBarHidden: true
            }
        }
    })
    .then(screen => Navigation.startSingleScreenApp({ screen }))
