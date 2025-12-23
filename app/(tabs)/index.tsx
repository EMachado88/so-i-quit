import {StyleSheet, View} from 'react-native';
import {ThemedText} from '@/components/themed-text';
import {EffectCallback, useState} from "react";
import {useFocusEffect} from "@react-navigation/core";
import {fetchSettings} from "@/utils/fetch-settings";
import dayjs from "dayjs";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {themes} from "@/constants/theme";
import Card from "react-native-paper/src/components/Card/Card";

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';

  const [soberDate, setSoberDate] = useState<string | null>(null);
  const [soberSavings, setSoberSavings] = useState<string | null>(null);
  const [smokeDate, setSmokeDate] = useState<string | null>(null);
  const [smokeSavings, setSmokeSavings] = useState<string | null>(null);

  // Helper functions to safely parse and format dates/numbers
  const daysSince = (isoDate: string | null) => {
    if (!isoDate) return 0;
    const d = dayjs(isoDate);
    return d.isValid() ? dayjs().diff(d, 'days') : 0;
  }

  const breakdown = (isoDate: string | null) => {
    if (!isoDate) return {years: 0, months: 0, days: 0};
    const d = dayjs(isoDate);
    if (!d.isValid()) return {years: 0, months: 0, days: 0};
    const years = dayjs().diff(d, 'years');
    const months = dayjs().diff(d, 'months') % 12;
    const days = dayjs().diff(d, 'days') % 30;
    const hours = dayjs().diff(d, 'hours') % 24;
    return {years, months, days, hours};
  }

  const parseSavings = (value: string | null) => {
    if (!value) return 0;
    const n = parseFloat(value.replace(',', '.'));
    return isNaN(n) ? 0 : n;
  }

  const {years: soberYears, months: soberMonths, days: soberDays, hours: soberHours} = breakdown(soberDate);
  const totalSoberSavings = daysSince(soberDate) * parseSavings(soberSavings);

  const {years: smokeYears, months: smokeMonths, days: smokeDays, hours: smokeHours} = breakdown(smokeDate);
  const totalSmokeSavings = daysSince(smokeDate) * parseSavings(smokeSavings);

  useFocusEffect(() => fetchSettings(setSoberDate, setSoberSavings, setSmokeDate, setSmokeSavings) as unknown as EffectCallback);

  return (
    <View style={styles.pageWrapper}>
      <View style={{gap: 20}}>
        <View style={{marginBottom: 20}}>
          <ThemedText
            type="title">{soberDate || smokeDate ? 'Congrats, bro!' : 'No data saved in settings'}</ThemedText>
        </View>
        {soberDate ? (
          <Card>
            <Card.Title title="Sober for"/>
            <Card.Content>
              <View>
                <View>
                  <View style={{flexDirection: "row", justifyContent: "center"}}>
                    {soberYears ? (
                      <View style={{alignItems: 'center', marginRight: 10}}>
                        <ThemedText type="title">
                          {soberYears}
                        </ThemedText>
                        <ThemedText>years</ThemedText>
                      </View>
                    ) : null}
                    {soberMonths ? (
                      <View style={{alignItems: 'center', marginRight: 10}}>
                        <ThemedText type="title">
                          {soberMonths}
                        </ThemedText>
                        <ThemedText>months</ThemedText>
                      </View>
                    ) : null}
                    {soberDays ? (
                      <View style={{alignItems: 'center', marginRight: 10}}>
                        <ThemedText type="title">
                          {soberDays}
                        </ThemedText>
                        <ThemedText>days</ThemedText>
                      </View>
                    ) : null}
                    {soberHours ? (
                      <View style={{alignItems: 'center', marginRight: 10}}>
                        <ThemedText type="title">
                          {soberHours}
                        </ThemedText>
                        <ThemedText>hours</ThemedText>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            </Card.Content>
            <Card.Actions>
              <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                <ThemedText type="subtitle">
                  {totalSoberSavings > 0 ? `${totalSoberSavings}€ saved` : null}
                </ThemedText>
              </View>
            </Card.Actions>
          </Card>
        ) : null}

        {smokeDate ? (
          <Card>
            <Card.Title title="Smoke free for"/>
            <Card.Content>
              <View>
                <View>
                  <View style={{flexDirection: "row", justifyContent: "center"}}>
                    {smokeYears ? (
                      <View style={{alignItems: 'center', marginRight: 10}}>
                        <ThemedText type="title">
                          {smokeYears}
                        </ThemedText>
                        <ThemedText>years</ThemedText>
                      </View>
                    ) : null}
                    {smokeMonths ? (
                      <View style={{alignItems: 'center', marginRight: 10}}>
                        <ThemedText type="title">
                          {smokeMonths}
                        </ThemedText>
                        <ThemedText>months</ThemedText>
                      </View>
                    ) : null}
                    {smokeDays ? (
                      <View style={{alignItems: 'center', marginRight: 10}}>
                        <ThemedText type="title">
                          {smokeDays}
                        </ThemedText>
                        <ThemedText>days</ThemedText>
                      </View>
                    ) : null}
                    {smokeHours ? (
                      <View style={{alignItems: 'center', marginRight: 10}}>
                        <ThemedText type="title">
                          {smokeHours}
                        </ThemedText>
                        <ThemedText>hours</ThemedText>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            </Card.Content>
            <Card.Actions>
              <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                <ThemedText type="subtitle">
                  {totalSmokeSavings > 0 ? `${totalSmokeSavings}€ saved` : null}
                </ThemedText>
              </View>
            </Card.Actions>
          </Card>
        ) : null}
      </View>
      <Card mode="contained" style={{backgroundColor: themes[colorScheme].colors.primaryContainer}}>
        <Card.Content>
          <View style={{alignItems: 'flex-end'}}>
            <ThemedText type="subtitle">
              {totalSoberSavings + totalSmokeSavings > 0 ? 'Total savings' : 'No savings yet'}
            </ThemedText>
            <ThemedText type="title">
              {totalSoberSavings + totalSmokeSavings > 0 ? `${totalSoberSavings + totalSmokeSavings}€` : null}
            </ThemedText>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    padding: 20,
    gap: 40,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
