import {Box, styled, Tab, Tabs} from "@mui/material";
import {ReactNode, useState} from "react";

export type TabComponent = {
  component: ReactNode;
  icon: ReactNode;
  label: String;
}

type TabPanelProps = {
  tabs: Array<TabComponent>;
}

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTab-root': {
    margin: "8px 5px 8px 5px",
    borderRadius: "6px",
    lineHeight: 0,
    minHeight: "unset",
    padding: "16px",
    color: "grey",
    fontWeight: 700,
  },
  '& .MuiTab-root.Mui-selected': {
    backgroundColor: "#ff7100",
    fontWeight: 700,
    color: "white"
  }
}));

const TabsPanel = ({ tabs } : TabPanelProps) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleChange = (event, newValue : number) => {
    setCurrentTabIndex(newValue);
  };

  return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ paddingBottom: 2, borderColor: "divider" }}>
          <StyledTabs
              value={currentTabIndex}
              onChange={handleChange}
              textColor='primary'
              centered
          >
            {tabs.map(({ label, icon }, i) => (
                <Tab label={label} key={i} icon={icon} iconPosition={"end"}></Tab>
            ))}
          </StyledTabs>
        </Box>
        {tabs[currentTabIndex].component}
      </Box>
  );
}

export default TabsPanel;