import React from 'react';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Chip,
    Divider,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    List,
    ListItemButton,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';

import Iconify from '../../components/utils/Iconify';
import {
    CONTENT_FIELD_TYPES,
    createContentType,
    getContentType,
    listContentTypes,
    updateContentType
} from '../../api/contentTypes';
import ValidationFlowEditor from './ValidationFlowEditor';

const EMPTY_FIELD = {
    key: '',
    label: '',
    fieldType: 'TEXT',
    required: false,
    sortOrder: 0,
    fieldConfig: {},
    validationRules: []
};

function _emptyDraft() {
    return {
        id: null,
        key: '',
        name: '',
        description: '',
        validationFlowConfig: {},
        fields: [{ ...EMPTY_FIELD }]
    };
}

function _normalizeDraft(contentType) {
    return {
        id: contentType.id,
        key: contentType.key ?? '',
        name: contentType.name ?? '',
        description: contentType.description ?? '',
        validationFlowConfig: contentType.validationFlowConfig ?? {},
        fields: (contentType.fields ?? []).map((field, index) => ({
            id: field.id,
            key: field.key ?? '',
            label: field.label ?? '',
            fieldType: field.fieldType ?? 'TEXT',
            required: Boolean(field.required),
            sortOrder: typeof field.sortOrder === 'number' ? field.sortOrder : index,
            fieldConfig: field.fieldConfig ?? {},
            validationRules: field.validationRules ?? []
        }))
    };
}

function _toRequestPayload(draft, { isCreate }) {
    const fields = draft.fields.map((field, index) => ({
        key: field.key.trim(),
        label: field.label.trim(),
        fieldType: field.fieldType,
        required: field.required,
        sortOrder: typeof field.sortOrder === 'number' ? field.sortOrder : index,
        fieldConfig: field.fieldConfig ?? {},
        validationRules: field.validationRules ?? []
    }));

    const base = {
        name: draft.name.trim(),
        description: draft.description?.trim() || null,
        validationFlowConfig: draft.validationFlowConfig ?? {},
        fields
    };

    if (isCreate) {
        return { ...base, key: draft.key.trim() };
    }

    return base;
}

export default function ContentTypesPage() {
    const [items, setItems] = React.useState([]);
    const [selectedId, setSelectedId] = React.useState(null);
    const [draft, setDraft] = React.useState(_emptyDraft());
    const [isLoadingList, setIsLoadingList] = React.useState(false);
    const [isLoadingDetail, setIsLoadingDetail] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [successMessage, setSuccessMessage] = React.useState(null);
    const [fieldErrors, setFieldErrors] = React.useState({});

    const isCreateMode = selectedId === null;

    const loadList = React.useCallback(async () => {
        setIsLoadingList(true);
        try {
            const page = await listContentTypes({ page: 0, size: 50 });
            setItems(page?.content ?? []);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoadingList(false);
        }
    }, []);

    React.useEffect(() => {
        loadList();
    }, [loadList]);

    const handleSelect = async (id) => {
        setErrorMessage(null);
        setSuccessMessage(null);
        setFieldErrors({});

        if (id === null) {
            setSelectedId(null);
            setDraft(_emptyDraft());
            return;
        }

        setIsLoadingDetail(true);
        try {
            const contentType = await getContentType(id);
            setSelectedId(contentType.id);
            setDraft(_normalizeDraft(contentType));
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoadingDetail(false);
        }
    };

    const handleDraftChange = (patch) => {
        setDraft((current) => ({ ...current, ...patch }));
    };

    const handleFieldChange = (index, patch) => {
        setDraft((current) => {
            const nextFields = current.fields.map((field, fieldIndex) =>
                fieldIndex === index ? { ...field, ...patch } : field
            );
            return { ...current, fields: nextFields };
        });
    };

    const handleAddField = () => {
        setDraft((current) => {
            const nextSortOrder = current.fields.length
                ? Math.max(...current.fields.map((field) => field.sortOrder ?? 0)) + 1
                : 0;
            return {
                ...current,
                fields: [...current.fields, { ...EMPTY_FIELD, sortOrder: nextSortOrder }]
            };
        });
    };

    const handleRemoveField = (index) => {
        setDraft((current) => ({
            ...current,
            fields: current.fields.filter((_, fieldIndex) => fieldIndex !== index)
        }));
    };

    const handleMoveField = (index, direction) => {
        setDraft((current) => {
            const target = index + direction;
            if (target < 0 || target >= current.fields.length) {
                return current;
            }
            const nextFields = [...current.fields];
            [nextFields[index], nextFields[target]] = [nextFields[target], nextFields[index]];
            return {
                ...current,
                fields: nextFields.map((field, fieldIndex) => ({ ...field, sortOrder: fieldIndex }))
            };
        });
    };

    const handleSave = async () => {
        setErrorMessage(null);
        setSuccessMessage(null);
        setFieldErrors({});
        setIsSaving(true);

        try {
            const payload = _toRequestPayload(draft, { isCreate: isCreateMode });
            const saved = isCreateMode
                ? await createContentType(payload)
                : await updateContentType(selectedId, payload);

            setSelectedId(saved.id);
            setDraft(_normalizeDraft(saved));
            setSuccessMessage(isCreateMode ? 'Content type created' : 'Content type updated');
            await loadList();
        } catch (error) {
            setErrorMessage(error.message);
            if (error.details && typeof error.details === 'object') {
                setFieldErrors(error.details);
            }
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Stack spacing={2}>
            <Paper sx={{ p: 2.5, borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="h6">Content Types</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Define schemas, fields and a validation flow per content type.
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="outlined"
                            onClick={() => handleSelect(null)}
                            startIcon={<Iconify icon="solar:add-circle-outline" sx={{ width: 18, height: 18 }} />}
                        >
                            New
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            disabled={isSaving || isLoadingDetail}
                            startIcon={<Iconify icon="solar:diskette-outline" sx={{ width: 18, height: 18 }} />}
                        >
                            {isCreateMode ? 'Create' : 'Save'}
                        </Button>
                    </Stack>
                </Stack>
            </Paper>

            {errorMessage ? <Alert severity="error" onClose={() => setErrorMessage(null)}>{errorMessage}</Alert> : null}
            {successMessage ? <Alert severity="success" onClose={() => setSuccessMessage(null)}>{successMessage}</Alert> : null}

            <Box
                sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: { xs: '1fr', md: '300px 1fr' }
                }}
            >
                <Paper sx={{ p: 1.5, borderColor: 'divider', bgcolor: 'background.paper' }}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', px: 0.5, mb: 1 }}>
                        <Typography variant="overline" color="text.secondary">Existing</Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Tooltip title="Reload">
                            <IconButton size="small" onClick={loadList} disabled={isLoadingList}>
                                <Iconify icon="solar:refresh-outline" sx={{ width: 16, height: 16 }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Divider />
                    <List dense disablePadding sx={{ maxHeight: 520, overflowY: 'auto' }}>
                        {items.length === 0 && !isLoadingList ? (
                            <Box sx={{ p: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    No content types yet.
                                </Typography>
                            </Box>
                        ) : null}
                        {items.map((item) => (
                            <ListItemButton
                                key={item.id}
                                selected={item.id === selectedId}
                                onClick={() => handleSelect(item.id)}
                            >
                                <ListItemText
                                    primary={item.name}
                                    secondary={`${item.key} · ${item.fieldCount} fields`}
                                    primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                                    secondaryTypographyProps={{ variant: 'caption' }}
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </Paper>

                <Stack spacing={2}>
                    <Paper sx={{ p: 2.5, borderColor: 'divider', bgcolor: 'background.paper' }}>
                        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
                            <Typography variant="subtitle1">{isCreateMode ? 'New content type' : 'Edit content type'}</Typography>
                            {!isCreateMode ? <Chip size="small" label={draft.key} /> : null}
                        </Stack>

                        <Box
                            sx={{
                                display: 'grid',
                                gap: 2,
                                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }
                            }}
                        >
                            <TextField
                                label="Key"
                                value={draft.key}
                                disabled={!isCreateMode}
                                onChange={(event) => handleDraftChange({ key: event.target.value })}
                                helperText={fieldErrors.key || 'kebab-case, e.g. "blog-post"'}
                                error={Boolean(fieldErrors.key)}
                                size="small"
                                fullWidth
                            />
                            <TextField
                                label="Name"
                                value={draft.name}
                                onChange={(event) => handleDraftChange({ name: event.target.value })}
                                helperText={fieldErrors.name}
                                error={Boolean(fieldErrors.name)}
                                size="small"
                                fullWidth
                            />
                            <TextField
                                label="Description"
                                value={draft.description}
                                onChange={(event) => handleDraftChange({ description: event.target.value })}
                                helperText={fieldErrors.description}
                                error={Boolean(fieldErrors.description)}
                                size="small"
                                fullWidth
                                multiline
                                minRows={2}
                                sx={{ gridColumn: { md: '1 / span 2' } }}
                            />
                        </Box>
                    </Paper>

                    <Paper sx={{ p: 2.5, borderColor: 'divider', bgcolor: 'background.paper' }}>
                        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                            <Typography variant="subtitle1">Fields</Typography>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={handleAddField}
                                startIcon={<Iconify icon="solar:add-circle-outline" sx={{ width: 16, height: 16 }} />}
                            >
                                Add field
                            </Button>
                        </Stack>

                        <Stack spacing={1.5}>
                            {draft.fields.map((field, index) => (
                                <Paper
                                    key={index}
                                    variant="outlined"
                                    sx={{ p: 1.5, borderColor: 'divider', bgcolor: 'transparent' }}
                                >
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gap: 1.25,
                                            gridTemplateColumns: {
                                                xs: '1fr',
                                                md: '1.2fr 1.4fr 1fr 0.6fr auto'
                                            },
                                            alignItems: 'center'
                                        }}
                                    >
                                        <TextField
                                            label="Field key"
                                            value={field.key}
                                            onChange={(event) => handleFieldChange(index, { key: event.target.value })}
                                            size="small"
                                            fullWidth
                                        />
                                        <TextField
                                            label="Label"
                                            value={field.label}
                                            onChange={(event) => handleFieldChange(index, { label: event.target.value })}
                                            size="small"
                                            fullWidth
                                        />
                                        <FormControl size="small" fullWidth>
                                            <InputLabel id={`field-type-${index}`}>Type</InputLabel>
                                            <Select
                                                labelId={`field-type-${index}`}
                                                label="Type"
                                                value={field.fieldType}
                                                onChange={(event) => handleFieldChange(index, { fieldType: event.target.value })}
                                            >
                                                {CONTENT_FIELD_TYPES.map((type) => (
                                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    checked={field.required}
                                                    onChange={(event) => handleFieldChange(index, { required: event.target.checked })}
                                                />
                                            }
                                            label="Required"
                                        />
                                        <Stack direction="row" spacing={0.5}>
                                            <Tooltip title="Move up">
                                                <span>
                                                    <IconButton size="small" disabled={index === 0} onClick={() => handleMoveField(index, -1)}>
                                                        <Iconify icon="solar:arrow-up-outline" sx={{ width: 16, height: 16 }} />
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                            <Tooltip title="Move down">
                                                <span>
                                                    <IconButton
                                                        size="small"
                                                        disabled={index === draft.fields.length - 1}
                                                        onClick={() => handleMoveField(index, 1)}
                                                    >
                                                        <Iconify icon="solar:arrow-down-outline" sx={{ width: 16, height: 16 }} />
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                            <Tooltip title="Remove">
                                                <IconButton size="small" color="error" onClick={() => handleRemoveField(index)}>
                                                    <Iconify icon="solar:trash-bin-trash-outline" sx={{ width: 16, height: 16 }} />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </Box>
                                </Paper>
                            ))}
                            {draft.fields.length === 0 ? (
                                <Typography variant="body2" color="text.secondary">
                                    No fields yet. Add one to start modeling.
                                </Typography>
                            ) : null}
                        </Stack>
                    </Paper>

                    <ValidationFlowEditor
                        validationFlowConfig={draft.validationFlowConfig}
                        onChange={(nextFlow) => handleDraftChange({ validationFlowConfig: nextFlow })}
                    />
                </Stack>
            </Box>
        </Stack>
    );
}
