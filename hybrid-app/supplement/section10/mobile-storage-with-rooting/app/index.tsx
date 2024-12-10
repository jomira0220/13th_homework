import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function StartPage() {
  useEffect(() => {
    // 1. AsyncStorage에 accessToken을 저장 => 루팅시 탈취 가능
    AsyncStorage.setItem("accessToken", "whalfk220");

    // 2. SecureStorage에 accessToken을 저장 => 루팅시 탈취 불가능
    SecureStore.setItemAsync("accessToken222", "whalfk220");
  }, []);

  return <Text>안녕하세요! 실행 완료되었습니다!</Text>;
}
