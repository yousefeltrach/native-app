import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center ">
      <Text className="text-5xl font-bold text-dark-200">welcome </Text>
      <Link href="/onboarding">
          <Text>Onboarding</Text>
        </Link>
        <Link href="/movie/avangers" >
          <Text>Avengers movie</Text>
        </Link>
    </View>
  );
}
