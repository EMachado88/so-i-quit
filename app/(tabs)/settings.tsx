import {Alert, StyleSheet} from 'react-native';

import {ThemedText} from '@/components/themed-text';
import {ThemedView} from '@/components/themed-view';
import {DarkTheme} from "@react-navigation/native";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import {fetchSettings} from "@/utils/fetch-settings";
import Divider from "react-native-paper/src/components/Divider";
import TextInput from "react-native-paper/src/components/TextInput/TextInput";
import Button from "react-native-paper/src/components/Button/Button";

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

      <Divider/>

      <ThemedView>
        <ThemedText
          type="subtitle" style={{marginBottom: 15}}>
          Alcohol free
        </ThemedText>
        <ThemedView
          style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10}}>
          <ThemedView style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button compact={true} icon="pencil" mode="text"
                    contentStyle={{flexDirection: 'row-reverse'}}
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
            >
              {soberDate ? new Date(soberDate).toLocaleDateString() : "--/--/----"}
            </Button>
          </ThemedView>
          <ThemedView style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button compact={true} icon="pencil" mode="text"
                    contentStyle={{flexDirection: 'row-reverse'}}
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
            >
              {soberDate ? new Date(soberDate).toLocaleTimeString() : '--:--'}
            </Button>
          </ThemedView>
        </ThemedView>
        <ThemedView style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          <TextInput
            label="Savings"
            value={soberSavings || undefined}
            keyboardType="number-pad"
            placeholder="- - "
            mode="outlined"
            right={<TextInput.Affix text="€/day"/>}
            onChangeText={async (text) => {
              const absValue = text.replace(/[^0-9.]/g, '');
              setSoberSavings(absValue)
              await AsyncStorage.setItem('soberSavings', absValue)
            }}
          />

          <Button compact={true} icon="refresh" contentStyle={{flexDirection: 'row-reverse'}} onPress={() => {
            Alert.alert("Reset Sober Date", "Are you sure you want to reset your sober date?", [
              {
                text: "Cancel",
                style: "cancel"
              },
              {
                text: "Reset",
                style: "destructive",
                onPress: async () => {
                  setSoberDate(null);
                  await AsyncStorage.removeItem('soberDate');
                  setSoberSavings(null);
                  await AsyncStorage.removeItem('soberSavings');
                }
              }
            ])
          }}>Reset</Button>
        </ThemedView>
      </ThemedView>

      <Divider/>

      <ThemedView>
        <ThemedText
          type="subtitle" style={{marginBottom: 15}}>
          Smoke free
        </ThemedText>
        <ThemedView
          style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10}}>
          <ThemedView style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button compact={true} icon="pencil" mode="text"
                    contentStyle={{flexDirection: 'row-reverse'}}
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
            >
              {smokeDate ? new Date(smokeDate).toLocaleDateString() : "--/--/----"}
            </Button>
          </ThemedView>
          <ThemedView style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button compact={true} icon="pencil" mode="text"
                    contentStyle={{flexDirection: 'row-reverse'}}
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
            >
              {smokeDate ? new Date(smokeDate).toLocaleTimeString() : '--:--'}
            </Button>
          </ThemedView>
        </ThemedView>
        <ThemedView style={{flexDirection: "row", justifyContent: 'space-between', alignItems: "center"}}>
          <TextInput
            label="Savings"
            value={smokeSavings || undefined}
            keyboardType="number-pad"
            placeholder="- - "
            mode="outlined"
            right={<TextInput.Affix text="€/day"/>}
            onChangeText={async (text) => {
              const absValue = text.replace(/[^0-9.]/g, '');
              setSmokeSavings(absValue)
              await AsyncStorage.setItem('smokeSavings', absValue)
            }}
          />
          <Button compact={true} icon="refresh" contentStyle={{flexDirection: 'row-reverse'}} onPress={() => {
            Alert.alert("Reset Smoke Date", "Are you sure you want to reset your smoke free date?", [
              {
                text: "Cancel",
                style: "cancel"
              },
              {
                text: "Reset",
                style: "destructive",
                onPress: async () => {
                  setSmokeDate(null);
                  await AsyncStorage.removeItem('smokeDate');
                  setSmokeSavings(null);
                  await AsyncStorage.removeItem('smokeSavings');
                }
              }
            ])
          }}>Reset</Button>
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
