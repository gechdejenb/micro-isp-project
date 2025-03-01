import { useCallback, useMemo } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    Handle,
    Position
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom node components
const ServiceNode = ({ data }) => (
    <div className="px-4 py-2 shadow-md rounded-md bg-blue-100 border-2 border-blue-500 font-semibold">
        <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            {data.label}
        </div>
        <Handle type="source" position={Position.Right} />
    </div>
);

const ServerNode = ({ data }) => (
    <div className="px-4 py-2 shadow-md rounded-md bg-gray-100 border-2 border-gray-500">
        <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            {data.label}
        </div>
        <Handle type="source" position={Position.Right} />
    </div>
);

const UserNode = ({ data }) => (
    <div className="px-4 py-2 shadow-md rounded-md bg-yellow-100 border-2 border-yellow-500">
        <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-600 mr-2"></div>
            {data.label}
        </div>
        <Handle type="source" position={Position.Right} />
    </div>
);

const SwitchNode = ({ data }) => (
    <div className="px-4 py-2 shadow-md rounded-md bg-purple-100 border-2 border-purple-500">
        <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-600 mr-2"></div>
            {data.label}
        </div>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
    </div>
);

const RouterNode = ({ data }) => (
    <div className="px-4 py-2 shadow-md rounded-md bg-red-100 border-2 border-red-500 font-semibold">
        <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
            {data.label}
        </div>
        <Handle type="target" position={Position.Left} />
    </div>
);

export default function NetworkTopology() {
    // Define the node types
    const nodeTypes = useMemo(() => ({
        service: ServiceNode,
        server: ServerNode,
        user: UserNode,
        switch: SwitchNode,
        router: RouterNode,
    }), []);

    // Improved node positioning and custom node types
    const initialNodes = [
        { id: 'edu', type: 'service', data: { label: 'Education Service' }, position: { x: 50, y: 100 } },
        { id: 'health', type: 'service', data: { label: 'Health Service' }, position: { x: 50, y: 200 } },
        { id: 'public', type: 'service', data: { label: 'Public Service' }, position: { x: 50, y: 300 } },
        { id: 'server1', type: 'server', data: { label: 'Server 1' }, position: { x: 50, y: 400 } },
        { id: 'user1', type: 'user', data: { label: 'User 1' }, position: { x: 50, y: 500 } },
        { id: 'user2', type: 'user', data: { label: 'User 2' }, position: { x: 300, y: 500 } },
        { id: 'user3', type: 'user', data: { label: 'User 3' }, position: { x: 550, y: 500 } },
        { id: 'user4', type: 'user', data: { label: 'User 4' }, position: { x: 800, y: 500 } },
        { id: 'as1', type: 'switch', data: { label: 'Access Switch 1' }, position: { x: 300, y: 200 } },
        { id: 'as2', type: 'switch', data: { label: 'Access Switch 2' }, position: { x: 300, y: 400 } },
        { id: 'ds1', type: 'switch', data: { label: 'Distribution Switch 1' }, position: { x: 550, y: 200 } },
        { id: 'ds2', type: 'switch', data: { label: 'Distribution Switch 2' }, position: { x: 550, y: 400 } },
        { id: 'cr1', type: 'router', data: { label: 'Core Router' }, position: { x: 800, y: 300 } },
    ];

    // Improved edges with styling
    const initialEdges = [
        { id: 'link-edu-as1', source: 'edu', target: 'as1', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
        { id: 'link-health-as1', source: 'health', target: 'as1', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
        { id: 'link-public-as2', source: 'public', target: 'as2', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
        { id: 'link-server1-as1', source: 'server1', target: 'as1', animated: true, style: { stroke: '#6b7280', strokeWidth: 2 } },
        { id: 'link-user1-as1', source: 'user1', target: 'as1', animated: true, style: { stroke: '#eab308', strokeWidth: 2 } },
        { id: 'link-user2-as2', source: 'user2', target: 'as2', animated: true, style: { stroke: '#eab308', strokeWidth: 2 } },
        { id: 'link-user3-as2', source: 'user3', target: 'ds1', animated: true, style: { stroke: '#eab308', strokeWidth: 2 } },
        { id: 'link-user4-as2', source: 'user4', target: 'ds2', animated: true, style: { stroke: '#eab308', strokeWidth: 2 } },
        { id: 'link-as1-ds1', source: 'as1', target: 'ds1', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 3 } },
        { id: 'link-as2-ds2', source: 'as2', target: 'ds2', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 3 } },
        { id: 'link-ds1-cr1', source: 'ds1', target: 'cr1', animated: true, style: { stroke: '#ef4444', strokeWidth: 4 } },
        { id: 'link-ds2-cr1', source: 'ds2', target: 'cr1', animated: true, style: { stroke: '#ef4444', strokeWidth: 4 } },
    ];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onInit = useCallback((reactFlowInstance) => {
        reactFlowInstance.fitView();
    }, []);

    return (
        <div className="w-full h-screen bg-gray-50 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Network Topology Diagram</h2>
            <div className="w-full h-full border border-gray-300 rounded-lg overflow-hidden">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onInit={onInit}
                    nodeTypes={nodeTypes}
                    fitView
                    snapToGrid
                    snapGrid={[15, 15]}
                    defaultZoom={0.8}
                    attributionPosition="bottom-left"
                >
                    <Background color="#aaa" gap={16} />
                    <Controls />
                    <MiniMap
                        nodeStrokeColor={(n) => {
                            if (n.type === 'service') return '#3b82f6';
                            if (n.type === 'server') return '#6b7280';
                            if (n.type === 'user') return '#eab308';
                            if (n.type === 'switch') return '#8b5cf6';
                            if (n.type === 'router') return '#ef4444';
                            return '#000';
                        }}
                        nodeColor={(n) => {
                            if (n.type === 'service') return '#dbeafe';
                            if (n.type === 'server') return '#f3f4f6';
                            if (n.type === 'user') return '#fef3c7';
                            if (n.type === 'switch') return '#ede9fe';
                            if (n.type === 'router') return '#fee2e2';
                            return '#fff';
                        }}
                        nodeBorderRadius={2}
                    />
                </ReactFlow>
            </div>
            {/* <div className="mt-4 p-3 bg-white rounded shadow">
                <h3 className="text-lg font-semibold mb-2">Legend</h3>
                <div className="grid grid-cols-5 gap-4">
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span>Services</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span>Servers</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-600 mr-2"></div>
                        <span>Users</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-600 mr-2"></div>
                        <span>Switches</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
                        <span>Routers</span>
                    </div>
                </div>
            </div> */}
        </div>
    );
}