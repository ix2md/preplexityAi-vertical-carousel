import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, ImageBackground, ImageProps, Text, View } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

const items = [
    {
        id: '1',
        title: 'Nvidia Announces Rubin Ai Platform',
        description: 'Nvidia has unveiled its next-generateion Ai chip platform named "Rubin," set to be rolled out in 2026. the announcement, made by CEO Jensen Huang at the Comp...',
        image: require('@/assets/images/img-1.jpg'),
    },
    {
        id: '2',
        title: 'Caesar @ix2mdReal in 1866',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when...",
        image: require('@/assets/images/img-2.jpg'),
    },
    {
        id: '3',
        title: 'Tesla recalling all Cybertrucks',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when...",
        image: require('@/assets/images/img-3.jpg'),
    },
    {
        id: '4',
        title: 'Ai',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when...",
        image: require('@/assets/images/img-4.jpg'),
    },
    {
        id: '5',
        title: 'Neutral',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when...",
        image: require('@/assets/images/img-5.jpg'),
    },
    {
        id: '6',
        title: 'Drones',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when...",
        image: require('@/assets/images/img-6.jpg'),
    },
    {
        id: '7',
        title: 'Elon musk',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when...",
        image: require('@/assets/images/img-7.jpg'),
    },
    {
        id: '8',
        title: 'Apple CEO',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when...",
        image: require('@/assets/images/img-8.jpg'),
    },
    {
        id: '9',
        title: 'Follow @ix2mdReal',
        description: "is the best react native developer, there more animations in his account. ❤️‍🩹",
        image: require('@/assets/images/img-2.jpg'),
    },
];

type ItemType = {
    id: string;
    title: string;
    description: string;
    image: ImageProps;
};

interface Props {
    Item: ItemType
    scrollY: SharedValue<number>;
    index: number;
}

const { height } = Dimensions.get("screen")
const _spacing = 8
const _itemSize = height * 0.6
const _itemFullSize = _itemSize + _spacing * 2

function RenderItem({ Item, scrollY, index }: Props) {
    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [index - 1, index, index + 1];
        return {
            opacity: interpolate(scrollY.value, inputRange, [0.5, 1, 0.5]),
            transform: [
                {
                    scale: interpolate(scrollY.value, inputRange, [0.95, 1, 0.95]),
                },
            ],
        };
    });
    const AnimatedBg = Animated.createAnimatedComponent(ImageBackground)
    return (
        <AnimatedBg source={Item.image} blurRadius={100} style={[animatedStyle, {
            flex: 1,
            height: _itemSize,
            padding: _spacing,
            borderRadius: 8,
            gap: _spacing,
            overflow: "hidden"
        }]}>
            <View style={{
                flex: 1,
                borderRadius: 6,
                overflow: 'hidden',
            }}>
                <Image source={Item.image}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    resizeMode="cover"
                />
            </View>
            <View style={{ padding: _spacing, gap: _spacing * 2 }}>
                <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold", width: "89%" }}>{Item.title}</Text>
                <Text style={{ color: "#ccc" }}>{Item.description}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: _spacing }}>
                        <View style={{ flexDirection: "row", marginRight: 4 }}>
                            <Image
                                style={{
                                    borderRadius: 100,
                                    width: 24,
                                    height: 24,
                                    marginLeft: 0,
                                    zIndex: 3,
                                }}
                                source={require("@/assets/images/reddit.png")}
                            />
                            <Image
                                style={{
                                    borderRadius: 100,
                                    width: 24,
                                    height: 24,
                                    marginLeft: -8,
                                    zIndex: 2,
                                }}
                                source={require("@/assets/images/x.png")}
                            />
                            <Image
                                style={{
                                    borderRadius: 100,
                                    width: 24,
                                    height: 24,
                                    marginLeft: -8,
                                    zIndex: 1,
                                }}
                                source={require("@/assets/images/google.png")}
                            />
                        </View>
                        <Text style={{ color: "#ccc" }}>
                            {Math.floor(Math.random() * (28 - 16 + 1)) + 16} sources
                        </Text>

                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: _spacing }}>
                        <View style={{
                            borderRadius: 999, aspectRatio: 1, width: 34, backgroundColor: "rgba(0,0,0,0.4)",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Ionicons name="bookmark-outline" size={16} color="white" />
                        </View>
                        <View style={{
                            borderRadius: 999, aspectRatio: 1, width: 34, backgroundColor: "rgba(0,0,0,0.4)",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Ionicons name="headset-outline" size={16} color="white" />
                        </View>
                    </View>
                </View>
            </View>
        </AnimatedBg>
    )
}

export default function VerticalCarousel() {
    const scrollY = useSharedValue(0)
    const onScroll = useAnimatedScrollHandler((e) => {
        scrollY.value = e.contentOffset.y / _itemFullSize
    })

    return (
        <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#111" }}>
            <Animated.FlatList
                data={items}
                renderItem={({ item, index }) => <RenderItem Item={item} index={index} scrollY={scrollY} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    paddingHorizontal: _spacing * 3,
                    paddingVertical: (height - _itemFullSize) / 2,
                    gap: _spacing * 2,
                }}
                snapToInterval={_itemFullSize}
                decelerationRate={"fast"}
                showsVerticalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
            />
        </View>
    )
}