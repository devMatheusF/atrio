"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { colors } from "@/app/theme/tokens/colors";
import { spacing } from "@/app/theme/tokens/spacing";
import { shadows } from "@/app/theme/tokens/shadows";
import { radius } from "@/app/theme/tokens/radius";

type SidebarItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  match: (pathname: string) => boolean;
};

const DRAWER_WIDTH = 260;

export function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const items: SidebarItem[] = useMemo(
    () => [
      {
        label: "Painel do Evento",
        href: "/dashboard/painel-do-evento",
        icon: <EventAvailableOutlinedIcon fontSize="small" />,
        match: (path) => path.startsWith("/dashboard/painel-do-evento"),
      },
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: <DashboardOutlinedIcon fontSize="small" />,
        match: (path) => path === "/dashboard",
      },
      {
        label: "Ingressos",
        href: "/dashboard/ingressos",
        icon: <ConfirmationNumberOutlinedIcon fontSize="small" />,
        match: (path) => path.startsWith("/dashboard/ingressos"),
      },
      {
        label: "Divulgue",
        href: "/dashboard/divulgue",
        icon: <CampaignOutlinedIcon fontSize="small" />,
        match: (path) => path.startsWith("/dashboard/divulgue"),
      },
      {
        label: "Participantes",
        href: "/dashboard/participantes",
        icon: <PeopleAltOutlinedIcon fontSize="small" />,
        match: (path) => path.startsWith("/dashboard/participantes"),
      },
      {
        label: "Check-in",
        href: "/dashboard/check-in",
        icon: <FactCheckOutlinedIcon fontSize="small" />,
        match: (path) => path.startsWith("/dashboard/check-in"),
      },
      {
        label: "Financeiro",
        href: "/dashboard/financeiro",
        icon: <PaymentsOutlinedIcon fontSize="small" />,
        match: (path) => path.startsWith("/dashboard/financeiro"),
      },
      {
        label: "Ajuda",
        href: "/dashboard/ajuda",
        icon: <HelpOutlineOutlinedIcon fontSize="small" />,
        match: (path) => path.startsWith("/dashboard/ajuda"),
      },
    ],
    []
  );

  const drawerContent = (
    <Box sx={{ height: "100%", bgcolor: colors.background.surface }}>
      <Box sx={{ px: spacing.md, py: spacing.md }}>
        <Typography variant="subtitle2" sx={{ color: colors.text.secondary }}>
          Navegação
        </Typography>
      </Box>
      <Divider />
      <nav aria-label="Navegação do dashboard">
        <List sx={{ px: spacing.sm, py: spacing.sm }}>
          {items.map((item) => {
            const active = item.match(pathname);
            return (
              <ListItemButton
                key={item.label}
                component={Link}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                aria-current={active ? "page" : undefined}
                sx={{
                  borderRadius: radius.md,
                  mb: 0.5,
                  gap: 1,
                  ...(active
                    ? {
                        bgcolor: colors.primary[100],
                        boxShadow: `inset 3px 0 0 ${colors.primary[500]}`,
                        "&:hover": { bgcolor: colors.primary[100] },
                      }
                    : {
                        "&:hover": { bgcolor: colors.background.default },
                      }),
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: colors.text.secondary }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ sx: { fontWeight: 600, color: colors.text.primary } }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </nav>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: colors.background.default }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: colors.background.surface,
          color: colors.text.primary,
          borderBottom: `1px solid ${colors.neutral[300]}`,
        }}
        component="header"
      >
        <Toolbar sx={{ gap: 1.5 }}>
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)} aria-label="Abrir menu">
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            component={Link}
            href="/dashboard"
            sx={{
              textDecoration: "none",
              color: colors.text.primary,
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Sympla
          </Typography>

          <Typography
            component={Link}
            href="/dashboard"
            sx={{
              textDecoration: "none",
              color: colors.text.secondary,
              fontWeight: 500,
              display: { xs: "none", md: "inline" },
            }}
          >
            Área do produtor
          </Typography>

          <Box sx={{ flex: 1 }} />

          <Box
            component="button"
            type="button"
            aria-label="Menu do usuário"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              border: `1px solid ${colors.neutral[300]}`,
              bgcolor: colors.background.surface,
              borderRadius: radius.pill,
              px: spacing.sm,
              py: 0.5,
              cursor: "pointer",
            }}
          >
            <Avatar
              sx={{
                width: 28,
                height: 28,
                bgcolor: colors.primary[100],
                color: colors.text.primary,
                fontSize: "0.8rem",
                fontWeight: 800,
              }}
            >
              MS
            </Avatar>
            <ExpandMoreIcon fontSize="small" />
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex" }}>
        {!isMobile && (
          <Box
            component="aside"
            aria-label="Sidebar do dashboard"
            sx={{
              width: DRAWER_WIDTH,
              flexShrink: 0,
              borderRight: `1px solid ${colors.neutral[300]}`,
              bgcolor: colors.background.surface,
              minHeight: "calc(100vh - 64px)",
              position: "sticky",
              top: 64,
            }}
          >
            {drawerContent}
          </Box>
        )}

        <Box
          component="main"
          sx={{
            flex: 1,
            px: { xs: spacing.md, md: spacing.lg },
            py: spacing.lg,
          }}
        >
          {children}
        </Box>
      </Box>

      <Drawer
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: DRAWER_WIDTH,
            boxShadow: shadows.card,
            bgcolor: colors.background.surface,
          },
        }}
        aria-label="Menu lateral"
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
