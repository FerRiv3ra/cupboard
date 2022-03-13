import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    dateContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10
    },
    label: {
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600',
        color: '#444'
    },  
    textCenter: {
        textAlign: 'center',
    },  
    button:{
        marginVertical: 40,
        paddingVertical: 20,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textBtn:{
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: 16
    },
    input: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10
    },
    icon: {
        alignSelf: 'center',
        color: '#FFF'
    },
    view: {
        marginHorizontal: 30,
        marginBottom: 15
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    orange: {
        backgroundColor: '#E6653E',
    },
    green: {
        backgroundColor: '#4b6423',
    },
    lightGreen: {
        backgroundColor: '#B0CA91',
    },
    flex: {
        flex: 1
    }
});

export default globalStyles;