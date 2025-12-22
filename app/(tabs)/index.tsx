import {StyleSheet} from 'react-native';
import {ThemedText} from '@/components/themed-text';
import {ThemedView} from '@/components/themed-view';
import {EffectCallback, useState} from "react";
import {useFocusEffect} from "@react-navigation/core";
import {fetchSettings} from "@/utils/fetch-settings";
import dayjs from "dayjs";

export default function HomeScreen() {
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
    return {years, months, days};
  }

  const parseSavings = (value: string | null) => {
    if (!value) return 0;
    const n = parseFloat(value.replace(',', '.'));
    return isNaN(n) ? 0 : n;
  }

  const {years: soberYears, months: soberMonths, days: soberDays} = breakdown(soberDate);
  const totalSoberSavings = daysSince(soberDate) * parseSavings(soberSavings);

  const {years: smokeYears, months: smokeMonths, days: smokeDays} = breakdown(smokeDate);
  const totalSmokeSavings = daysSince(smokeDate) * parseSavings(smokeSavings);

  useFocusEffect(() => fetchSettings(setSoberDate, setSoberSavings, setSmokeDate, setSmokeSavings) as unknown as EffectCallback);

  return (
    <ThemedView style={styles.pageWrapper}>
      <ThemedView>
        <ThemedView style={{marginBottom: 60}}>
          <ThemedText type="title">Congratulations, bro!</ThemedText>
        </ThemedView>
        {soberDate ? (
          <ThemedView style={{marginBottom: 40}}>
            <ThemedText type="subtitle" style={{marginBottom: 20}}>Sober for</ThemedText>
            <ThemedView>
              <ThemedView style={{flexDirection: "row", justifyContent: "center"}}>
                {soberYears ? (
                  <ThemedView style={{alignItems: 'center', marginRight: 10}}>
                    <ThemedText type="title">
                      {soberYears}
                    </ThemedText>
                    <ThemedText>years</ThemedText>
                  </ThemedView>
                ) : null}
                {soberMonths ? (
                  <ThemedView style={{alignItems: 'center', marginRight: 10}}>
                    <ThemedText type="title">
                      {soberMonths}
                    </ThemedText>
                    <ThemedText>months</ThemedText>
                  </ThemedView>
                ) : null}
                {soberDays ? (
                  <ThemedView style={{alignItems: 'center', marginRight: 10}}>
                    <ThemedText type="title">
                      {soberDays}
                    </ThemedText>
                    <ThemedText>days</ThemedText>
                  </ThemedView>
                ) : null}
              </ThemedView>
              <ThemedView style={{flexDirection: "row", justifyContent: "flex-end"}}>
                <ThemedText type="subtitle">
                  {totalSoberSavings}€
                  saved
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        ) : null}

        {smokeDate ? (
          <ThemedView>
            <ThemedText type="subtitle" style={{marginBottom: 20}}>Smoke free for</ThemedText>
            <ThemedView>
              <ThemedView style={{flexDirection: "row", justifyContent: "center"}}>
                {smokeYears ? (
                  <ThemedView style={{alignItems: 'center', marginRight: 10}}>
                    <ThemedText type="title">
                      {smokeYears}
                    </ThemedText>
                    <ThemedText>years</ThemedText>
                  </ThemedView>
                ) : null}
                {smokeMonths ? (
                  <ThemedView style={{alignItems: 'center', marginRight: 10}}>
                    <ThemedText type="title">
                      {smokeMonths}
                    </ThemedText>
                    <ThemedText>months</ThemedText>
                  </ThemedView>
                ) : null}
                {smokeDays ? (
                  <ThemedView style={{alignItems: 'center', marginRight: 10}}>
                    <ThemedText type="title">
                      {smokeDays}
                    </ThemedText>
                    <ThemedText>days</ThemedText>
                  </ThemedView>
                ) : null}
              </ThemedView>
              <ThemedView style={{flexDirection: "row", justifyContent: "flex-end"}}>
                <ThemedText type="subtitle">
                  {totalSmokeSavings}€
                  saved
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        ) : null}
      </ThemedView>
      <ThemedView style={{alignItems: 'flex-end'}}>
        <ThemedText type="subtitle">
          Total savings
        </ThemedText>
        <ThemedText type="title">
          {totalSoberSavings + totalSmokeSavings}€
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    padding: 20,
    paddingBlock: 40,
    marginTop: 20,
    gap: 40,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
