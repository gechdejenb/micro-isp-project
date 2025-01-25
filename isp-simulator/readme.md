Run the Script:

bash
Copy
sudo python network_simulator_with_bandwidth.py
Observe Bandwidth Peaks:

The script will simulate increasing bandwidth usage, printing the current bandwidth level:


Simulating bandwidth: 1 Mbps
Simulating bandwidth: 2 Mbps
...
Simulating bandwidth: 10 Mbps
Bandwidth peak simulation complete.
Interact with the Network:

After the bandwidth simulation, the Mininet CLI will open. You can use commands like:

pingall  # Test connectivity between all hosts
user1 ping server1  # Test connectivity between user1 and server1
user3 iperf -c user4  # Test bandwidth between users in the same subnet
Stop the Simulation:

Type exit in the Mininet CLI to stop the simulation.

Example Use Cases
Testing AI-Driven Bandwidth Optimization:

Observe how your AI system responds to varying levels of network load.

Network Debugging:

Use tcpdump to capture and analyze traffic during bandwidth peaks:

bash
Copy
user1 tcpdump -i user1-eth0  # Capture traffic on user1's interface
Performance Analysis:

Use iperf results to measure bandwidth, latency, and packet loss.