import React from 'react';
import {
    Background,
    Controls,
    MiniMap,
    ReactFlow,
    addEdge,
    useEdgesState,
    useNodesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box, Paper, Stack, Typography, useTheme } from '@mui/material';

const FALLBACK_NODES = [
    {
        id: 'start',
        type: 'input',
        position: { x: 40, y: 80 },
        data: { label: 'Submit entry' }
    },
    {
        id: 'validate',
        position: { x: 280, y: 80 },
        data: { label: 'Validate fields' }
    },
    {
        id: 'review',
        position: { x: 520, y: 30 },
        data: { label: 'Editorial review' }
    },
    {
        id: 'publish',
        type: 'output',
        position: { x: 760, y: 80 },
        data: { label: 'Publish' }
    }
];

const FALLBACK_EDGES = [
    { id: 'e1', source: 'start', target: 'validate', animated: true },
    { id: 'e2', source: 'validate', target: 'review' },
    { id: 'e3', source: 'review', target: 'publish' }
];

function _toFlow(validationFlowConfig) {
    if (!validationFlowConfig || typeof validationFlowConfig !== 'object') {
        return { nodes: FALLBACK_NODES, edges: FALLBACK_EDGES };
    }

    const nodes = Array.isArray(validationFlowConfig.nodes) ? validationFlowConfig.nodes : null;
    const edges = Array.isArray(validationFlowConfig.edges) ? validationFlowConfig.edges : null;

    if (!nodes || !edges || nodes.length === 0) {
        return { nodes: FALLBACK_NODES, edges: FALLBACK_EDGES };
    }

    return { nodes, edges };
}

export default function ValidationFlowEditor({ validationFlowConfig, onChange, height = 360 }) {
    const theme = useTheme();
    const initial = React.useMemo(() => _toFlow(validationFlowConfig), [validationFlowConfig]);

    const [nodes, setNodes, onNodesChange] = useNodesState(initial.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initial.edges);

    React.useEffect(() => {
        const next = _toFlow(validationFlowConfig);
        setNodes(next.nodes);
        setEdges(next.edges);
    }, [validationFlowConfig, setNodes, setEdges]);

    const handleConnect = React.useCallback(
        (connection) => setEdges((current) => addEdge({ ...connection, animated: true }, current)),
        [setEdges]
    );

    const emit = React.useCallback(
        (nextNodes, nextEdges) => {
            if (typeof onChange !== 'function') {
                return;
            }
            onChange({ nodes: nextNodes, edges: nextEdges });
        },
        [onChange]
    );

    const handleNodesChange = React.useCallback(
        (changes) => {
            onNodesChange(changes);
            setNodes((current) => {
                emit(current, edges);
                return current;
            });
        },
        [edges, emit, onNodesChange, setNodes]
    );

    const handleEdgesChange = React.useCallback(
        (changes) => {
            onEdgesChange(changes);
            setEdges((current) => {
                emit(nodes, current);
                return current;
            });
        },
        [emit, nodes, onEdgesChange, setEdges]
    );

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 0,
                bgcolor: 'background.paper',
                borderColor: 'divider',
                overflow: 'hidden'
            }}
        >
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    px: 2,
                    py: 1.5,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: `1px solid ${theme.palette.divider}`
                }}
            >
                <Typography variant="subtitle2">Validation Flow</Typography>
                <Typography variant="caption" color="text.secondary">
                    Drag nodes, connect handles. Persisted as JSON on the content type.
                </Typography>
            </Stack>
            <Box sx={{ height, width: '100%' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={handleNodesChange}
                    onEdgesChange={handleEdgesChange}
                    onConnect={handleConnect}
                    fitView
                    proOptions={{ hideAttribution: true }}
                    colorMode={theme.palette.mode === 'dark' ? 'dark' : 'light'}
                >
                    <Background gap={16} />
                    <MiniMap pannable zoomable />
                    <Controls showInteractive={false} />
                </ReactFlow>
            </Box>
        </Paper>
    );
}
