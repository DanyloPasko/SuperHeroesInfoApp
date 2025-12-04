import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

const OPTIONS = [
    { key: "default", label: "Default" },
    { key: "strength", label: "Strength" },
    { key: "speed", label: "Speed" },
    { key: "power", label: "Power" },
];

export type HeroFilterKey = "default" | "strength" | "speed" | "power";

export default function HeroFilter({
                                       selected,
                                       onChange,
                                   }: {
    selected: HeroFilterKey;
    onChange: (key: HeroFilterKey) => void;
}) {
    return (
        <View style={tw`flex-row justify-center mt-2 mb-1 flex-wrap`}>
            {OPTIONS.map((o) => (
                <TouchableOpacity
                    key={o.key}
                    onPress={() => onChange(o.key as HeroFilterKey)}
                    style={tw`px-3 py-1 mx-1 mt-1 rounded-full ${
                        selected === o.key ? "bg-blue-500" : "bg-gray-200"
                    }`}
                >
                    <Text
                        style={tw`${selected === o.key ? "text-white" : "text-gray-700"}`}
                    >
                        {o.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
