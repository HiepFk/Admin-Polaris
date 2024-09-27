import React from "react";
import { Page, Grid, LegacyCard, Button } from "@shopify/polaris";
import { CalendarIcon } from "@shopify/polaris-icons";
import BarChart from "../components/Dashboard/BarChart";
import LineChart from "../components/Dashboard/LineChart";
import DateRange from "../components/Dashboard/DatePicker";

function Dashboard() {
  return (
    <Page title="Dashboard" fullWidth>
      <DateRange />
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <LineChart />
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <BarChart />
        </Grid.Cell>
      </Grid>
    </Page>
  );
}

export default Dashboard;
