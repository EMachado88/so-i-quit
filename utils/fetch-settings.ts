import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchSetting = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(`Error fetching setting for key "${key}":`, error);
    return null;
  }
}

export const fetchSettings = (setSoberDate: (arg0: string | null) => any, setSoberSavings: (arg0: string | null) => any, setSmokeDate: (arg0: string | null) => any, setSmokeSavings: (arg0: string | null) => any) => {
  fetchSetting('soberDate').then(date => setSoberDate(date));
  fetchSetting('soberSavings').then(savings => setSoberSavings(savings));
  fetchSetting('smokeDate').then(date => setSmokeDate(date));
  fetchSetting('smokeSavings').then(savings => setSmokeSavings(savings));
}