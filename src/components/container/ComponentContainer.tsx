import { Box, Paper, Stack } from "@mui/material";
import type { ReactNode } from "react";
import { paddingSmall, paperElevation, spacingMedium } from "../../utils/format";

const componentSpacing = spacingMedium;

interface ComponentProps {
  children: ReactNode;
  height?: number;
}

export function ComponentContainer(props: ComponentProps) {
  const {
    children
  } = props;

  return (
    <Paper
      elevation={paperElevation}
      sx={{ 
        padding: paddingSmall,
      }}
    >
      <Stack spacing={componentSpacing}>
        {children}
      </Stack>
    </Paper>
  )
}

export const headerVariant = "h5";

export function ComponentHeader(props: ComponentProps) {
  const {
    children
  } = props;

  return (
    <Stack 
      direction='row' 
      justifyContent='space-between'
      alignItems='center'
      height={30}
    >
      {children}
    </Stack>
  )
}

export function ComponentInfo(props: ComponentProps) {
  const {
    children
  } = props;

  return (
    <Stack 
      direction='row' 
      spacing={spacingMedium}
      height={25}
    >
      {children}
    </Stack>
  )
}

export function ComponentChart(props: ComponentProps) {
  const {
    children
  } = props;

  return (
    <Box 
      height={300}
    >
      {children}
    </Box>
  )
}

export function ComponentBar(props: ComponentProps) {
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

export function ComponentMeter(props: ComponentProps) {
  const {
    children
  } = props;

  return (
    <Box 
      height={100}
    >
      {children}
    </Box>
  )
}

interface ComponentListProps extends ComponentProps{
  height: number;
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
