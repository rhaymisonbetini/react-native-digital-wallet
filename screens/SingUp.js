import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Modal,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { COLORS, SIZES, FONTS, icons, images } from '../constants/index';

const SingUp = () => {

    const [showPassword, setShowPassWord] = React.useState(false)
    const [selectArea, setSelectArea] = React.useState([{ code: '', name: '', callingCode: '', flag: '' }])
    const [areas, setAreas] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);

    React.useEffect(() => {

        fetch("https://restcountries.eu/rest/v2/all")
            .then(response => response.json())
            .then(data => {
                let areaData = data.map(item => {
                    return {
                        code: item.alpha2Code,
                        name: item.name,
                        callingCode: `+ ${item.callingCodes[0]}`,
                        flag: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`
                    }
                })

                setAreas(areaData)
                if (areaData.length > 0) {
                    let defaultData = areaData.filter(a => a.code == "US");
                    if (defaultData.length > 0) {
                        console.log(defaultData[0])
                        setSelectArea(defaultData[0])
                    }
                }

            }).catch(error => {
                console.log(error)
            })
    }, [])


    const renderSection = () => {
        return (
            <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: SIZES.padding * 6,
                paddingHorizontal: SIZES.padding * 2
            }}
                onPress={() => console.log()}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.white
                    }}
                />
                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.white, ...FONTS.h4 }}>Login</Text>
            </TouchableOpacity>
        )
    }

    const renderLogo = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 5,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={images.wallieLogo}
                    resizeMode="contain"
                    style={{
                        width: "60%"
                    }}
                />
            </View>
        )
    }

    const returnForm = () => {
        return (

            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    marginHorizontal: SIZES.padding * 2
                }}
            >
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Nome completo</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderColor: COLORS.white,
                            borderRadius: 8,
                            borderWidth: 1,
                            height: 50,
                            color: COLORS.white,
                            ...FONTS.body3,
                        }}
                        placeholder=""
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                    />
                </View>

                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Telefone</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{
                            width: 100,
                            height: 50,
                            marginHorizontal: 5,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            ...FONTS.body2
                        }}
                            onPress={() => setModalVisible(true)}
                        >
                            <View style={{ justifyContent: "center" }}>
                                <Image
                                    source={icons.down}
                                    style={{
                                        width: 10,
                                        height: 10,
                                        tintColor: COLORS.white
                                    }}
                                />
                            </View>
                            <View style={{ justifyContent: "center" }}>
                                <Image
                                    source={{ uri: selectArea?.flag }}
                                    resizeMode="contain"
                                    style={{
                                        width: 30,
                                        height: 30,
                                        marginLeft: 10
                                    }}
                                />
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>{selectArea?.callingCode}</Text>
                            </View>
                        </TouchableOpacity>
                        <TextInput
                            keyboardType="phone-pad"
                            style={{
                                flex: 1,
                                borderColor: COLORS.white,
                                borderRadius: 8,
                                borderWidth: 1,
                                height: 50,
                                color: COLORS.white,
                                ...FONTS.body3,
                            }}
                            placeholder=""
                            placeholderTextColor={COLORS.white}
                            selectionColor={COLORS.white}
                        />
                    </View>
                </View>
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Senha</Text>
                    <TextInput
                        secureTextEntry={!showPassword}
                        style={{
                            flex: 1,
                            marginVertical: SIZES.padding,
                            borderColor: COLORS.white,
                            borderRadius: 8,
                            borderWidth: 1,
                            height: 50,
                            color: COLORS.white,
                            ...FONTS.body3,
                        }}
                        placeholder=""
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                    />
                    <TouchableOpacity style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 10,
                        width: 30,
                        height: 30
                    }}
                        onPress={() => setShowPassWord(true)}
                    >
                        <Image
                            source={showPassword ? icons.disable_eye : icons.eye}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.white
                            }}
                        />

                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderAreaCodesModal = () => {

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{ padding: SIZES.padding, flexDirection: 'row' }}
                    onPress={() => {
                        setSelectArea(item)
                        setModalVisible(false)
                    }}
                >
                    <Image
                        source={{ uri: item.flag }}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body4 }}>{item.name}</Text>
                </TouchableOpacity>
            )
        }

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{
                            height: 400,
                            width: SIZES.width * 0.8,
                            backgroundColor: COLORS.lightGreen,
                            borderRadius: SIZES.radius
                        }}>
                            <FlatList
                                data={areas}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.code}
                                showsVerticalScrollIndicator={false}
                                style={{
                                    padding: SIZES.padding * 2,
                                    marginBottom: SIZES.padding * 2
                                }}
                            >

                            </FlatList>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    const renderButton = () => {
        return (
            <View style={{ margin: SIZES.padding }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        height: 60,
                        backgroundColor: COLORS.black,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => setShowPassWord(true)}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Entrar</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={(Platform.OS === 'ios') ? 'padding' : null}
            style={{ flex: 1 }}
            enabled
        >
            <LinearGradient
                colors={[COLORS.lime, COLORS.emerald]}
                style={{ flex: 1 }}
            >
                <ScrollView >
                    {renderSection()}
                    {renderLogo()}
                    {returnForm()}
                    {renderButton()}
                </ScrollView>
            </LinearGradient>
            {renderAreaCodesModal()}
        </KeyboardAvoidingView>
    )

}

export default SingUp;