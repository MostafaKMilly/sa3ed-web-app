import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary as MuiAccordionSummary,
  styled,
  Typography,
  alpha,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ReactNode } from "react";

const Accordion = styled(MuiAccordion, {
  shouldForwardProp: (prop) => prop != "filled",
})<{ filled?: boolean }>(({ theme, filled }) => ({
  borderRadius: 16,
  backgroundColor: filled
    ? alpha(theme.palette.primary.light, 0.4)
    : "transparent",
  paddingRight: filled ? 24 : 0,
  paddingLeft: filled ? 24 : 0,
  paddingTop: 8,
  paddingBottom: 8,
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  justifyContent: "left",
  padding: 0,
  color: theme.palette.common.black,
  width: "fit-content",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    flexGrow: 0,
    marginRight: 9,
  },
  zIndex: 1,
}));

export const GenericAccordion = ({
  children,
  title,
  ...props
}: GenericAccordionProps) => {
  return (
    <Accordion
      defaultExpanded
      {...props}
      square
      disableGutters
      elevation={0}
      sx={{ ...props.sx, position: "relative" }}
    >
      <AccordionSummary
        expandIcon={
          <KeyboardArrowUpIcon
            sx={{ fontSize: "1.3rem", color: "common.black" }}
          />
        }
      >
        {props.icon}
        <Typography fontWeight={700} fontSize={16} color="common.black">
          {title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 0, mt: "26px" }}>{children}</AccordionDetails>
    </Accordion>
  );
};

export type GenericAccordionProps = Omit<
  AccordionProps,
  "square" | "disableGutters" | "elevation"
> & {
  filled?: boolean;
  title?: ReactNode;
  icon?: React.ReactElement;
  children: React.ReactNode;
};
