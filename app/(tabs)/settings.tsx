import {StyleSheet, TextInput, TouchableHighlight} from 'react-native';

import {ThemedText} from '@/components/themed-text';
import {ThemedView} from '@/components/themed-view';
import {IconSymbol} from "@/components/ui/icon-symbol";
import {DarkTheme} from "@react-navigation/native";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";

export default function TabTwoScreen() {
  const [soberDate, setSoberDate] = useState<string | null>(null);
  const [soberSavings, setSoberSavings] = useState<string | null>(null);

  const [smokeDate, setSmokeDate] = useState<string | null>(null);
  const [smokeSavings, setSmokeSavings] = useState<string | null>(null);

  const fetchSoberDate = async () => {
    const date = await AsyncStorage.getItem('soberDate');
    setSoberDate(date);
  }

  const fetchSoberSavings = async () => {
    const savings = await AsyncStorage.getItem('soberSavings');
    setSoberSavings(savings);
  }

  const fetchSmokeDate = async () => {
    const date = await AsyncStorage.getItem('smokeDate');
    setSmokeDate(date);
  }

  const fetchSmokeSavings = async () => {
    const savings = await AsyncStorage.getItem('smokeSavings');
    setSmokeSavings(savings);
  }
  useEffect(() => {
    fetchSoberDate();
    fetchSoberSavings();
    fetchSmokeDate();
    fetchSmokeSavings();
  }, []);

  return (
    <ThemedView
      style={styles.settingsWrapper}>
      <ThemedView>
        <ThemedText
          type="title">
          Settings
        </ThemedText>
      </ThemedView>

      <ThemedView>
        <ThemedText
          type="subtitle" style={{marginBottom: 0}}>
          Sober date:
        </ThemedText>
        <ThemedView style={{flexDirection: "row", justifyContent: "space-between", alignItems: "baseline"}}>
          <ThemedText>
            {soberDate ? new Date(soberDate as unknown as string).toLocaleDateString() : "--/--/----"}
          </ThemedText>
          <TouchableHighlight
            onPress={() => DateTimePickerAndroid.open({
              mode: "date",
              value: soberDate ? new Date(soberDate) : new Date(),
              maximumDate: new Date(),
              style: {backgroundColor: DarkTheme.colors.card},
              onChange: async (_event, date) => {
                if (date) {
                  setSoberDate(date.toISOString());
                  await AsyncStorage.setItem('soberDate', date.toISOString());
                }
              }
            })}
            style={{padding: 10, borderRadius: 8}}>
            <IconSymbol name="pencil" color={DarkTheme.colors.text}/>
          </TouchableHighlight>
        </ThemedView>
        <ThemedView style={{flexDirection: "row", alignItems: "baseline"}}>
          <TextInput value={soberSavings || undefined}
                     editable={!!soberDate}
                     placeholder="Insert daily savings"
                     placeholderTextColor={DarkTheme.colors.text}
                     style={styles.input}
                     keyboardType="number-pad"
                     onChange={async (event) => {
                       setSoberSavings(event.nativeEvent.text)
                       await AsyncStorage.setItem('soberSavings', event.nativeEvent.text)
                     }}/>
          <ThemedText>
            €
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView>
        <ThemedText
          type="subtitle" style={{marginBottom: 0}}>
          Quit smoking date:
        </ThemedText>
        <ThemedView style={{flexDirection: "row", justifyContent: "space-between", alignItems: "baseline"}}>
          <ThemedText>
            {smokeDate ? new Date(smokeDate as unknown as string).toLocaleDateString() : "--/--/----"}
          </ThemedText>
          <TouchableHighlight
            onPress={() => DateTimePickerAndroid.open({
              mode: "date",
              value: smokeDate ? new Date(smokeDate) : new Date(),
              maximumDate: new Date(),
              style: {backgroundColor: DarkTheme.colors.card},
              onChange: async (_event, date) => {
                if (date) {
                  setSmokeDate(date.toISOString());
                  await AsyncStorage.setItem('smokeDate', date.toISOString());
                }
              }
            })}
            style={{padding: 10, borderRadius: 8}}>
            <IconSymbol name="pencil" color={DarkTheme.colors.text}/>
          </TouchableHighlight>
        </ThemedView>
        <ThemedView style={{flexDirection: "row", alignItems: "baseline"}}>
          <TextInput value={smokeSavings || undefined}
                     editable={!!smokeDate}
                     placeholder="Insert daily savings"
                     placeholderTextColor={DarkTheme.colors.text}
                     style={styles.input}
                     keyboardType="number-pad"
                     onChange={async (event) => {
                       setSmokeSavings(event.nativeEvent.text)
                       await AsyncStorage.setItem('smokeSavings', event.nativeEvent.text)
                     }}/>
          <ThemedText>
            €
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  settingsWrapper: {
    padding: 20,
    marginTop: 40,
    gap: 40
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: DarkTheme.colors.primary,
    color: DarkTheme.colors.text
  }
});
