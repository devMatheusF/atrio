"use client";

import { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Link as MuiLink,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { colors } from "../../theme/tokens/colors";
import { shadows } from "../../theme/tokens/shadows";

type FieldName = "email" | "password";

export function LoginFormSection() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const handleChange = (field: FieldName) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          boxShadow: shadows.card,
          maxWidth: 640,
          mx: "auto",
          bgcolor: colors.background.surface,
        }}
      >
        <Typography fontWeight={700} fontSize="1.4rem" mb={1.5}>
          Acesse sua conta Atrium
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Continue conectado para gerenciar vendas e acompanhar seus eventos.
        </Typography>

        <Stack spacing={2.5}>
          <TextField
            label="E-mail"
            type="email"
            value={formValues.email}
            onChange={handleChange("email")}
            fullWidth
          />
          <TextField
            label="Senha"
            type="password"
            value={formValues.password}
            onChange={handleChange("password")}
            fullWidth
          />
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: colors.primary[500],
              color: colors.text.onPrimary,
              textTransform: "none",
              borderRadius: 999,
              fontWeight: 600,
              "&:hover": { bgcolor: colors.primary[700] },
            }}
          >
            Entrar na plataforma
          </Button>
          <Button
            variant="text"
            size="large"
            sx={{
              textTransform: "none",
              color: colors.primary[700],
              fontWeight: 600,
            }}
          >
            Quero me registrar
          </Button>
        </Stack>

        <Divider sx={{ my: 4 }}>ou</Divider>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          sx={{
            textTransform: "none",
            borderRadius: 999,
            borderColor: colors.neutral[300],
            color: colors.neutral[800],
            fontWeight: 600,
            "&:hover": { borderColor: colors.primary[300], bgcolor: colors.primary[50] },
          }}
        >
          Entrar com SSO
        </Button>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Esqueceu a senha?{" "}
            <MuiLink
              href="#"
              underline="hover"
              sx={{ color: colors.primary[700], fontWeight: 600 }}
            >
              Recuperar acesso
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
