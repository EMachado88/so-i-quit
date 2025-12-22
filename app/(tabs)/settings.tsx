import {StyleSheet, TextInput, TouchableHighlight} from 'react-native';

import {ThemedText} from '@/components/themed-text';
import {ThemedView} from '@/components/themed-view';
import {IconSymbol} from "@/components/ui/icon-symbol";
import {DarkTheme} from "@react-navigation/native";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import {fetchSettings} from "@/utils/fetch-settings";

export default function TabTwoScreen() {
  const [soberDate, setSoberDate] = useState<string | null>(null);
  const [soberSavings, setSoberSavings] = useState<string | null>(null);
  const [smokeDate, setSmokeDate] = useState<string | null>(null);
  const [smokeSavings, setSmokeSavings] = useState<string | null>(null);

  useEffect(() => fetchSettings(setSoberDate, setSoberSavings, setSmokeDate, setSmokeSavings), []);

  return (
    <ThemedView
      style={styles.pageWrapper}>
      <ThemedView>
        <ThemedText
          type="title">
          Settings
        </ThemedText>
      </ThemedView>

      <ThemedView style={{marginBottom: 20}}>
        <ThemedText
          type="subtitle" style={{marginBottom: 15}}>
          Alcohol free
        </ThemedText>
        <ThemedView style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          <ThemedView style={{flexDirection: 'row', alignItems: 'center'}}>
            <ThemedText type="defaultSemiBold">
              {soberDate ? new Date(soberDate).toLocaleDateString() : "--/--/----"}
            </ThemedText>
            <TouchableHighlight
              onPress={() => DateTimePickerAndroid.open({
                mode: 'date',
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
          <ThemedView style={{flexDirection: 'row', alignItems: 'center'}}>
            <ThemedText type="defaultSemiBold">
              {soberDate ? new Date(soberDate).toLocaleTimeString() : '--:--'}
            </ThemedText>
            <TouchableHighlight
              onPress={() => DateTimePickerAndroid.open({
                mode: 'time',
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
        </ThemedView>
        <ThemedView style={{flexDirection: "row", alignItems: "center"}}>
          <TextInput value={soberSavings || undefined}
                     editable={!!soberDate}
                     placeholder="Savings"
                     placeholderTextColor={DarkTheme.colors.text}
                     style={styles.input}
                     keyboardType="number-pad"
                     onChange={async (event) => {
                       setSoberSavings(event.nativeEvent.text)
                       await AsyncStorage.setItem('soberSavings', event.nativeEvent.text)
                     }}/>
          <ThemedText>
            €/day
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView>
        <ThemedText
          type="subtitle" style={{marginBottom: 15}}>
          Smoke free
        </ThemedText>
        <ThemedView style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          <ThemedView style={{flexDirection: 'row', alignItems: 'center'}}>
            <ThemedText type="defaultSemiBold">
              {smokeDate ? new Date(smokeDate).toLocaleDateString() : "--/--/----"}
            </ThemedText>
            <TouchableHighlight
              onPress={() => DateTimePickerAndroid.open({
                mode: 'date',
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
          <ThemedView style={{flexDirection: 'row', alignItems: 'center'}}>
            <ThemedText type="defaultSemiBold">
              {smokeDate ? new Date(smokeDate).toLocaleTimeString() : '--:--'}
            </ThemedText>
            <TouchableHighlight
              onPress={() => DateTimePickerAndroid.open({
                mode: 'time',
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
        </ThemedView>
        <ThemedView style={{flexDirection: "row", alignItems: "center"}}>
          <TextInput value={smokeSavings || undefined}
                     editable={!!smokeDate}
                     placeholder="Savings"
                     placeholderTextColor={DarkTheme.colors.text}
                     style={styles.input}
                     keyboardType="number-pad"
                     onChange={async (event) => {
                       setSmokeSavings(event.nativeEvent.text)
                       await AsyncStorage.setItem('smokeSavings', event.nativeEvent.text)
                     }}/>
          <ThemedText>
            €/day
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    padding: 20,
    gap: 40,
    flexGrow: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: DarkTheme.colors.primary,
    color: DarkTheme.colors.text
  }
});
