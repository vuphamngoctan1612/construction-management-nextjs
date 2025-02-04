"use client";

import dairyApi from "@/apis/dairy";
import { CustomTabPanel } from "@/components/TabPanel";
import FilterDiary from "@/components/diary/list/FilterDiary";
import ListDiaries from "@/components/diary/list/ListDiaries";
import ListDiaryCurrent from "@/components/diary/list/ListDiaryCurrent";
import ListDiaryOther from "@/components/diary/list/ListDiaryOther";
import ListDiaryReview from "@/components/diary/list/ListDiaryReview";
import PageNumber from "@/components/diary/list/PageNumber";
import IDiary from "@/models/Diary";

import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ListDiaryTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className=" bg-[#F5F5F5]" sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Gần đây" {...a11yProps(0)} />
          <Tab label="Chờ đối chứng/duyệt" {...a11yProps(1)} />
          <Tab label="Khác" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ListDiaryCurrent />
        <PageNumber />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ListDiaryReview />
        <PageNumber />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ListDiaryOther />
        <PageNumber />
      </CustomTabPanel>
    </Box>
  );
}
