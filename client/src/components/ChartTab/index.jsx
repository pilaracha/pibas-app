import { Tabs, Tab, Card, Button, Divider, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import Box from "@mui/material/Box";
import { useStyles } from "./styles";
import CloseIcon from "@mui/icons-material/Close";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {
        value === index &&
          children
      }
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ChartTab = ({ charts, handleNewTab, handleDeleteTab, handleSave }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{ indicator: classes.indicator }}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {charts &&
            charts.map((tab, index) => {
              return (
                <Tab
                  key={index}
                  icon={
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue(0);
                        handleDeleteTab(index);
                      }}
                    >
                      <CloseIcon fontSize="small" />{" "}
                    </IconButton>
                  }
                  iconPosition="end"
                  label={`Gráfico ${index + 1}`}
                  wrapped
                  classes={{
                    root: classes.itemRoot,
                    selected: classes.itemSelected,
                    wrapper: classes.itemWrapper,
                  }}
                  {...a11yProps(index)}
                />
              );
            })}
          <Tab icon={<AddIcon fontSize="small" />} onClick={handleNewTab} />
        </Tabs>
      </Box>
      <Card classes={{ root: classes.cardRoot }}>
        {charts &&
          charts.map((chart, index) => (
            <TabPanel key={index} value={value} index={index}>
              {chart}
            </TabPanel>
          ))}
        <Divider />
        <div className={classes.buttonsContainer}>
          <div className={classes.buttonsElement}>
            <Button variant="outlined"> Cancelar</Button>
          </div>
          <div className={classes.buttonsElement}>
            <Button variant="contained" onClick={handleSave}>
              Guardar
            </Button>
          </div>
        </div>
      </Card>
    </Box>
  );
};

export default ChartTab;
