// CommonAccordion.js
import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  border: "1px solid rgba(53, 70, 171, 0.30)",
  borderRadius: 5,
  marginTop: 0,
  marginBottom: 20,
  "&:before": {
    content: "normal",
  },
  "&.Mui-expanded": {
    marginTop: 0,
    marginBottom: 20,
  },
  "& .MuiAccordionSummary-root": {
    minHeight: "auto",
    backgroundColor: "transparent",
    padding: "15px 20px",
    borderRadius: 6,
    border: 0,
    "&.Mui-expanded": {
      minHeight: "auto",
      backgroundColor: "transparent",
    },
    "& .MuiAccordionSummary-content": {
      margin: 0,
      "& .MuiTypography-root": {
        color: theme.palette.primary.dark,
        fontWeight: 600,
      },
      "&.Mui-expanded": {
        margin: 0,
      },
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      "& svg": {
        color: theme.palette.primary.dark,
      },
    },
  },
}));

const FYAccordion = ({ defaultOpen = false, title, onExpand, children }) => {
  const [expanded, setExpanded] = useState(defaultOpen || false);
  useEffect(() => {
    if (expanded) {
      onExpand && onExpand();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  const handleToggleExpand = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <StyledAccordion
      expanded={expanded}
      onChange={handleToggleExpand}
      // {...props}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{children}</Typography>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default FYAccordion;
