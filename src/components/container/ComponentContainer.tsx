import { Box, Paper, Stack } from "@mui/material";
import { ReactNode } from "react";
import { paddingSmall, paperElevation, spacingMedium } from "../../utils/format";

interface ComponentContainerv1Props {
  isSmall?: boolean;
  isVerySmall?: boolean;
  children: ReactNode;
}
export default function ComponentContainerv1(props: ComponentContainerv1Props) {
  const {
    isSmall = false,
    isVerySmall = false,
    children
  } = props;

  return (
    <Paper
      elevation={paperElevation}
      sx={{ 
        padding: paddingSmall, 
        minWidth: 500,
        minHeight: 500,
      }}
    >
      {children}
    </Paper>
  )
}

const componentSpacing = spacingMedium;

interface ComponentContainerProps {
  sx?: any;
  children: ReactNode;
}
export function ComponentContainer(props: ComponentContainerProps) {
  const {
    sx,
    children
  } = props;

  return (
    <Paper
      elevation={paperElevation}
      sx={{ 
        padding: paddingSmall,
      }}
    >
      <Stack spacing={componentSpacing} sx={sx}>
        {children}
      </Stack>
    </Paper>
  )
}

interface ComponentHeaderProps {
  children: ReactNode;
}
export function ComponentHeader(props: ComponentHeaderProps) {
  const {
    children
  } = props;

  return (
    <Stack 
      direction='row' 
      justifyContent='space-between'
      alignItems='center'
      height={50}
    >
      {children}
    </Stack>
  )
}

interface ComponentInfoProps {
  children: ReactNode;
}
export function ComponentInfo(props: ComponentInfoProps) {
  const {
    children
  } = props;

  return (
    <Stack 
      direction='row' 
      spacing={spacingMedium}
      height={30}
    >
      {children}
    </Stack>
  )
}

interface ComponentChartProps {
  children: ReactNode;
}
export function ComponentChart(props: ComponentChartProps) {
  const {
    children
  } = props;

  return (
    <Box 
      height={500}
    >
      {children}
    </Box>
  )
}

interface ComponentBarProps {
  children: ReactNode;
}
export function ComponentBar(props: ComponentBarProps) {
  const {
    children
  } = props;

  return (
    <Box 
      height={50}
      width='100%'
      alignItems='center'
    >
      {children}
    </Box>
  )
}

interface ComponentListProps {
  height: number;
  children: ReactNode;
}
export function ComponentList(props: ComponentListProps) {
  const {
    height,
    children
  } = props;

  return (
    <Box sx={{height: height, overflow: 'auto'}}>
      {children}
    </Box>
  )
}
