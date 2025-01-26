import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, Wifi, Zap } from "lucide-react";

const NetworkMetrics = () => {
  const [metrics, setMetrics] = useState({
    bandwidth_usage: 0,
    latency: 0,
    packet_loss: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/network-metrics');
        setMetrics(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();

    const interval = setInterval(fetchMetrics, 5000); // Fetch metrics every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Wifi className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Bandwidth Usage</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">
                {metrics.bandwidth_usage}%
              </span>
            </div>
          </div>
        </div>
        <div className="h-2 bg-gray-100 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${metrics.bandwidth_usage}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-50 rounded-lg">
            <Zap className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Latency</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">
                {metrics.latency}ms
              </span>
            </div>
          </div>
        </div>
        <div className="h-2 bg-gray-100 rounded-full">
          <div
            className="h-full bg-yellow-500 rounded-full"
            style={{ width: `${(metrics.latency / 50) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-50 rounded-lg">
            <Activity className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Packet Loss</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">
                {metrics.packet_loss}%
              </span>
            </div>
          </div>
        </div>
        <div className="h-2 bg-gray-100 rounded-full">
          <div
            className="h-full bg-red-500 rounded-full"
            style={{ width: `${(metrics.packet_loss / 5) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default NetworkMetrics;