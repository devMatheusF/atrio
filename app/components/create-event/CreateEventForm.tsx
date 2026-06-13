"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import ImageIcon from "@mui/icons-material/Image";
import { Controller, FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateEventFormValues,
  CreateTicketInput,
  createEventSchema,
  eventCategories,
} from "@/app/shared/validation/events/createEventSchema";
import { colors } from "@/app/theme/tokens/colors";
import { shadows } from "@/app/theme/tokens/shadows";
import { spacing } from "@/app/theme/tokens/spacing";
import { radius } from "@/app/theme/tokens/radius";

type CreateEventFormProps = {
  initialEventType: "presencial" | "online";
};

type TicketFormValues = {
  title: string;
  quantity: number;
  netValue: number;
  salePeriodType: "date" | "batch";
  saleStartDate: string;
  saleStartTime: string;
  saleEndDate: string;
  saleEndTime: string;
  minPerPurchase: number;
  maxPerPurchase: number;
  createHalfPrice: boolean;
};

const cityOptions = [
  { city: "São Paulo", state: "SP" },
  { city: "Rio de Janeiro", state: "RJ" },
  { city: "Belo Horizonte", state: "MG" },
  { city: "Curitiba", state: "PR" },
  { city: "Porto Alegre", state: "RS" },
  { city: "Recife", state: "PE" },
  { city: "Fortaleza", state: "CE" },
  { city: "Brasília", state: "DF" },
];

const FORM_ID = "create-event-form";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: spacing.xs,
        flexDirection: "column",
        p: spacing.sm,
        borderRadius: radius.xs,
        bgcolor: colors.background.surface,
        boxShadow: shadows.card,
        border: `1px solid ${colors.primary[100]}`,
      }}
    >
      <Stack>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </Stack>
      {children}
    </Box>
  );
}

function BannerUploader({
  value,
  onFileSelected,
  error,
}: {
  value?: File;
  onFileSelected: (file: File) => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelected(file);
    }
  };

  return (
    <>
      <Box
        sx={{
          border: `1px dashed ${error ? colors.feedback.error : colors.primary[300]}`,
          borderRadius: spacing.sm,
          p: spacing.md,
          display: "flex",
          flexDirection: "column",
          gap: spacing.sm,
          bgcolor: colors.background.surface,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button variant="contained" onClick={() => inputRef.current?.click()}>
            Enviar imagem de divulgação
          </Button>
          {value && (
            <Chip label={value.name} color="primary" variant="outlined" sx={{ maxWidth: 240 }} />
          )}
        </Stack>      
        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          style={{ display: "none" }}
          onChange={handleChange}
        />
      </Box>
      <Stack>
        <Typography variant="body2" color="text.secondary">
          Dimensão recomendada: 1600x838.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Formato JPEG ou PNG (máximo 2MB).
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Imagens com dimensões diferentes serão
          redimensionadas.
        </Typography>
      </Stack>
    </>    
  );
}

function RichTextEditor({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const runCommand = (command: string, valueArg?: string) => {
    document.execCommand(command, false, valueArg);
    editorRef.current?.focus();
    onChange(editorRef.current?.innerHTML ?? "");
  };

  const handleInput = () => {
    const content = editorRef.current?.innerHTML ?? "";
    onChange(content);
  };

  const handleLink = () => {
    const url = window.prompt("Informe a URL:");
    if (url) {
      runCommand("createLink", url);
    }
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      runCommand("insertImage", reader.result as string);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <Box>
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        alignItems="center"
        sx={{
          mb: spacing.sm,
          border: `1px solid ${colors.primary[100]}`,
          borderRadius: spacing.sm,
          p: spacing.xs,
          bgcolor: colors.background.surface,
        }}
      >
        <IconButton size="small" onClick={() => runCommand("bold")} aria-label="Negrito">
          <FormatBoldIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => runCommand("italic")} aria-label="Itálico">
          <FormatItalicIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => runCommand("underline")} aria-label="Sublinhado">
          <FormatUnderlinedIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => runCommand("insertUnorderedList")} aria-label="Lista">
          <FormatListBulletedIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => runCommand("insertOrderedList")} aria-label="Lista numerada">
          <FormatListNumberedIcon fontSize="small" />
        </IconButton>
        <TextField
          select
          size="small"
          variant="outlined"
          label="Fonte"
          defaultValue="3"
          onChange={(e) => runCommand("fontSize", e.target.value)}
          sx={{ width: 120 }}
        >
          <MenuItem value="2">Pequena</MenuItem>
          <MenuItem value="3">Normal</MenuItem>
          <MenuItem value="4">Grande</MenuItem>
        </TextField>
        <TextField
          select
          size="small"
          variant="outlined"
          label="Parágrafo"
          defaultValue="P"
          onChange={(e) => runCommand("formatBlock", e.target.value)}
          sx={{ width: 140 }}
        >
          <MenuItem value="P">Parágrafo</MenuItem>
          <MenuItem value="H2">Título 2</MenuItem>
          <MenuItem value="H3">Título 3</MenuItem>
        </TextField>
        <TextField
          size="small"
          type="color"
          label="Cor"
          defaultValue="#111111"
          onChange={(e) => runCommand("foreColor", e.target.value)}
          sx={{ width: 120 }}
          InputLabelProps={{ shrink: true }}
        />
        <IconButton size="small" onClick={handleLink} aria-label="Inserir link">
          <InsertLinkIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Inserir imagem"
        >
          <ImageIcon fontSize="small" />
        </IconButton>
        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleImage} />
      </Stack>
      <Box
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        suppressContentEditableWarning
        sx={{
          minHeight: 220,
          border: `1px solid ${error ? colors.feedback.error : colors.primary[100]}`,
          borderRadius: spacing.sm,
          p: spacing.md,
          bgcolor: colors.background.surface,
          "&:focus": {
            outline: `2px solid ${colors.primary[300]}`,
          },
        }}
      />
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
}

function EmptyTicketsState({ onCreate }: { onCreate: () => void }) {
  return (
    <Box
      sx={{
        p: spacing.lg,
        borderRadius: spacing.md,
        border: `1px dashed ${colors.primary[300]}`,
        textAlign: "center",
        bgcolor: colors.background.surface,
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: spacing.sm }}>
        Que tipo de ingresso você deseja criar?
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: spacing.md }}>
        Escolha entre ingresso pago ou gratuito para começar.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
        <Button variant="contained" onClick={onCreate}>
          Ingresso pago
        </Button>
        <Button variant="outlined" onClick={onCreate}>
          Ingresso gratuito
        </Button>
      </Stack>
    </Box>
  );
}

function TicketModal({
  open,
  onClose,
  onCreate,
  canUseBatch,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (ticket: CreateTicketInput) => void;
  canUseBatch: boolean;
}) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm<TicketFormValues>({
    defaultValues: {
      title: "",
      quantity: 1,
      netValue: 0,
      salePeriodType: "date",
      saleStartDate: "",
      saleStartTime: "",
      saleEndDate: "",
      saleEndTime: "",
      minPerPurchase: 1,
      maxPerPurchase: 10,
      createHalfPrice: false,
    },
  });

  const netValue = watch("netValue") || 0;
  const buyerValue = useMemo(() => (netValue > 0 ? +(netValue * 1.1).toFixed(2) : 0), [netValue]);
  const createHalfPrice = watch("createHalfPrice");

  const submit = (values: TicketFormValues) => {
    if (values.minPerPurchase > values.maxPerPurchase) {
      setError("maxPerPurchase", { message: "Máximo deve ser maior ou igual ao mínimo." });
      return;
    }
    const ticket: CreateTicketInput = {
      title: values.title,
      quantity: values.quantity,
      netValue: values.netValue,
      buyerValue,
      salePeriodType: values.salePeriodType,
      saleStartDate: values.saleStartDate,
      saleStartTime: values.saleStartTime,
      saleEndDate: values.saleEndDate,
      saleEndTime: values.saleEndTime,
      minPerPurchase: values.minPerPurchase,
      maxPerPurchase: values.maxPerPurchase,
      hasHalfPrice: values.createHalfPrice,
      halfPriceValue: values.createHalfPrice ? values.netValue / 2 : null,
      halfPriceQuantity: values.createHalfPrice ? values.quantity : null,
    };
    onCreate(ticket);
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Configurar ingresso</DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(4, minmax(0, 1fr))" },
            gap: spacing.md,
          }}
        >
          <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 2" } }}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Informe o título." }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Título do ingresso"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Box>

          <Controller
            name="quantity"
            control={control}
            rules={{ required: "Informe a quantidade." }}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                fullWidth
                label="Quantidade"
                inputProps={{ min: 1 }}
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
              />
            )}
          />
          <Controller
            name="netValue"
            control={control}
            rules={{ required: "Informe o valor a receber." }}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                fullWidth
                label="Valor a receber"
                InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
                inputProps={{ min: 0, step: 0.01 }}
                error={!!errors.netValue}
                helperText={errors.netValue?.message}
              />
            )}
          />
          <TextField
            fullWidth
            label="Valor do comprador"
            value={buyerValue > 0 ? buyerValue.toFixed(2) : ""}
            InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment>, readOnly: true }}
            helperText="Valor a receber + 10%"
          />

          <Box sx={{ gridColumn: "1 / -1" }}>
            <FormControlLabel
              control={
                <Controller
                  name="createHalfPrice"
                  control={control}
                  render={({ field }) => <Checkbox {...field} checked={!!field.value} />}
                />
              }
              label="Criar meia-entrada para este ingresso"
            />
          </Box>

          {createHalfPrice && (
            <Box sx={{ gridColumn: "1 / -1" }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="Ingresso (meia-entrada)"
                  value="Ingresso (meia-entrada)"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Quantidade"
                  value={watch("quantity")}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Valor"
                  value={(watch("netValue") / 2 || 0).toFixed(2)}
                  InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
                />
              </Stack>
            </Box>
          )}

          <Box sx={{ gridColumn: "1 / -1" }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Período das vendas deste ingresso</FormLabel>
              <Controller
                name="salePeriodType"
                control={control}
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel value="date" control={<Radio />} label="Por data" />
                    <FormControlLabel
                      value="batch"
                      control={<Radio />}
                      label="Por lote"
                      disabled={!canUseBatch}
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Box>

          <Controller
            name="saleStartDate"
            control={control}
            rules={{ required: "Informe a data de início das vendas." }}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                fullWidth
                label="Data de início das vendas"
                InputLabelProps={{ shrink: true }}
                error={!!errors.saleStartDate}
                helperText={errors.saleStartDate?.message}
              />
            )}
          />
          <Controller
            name="saleStartTime"
            control={control}
            rules={{ required: "Informe a hora de início das vendas." }}
            render={({ field }) => (
              <TextField
                {...field}
                type="time"
                fullWidth
                label="Hora de início"
                InputLabelProps={{ shrink: true }}
                error={!!errors.saleStartTime}
                helperText={errors.saleStartTime?.message}
              />
            )}
          />
          <Controller
            name="saleEndDate"
            control={control}
            rules={{ required: "Informe a data de término das vendas." }}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                fullWidth
                label="Data de término das vendas"
                InputLabelProps={{ shrink: true }}
                error={!!errors.saleEndDate}
                helperText={errors.saleEndDate?.message}
              />
            )}
          />
          <Controller
            name="saleEndTime"
            control={control}
            rules={{ required: "Informe a hora de término das vendas." }}
            render={({ field }) => (
              <TextField
                {...field}
                type="time"
                fullWidth
                label="Hora de término"
                InputLabelProps={{ shrink: true }}
                error={!!errors.saleEndTime}
                helperText={errors.saleEndTime?.message}
              />
            )}
          />

          <Controller
            name="minPerPurchase"
            control={control}
            rules={{ required: "Informe o mínimo por compra." }}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                fullWidth
                label="Quantidade mínima por compra"
                inputProps={{ min: 1 }}
                error={!!errors.minPerPurchase}
                helperText={errors.minPerPurchase?.message}
              />
            )}
          />
          <Controller
            name="maxPerPurchase"
            control={control}
            rules={{ required: "Informe o máximo por compra." }}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                fullWidth
                label="Quantidade máxima por compra"
                inputProps={{ min: 1 }}
                error={!!errors.maxPerPurchase}
                helperText={errors.maxPerPurchase?.message}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleSubmit(submit)} variant="contained">
          Criar ingresso
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function PublishBar({
  isSubmitting,
  isValid,
}: {
  isSubmitting: boolean;
  isValid: boolean;
}) {
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: colors.background.surface,
        borderTop: `1px solid ${colors.primary[100]}`,
        boxShadow: shadows.card,
        px: spacing.xs,
        py: spacing.sm,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="large"
          disabled={!isValid || isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Publicando..." : "Publicar evento"}
        </Button>
      </Container>
    </Box>
  );
}

export function CreateEventForm({ initialEventType }: CreateEventFormProps) {
  const [isTicketModalOpen, setTicketModalOpen] = useState(false);
  const formMethods = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
    mode: "onChange",
    defaultValues: {
      eventType: initialEventType,
      name: "",
      banner: undefined,
      category: eventCategories[0],
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      description: "",
      venue: "",
      city: "",
      state: "",
      isVenueToBeDefined: false,
      tickets: [],
      termsAccepted: false,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue,
  } = formMethods;

  const tickets = watch("tickets");
  const isVenueToBeDefined = watch("isVenueToBeDefined");

  useEffect(() => {
    setValue("eventType", initialEventType, { shouldValidate: true });
  }, [initialEventType, setValue]);

  const handleAddTicket = useCallback(
    (ticket: CreateTicketInput) => {
      const nextTickets = [...tickets, ticket];
      setValue("tickets", nextTickets, { shouldValidate: true });
    },
    [tickets, setValue]
  );

  const producerInfo = useMemo(
    () => ({
      name: "Nome do produtor",
      description: "Descrição do produtor ou ministério (puxar do perfil do usuário).",
    }),
    []
  );

  const onSubmit: SubmitHandler<CreateEventFormValues> = async (data: CreateEventFormValues) => {
    // TODO: integrar com service de criação de evento
    console.log("Evento pronto para publicação", data);
  };

  return (
    <FormProvider {...formMethods}>
      <Container sx={{ py: spacing.xs }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: spacing.xs, color: colors.text.primary }}>
          Criar evento ({initialEventType})
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          id={FORM_ID}
          sx={{ display: "flex", flexDirection: "column", gap: spacing.xs, pb: spacing["2xl"] }}
        >
          <Section title="Informações básicas" description="Comece apresentando seu evento.">
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: spacing.xs,
              }}
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nome do evento"
                    placeholder="Ex.: Conferência Jovem 2025"
                    inputProps={{ maxLength: 100 }}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />

              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextField
                      {...field}
                      select
                      label="Categoria"
                      placeholder="Selecione"
                      error={!!errors.category}
                      helperText={errors.category?.message ?? "Classifique seu evento"}
                    >
                      {eventCategories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                )}
              />

              <Box sx={{ gridColumn: "1 / -1" }}>
                <Controller
                  name="banner"
                  control={control}
                  render={({ field }) => (
                    <BannerUploader
                      onFileSelected={(file) => field.onChange(file)}
                      error={errors.banner?.message}
                      value={field.value}
                    />
                  )}
                />
              </Box>
            </Box>
          </Section>

          <Section title="Data e horário">
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
                gap: spacing.md,
              }}
            >
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="date"
                    label="Data de início"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.startDate}
                    helperText={errors.startDate?.message}
                  />
                )}
              />
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="time"
                    label="Hora de início"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.startTime}
                    helperText={errors.startTime?.message}
                  />
                )}
              />
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="date"
                    label="Data de término"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.endDate}
                    helperText={errors.endDate?.message}
                  />
                )}
              />
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="time"
                    label="Hora de término"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.endTime}
                    helperText={errors.endTime?.message}
                  />
                )}
              />
            </Box>
          </Section>

          <Section title="Descrição do evento">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <RichTextEditor value={field.value} onChange={field.onChange} error={errors.description?.message} />
              )}
            />
          </Section>

          <Section title="Onde o seu evento vai acontecer?">
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
                gap: spacing.md,
              }}
            >
              <Box sx={{ gridColumn: "1 / -1" }}>
                <Controller
                  name="isVenueToBeDefined"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            field.onChange(checked);
                            if (checked) {
                              setValue("venue", "");
                              setValue("city", "");
                              setValue("state", "");
                            }
                          }}
                        />
                      }
                      label="Ainda será definido"
                    />
                  )}
                />
              </Box>

              <Controller
                name="venue"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Local"
                    placeholder="Ex.: Igreja Central"
                    disabled={isVenueToBeDefined}
                    error={!!errors.venue}
                    helperText={errors.venue?.message}
                  />
                )}
              />

              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    fullWidth
                    freeSolo
                    options={cityOptions.map((opt) => `${opt.city} - ${opt.state}`)}
                    onChange={(_, value) => {
                      if (typeof value === "string") {
                        const [city, uf] = value.split("-").map((part) => part.trim());
                        field.onChange(city ?? "");
                        setValue("state", uf ?? "");
                        return;
                      }
                      field.onChange("");
                      setValue("state", "");
                    }}
                    inputValue={field.value}
                    onInputChange={(_, newInput) => {
                      const [city, uf] = newInput.split("-").map((part) => part.trim());
                      field.onChange(city ?? newInput);
                      if (uf) {
                        setValue("state", uf);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Cidade"
                        placeholder="Selecione ou digite"
                        disabled={isVenueToBeDefined}
                        error={!!errors.city}
                        helperText={errors.city?.message}
                      />
                    )}
                  />
                )}
              />

              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Estado"
                    placeholder="Ex.: SP"
                    disabled={isVenueToBeDefined}
                    error={!!errors.state}
                    helperText={errors.state?.message}
                  />
                )}
              />
            </Box>
          </Section>

          <Section title="Ingressos">
            {tickets.length === 0 ? (
              <EmptyTicketsState onCreate={() => setTicketModalOpen(true)} />
            ) : (
              <Stack spacing={2}>
                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Ingressos criados
                  </Typography>
                  <Button variant="outlined" onClick={() => setTicketModalOpen(true)}>
                    Adicionar ingresso
                  </Button>
                </Stack>
                <List>
                  {tickets.map((ticket, index) => (
                    <ListItem
                      key={`${ticket.title}-${index}`}
                      sx={{
                        border: `1px solid ${colors.primary[100]}`,
                        borderRadius: spacing.sm,
                        mb: 1,
                        boxShadow: shadows.card,
                      }}
                      secondaryAction={
                        <Chip
                          label={`Qtd: ${ticket.quantity}`}
                          color="primary"
                          variant="outlined"
                          sx={{ bgcolor: colors.primary[100] }}
                        />
                      }
                    >
                      <ListItemText
                        primary={ticket.title}
                        secondary={`Vendas até ${ticket.saleEndDate} ${ticket.saleEndTime}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Stack>
            )}
          </Section>

          <Section title="Dados do produtor">
            <Box
              sx={{
                p: spacing.md,
                borderRadius: spacing.sm,
                bgcolor: colors.background.surface,
                border: `1px solid ${colors.primary[100]}`,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {producerInfo.name}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                {producerInfo.description}
              </Typography>
            </Box>
          </Section>

          <Section title="Responsabilidades">
            <Controller
              name="termsAccepted"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={!!field.value} />}
                  label="Eu li e concordo com os termos de responsabilidade do evento."
                />
              )}
            />
            {errors.termsAccepted && (
              <Typography variant="caption" color="error">
                {errors.termsAccepted.message}
              </Typography>
            )}
          </Section>

          <PublishBar isSubmitting={isSubmitting} isValid={isValid && tickets.length > 0} />
        </Box>
      </Container>

      <TicketModal
        open={isTicketModalOpen}
        onClose={() => setTicketModalOpen(false)}
        onCreate={(ticket) => {
          handleAddTicket(ticket);
          setTicketModalOpen(false);
        }}
        canUseBatch={tickets.length > 0}
      />
    </FormProvider>
  );
}