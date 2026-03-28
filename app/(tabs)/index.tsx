import { ThemedText } from "@/components/themed-text";
import { themes } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { fetchSettings } from "@/utils/fetch-settings";
import { useIsFocused } from "@react-navigation/core";
import { Link } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Card from "react-native-paper/src/components/Card/Card";

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";

  const isFocused = useIsFocused();
  const [soberDate, setSoberDate] = useState<string | null>(null);
  const [soberSavings, setSoberSavings] = useState<string | null>(null);
  const [smokeDate, setSmokeDate] = useState<string | null>(null);
  const [smokeSavings, setSmokeSavings] = useState<string | null>(null);
  const [soberYears, setSoberYears] = useState(0);
  const [soberMonths, setSoberMonths] = useState(0);
  const [soberDays, setSoberDays] = useState(0);
  const [soberHours, setSoberHours] = useState(0);
  const [totalSoberSavings, setTotalSoberSavings] = useState(0);
  const [smokeYears, setSmokeYears] = useState(0);
  const [smokeMonths, setSmokeMonths] = useState(0);
  const [smokeDays, setSmokeDays] = useState(0);
  const [smokeHours, setSmokeHours] = useState(0);
  const [totalSmokeSavings, setTotalSmokeSavings] = useState(0);

  // Helper functions to safely parse and format dates/numbers
  const daysSince = (isoDate: string | null) => {
    if (!isoDate) return 0;
    const d = dayjs(isoDate);
    return d.isValid() ? dayjs().diff(d, "days") : 0;
  };

  const breakdown = (isoDate: string | null) => {
    if (!isoDate) return { years: 0, months: 0, days: 0, hours: 0 };
    const d = dayjs(isoDate);
    if (!d.isValid()) return { years: 0, months: 0, days: 0, hours: 0 };

    let current = d;
    const now = dayjs();

    const years = now.diff(current, "years");
    current = current.add(years, "years");

    const months = now.diff(current, "months");
    current = current.add(months, "months");

    const days = now.diff(current, "days");
    current = current.add(days, "days");

    const hours = now.diff(current, "hours");

    return { years, months, days, hours };
  };

  const parseSavings = (value: string | null) => {
    if (!value) return 0;
    const n = parseFloat(value.replace(",", "."));
    return isNaN(n) ? 0 : n;
  };

  const formatAmount = (value: number) => {
    return `${Math.round(value * 100) / 100}€`;
  };

  useEffect(() => {
    if (!isFocused) return;

    const fetchSettingsAndCalculate = () => {
      fetchSettings(
        setSoberDate,
        setSoberSavings,
        setSmokeDate,
        setSmokeSavings,
      );

      const {
        years: soberYears,
        months: soberMonths,
        days: soberDays,
        hours: soberHours,
      } = breakdown(soberDate);
      const totalSoberSavings =
        daysSince(soberDate) * parseSavings(soberSavings);

      const {
        years: smokeYears,
        months: smokeMonths,
        days: smokeDays,
        hours: smokeHours,
      } = breakdown(smokeDate);
      const totalSmokeSavings =
        daysSince(smokeDate) * parseSavings(smokeSavings);

      setSmokeDate(smokeDate);
      setSoberYears(soberYears);
      setSoberMonths(soberMonths);
      setSoberDays(soberDays);
      setSoberHours(soberHours);
      setTotalSoberSavings(totalSoberSavings);
      setSmokeYears(smokeYears);
      setSmokeMonths(smokeMonths);
      setSmokeDays(smokeDays);
      setSmokeHours(smokeHours);
      setTotalSmokeSavings(totalSmokeSavings);
    };

    fetchSettingsAndCalculate();

    const interval = setInterval(fetchSettingsAndCalculate, 1000);
    return () => clearInterval(interval);
  }, [isFocused, smokeDate, smokeSavings, soberDate, soberSavings]);

  return (
    <View style={styles.pageWrapper}>
      <View style={{ gap: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <ThemedText type="title">
            {soberDate || smokeDate
              ? "Congratulations on your progress!"
              : "No data saved in settings"}
          </ThemedText>
        </View>
        {!(soberDate || smokeDate) && (
          <Link
            screen="settings"
            style={{ color: themes[colorScheme].colors.primary }}
            params={{}}
          >
            Go to settings
          </Link>
        )}
        {soberDate && (
          <Card>
            <Card.Title title="Alcohol free for" />
            <Card.Content>
              <View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: 10,
                    }}
                  >
                    {soberYears ? (
                      <View style={{ alignItems: "center" }}>
                        <ThemedText type="title">{soberYears}</ThemedText>
                        <ThemedText>years</ThemedText>
                      </View>
                    ) : null}
                    {soberMonths ? (
                      <View style={{ alignItems: "center" }}>
                        <ThemedText type="title">{soberMonths}</ThemedText>
                        <ThemedText>months</ThemedText>
                      </View>
                    ) : null}
                    {soberDays ? (
                      <View style={{ alignItems: "center" }}>
                        <ThemedText type="title">{soberDays}</ThemedText>
                        <ThemedText>days</ThemedText>
                      </View>
                    ) : null}
                    {soberHours ? (
                      <View style={{ alignItems: "center" }}>
                        <ThemedText type="title">{soberHours}</ThemedText>
                        <ThemedText>hours</ThemedText>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            </Card.Content>
            <Card.Actions>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <ThemedText style={{ marginInlineEnd: 5 }}>
                  {totalSoberSavings > 0
                    ? formatAmount(totalSoberSavings)
                    : null}
                </ThemedText>
              </View>
            </Card.Actions>
          </Card>
        )}

        {smokeDate && (
          <Card>
            <Card.Title title="Smoke free for" />
            <Card.Content>
              <View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: 10,
                    }}
                  >
                    {smokeYears ? (
                      <View style={{ alignItems: "center" }}>
                        <ThemedText type="title">{smokeYears}</ThemedText>
                        <ThemedText>years</ThemedText>
                      </View>
                    ) : null}
                    {smokeMonths ? (
                      <View style={{ alignItems: "center" }}>
                        <ThemedText type="title">{smokeMonths}</ThemedText>
                        <ThemedText>months</ThemedText>
                      </View>
                    ) : null}
                    {smokeDays ? (
                      <View style={{ alignItems: "center" }}>
                        <ThemedText type="title">{smokeDays}</ThemedText>
                        <ThemedText>days</ThemedText>
                      </View>
                    ) : null}
                    {smokeHours ? (
                      <View style={{ alignItems: "center" }}>
                        <ThemedText type="title">{smokeHours}</ThemedText>
                        <ThemedText>hours</ThemedText>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            </Card.Content>
            <Card.Actions>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <ThemedText style={{ marginInlineEnd: 5 }}>
                  {totalSmokeSavings > 0
                    ? formatAmount(totalSmokeSavings)
                    : null}
                </ThemedText>
              </View>
            </Card.Actions>
          </Card>
        )}
      </View>
      {totalSoberSavings + totalSmokeSavings > 0 ? (
        <Card
          mode="contained"
          style={{
            backgroundColor: themes[colorScheme].colors.primaryContainer,
          }}
        >
          <Card.Content>
            <View style={{ alignItems: "flex-end" }}>
              <ThemedText type="subtitle">Total savings</ThemedText>
              <ThemedText type="title">
                {formatAmount(totalSoberSavings + totalSmokeSavings)}
              </ThemedText>
            </View>
          </Card.Content>
        </Card>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    padding: 20,
    gap: 40,
    flexGrow: 1,
    justifyContent: "space-between",
  },
});
