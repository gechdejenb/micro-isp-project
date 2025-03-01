import React from "react";
import { ArrowRight, Globe, Shield, Sun, Server, Users } from "lucide-react";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
    {  /* Hero Section */}
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              PublicConnect: AI + Blockchain Network Optimizer
            </h1>
            <p className="text-xl mb-6">
              Empowering schools, healthcare facilities, and government
              institutions with resilient, efficient, and sustainable internet
              access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/dashboard" className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium flex items-center hover:bg-blue-50 transition duration-300">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              {/* <button className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition duration-300">
            Learn More
              </button> */}
              </div>
            </div>
            <div className="md:w-1/3">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/network-connectivity-illustration-download-in-svg-png-gif-file-formats--share-internet-networking-connection-nallow-set-03-pack-design-shapes-illustrations-7141015.png?f=webp"
                alt="Network Connectivity Visualization"
                className=""
              />
            </div>
          </div>
        </div>
      </header>

      {/* Problem Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            The Problem: Broken Connectivity in Underserved Regions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Inefficient Resource Management",
                description:
                  "Congestion during peak usage and high operational costs.",
                icon: <Server className="h-10 w-10 text-red-500" />,
              },
              {
                title: "Frequent Downtime",
                description:
                  "Reactive maintenance disrupts critical services like e-learning and telemedicine.",
                icon: <Globe className="h-10 w-10 text-red-500" />,
              },
              {
                title: "Lack of Transparency",
                description:
                  "Stakeholders can't track resource usage or verify funding efficiency.",
                icon: <Users className="h-10 w-10 text-red-500" />,
              },
              {
                title: "Unsustainable Costs",
                description:
                  "Traditional solutions are unaffordable and energy-intensive.",
                icon: <Sun className="h-10 w-10 text-red-500" />,
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/man-doing-online-meeting-illustration-download-in-svg-png-gif-file-formats--video-conference-discussion-nallow-pack-people-illustrations-6983271.png"
                alt="PublicConnect Solution"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">
                The Solution: PublicConnect
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                PublicConnect is an AI-powered, blockchain-backed network
                optimization platform designed to transform public sector
                connectivity. By combining cutting-edge technologies, we ensure:
              </p>
              <ul className="space-y-4">
                {[
                  {
                    title: "Resilient Networks",
                    description:
                      "Self-healing AI and disaster recovery keep services online.",
                  },
                  {
                    title: "Cost Efficiency",
                    description:
                      "AI-driven optimization reduces operational expenses.",
                  },
                  {
                    title: "Sustainability",
                    description:
                      "Renewable energy integration minimizes environmental impact.",
                  },
                  {
                    title: "Transparency",
                    description: "Blockchain ensures accountability and trust.",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-100 rounded-full p-2 mr-3">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                    </span>
                    <div>
                      <span className="font-semibold">{item.title}:</span>{" "}
                      {item.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            How PublicConnect Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Driven Optimization",
                features: [
                  "Dynamically adjusts bandwidth and routing based on real-time demand.",
                  "Predicts and resolves network issues proactively, minimizing downtime.",
                ],
                icon: <Server className="h-12 w-12 text-blue-500" />,
              },
              {
                title: "Blockchain Transparency",
                features: [
                  "Logs all network operations and resource usage on the blockchain.",
                  "Enables decentralized governance through DAOs (Decentralized Autonomous Organizations).",
                ],
                icon: <Shield className="h-12 w-12 text-blue-500" />,
              },
              {
                title: "Renewable Energy Integration",
                features: [
                  "Optimizes energy consumption and integrates solar/wind power.",
                  "Provides real-time energy monitoring for sustainable operations.",
                ],
                icon: <Sun className="h-12 w-12 text-blue-500" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <ul className="space-y-2 text-gray-600 text-left">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-flex items-center justify-center bg-blue-100 rounded-full p-1 mr-2 mt-1">
                        <ArrowRight className="h-3 w-3 text-blue-600" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-6">Key Features</h2>
          <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            PublicConnect combines AI-powered optimization with blockchain
            transparency and renewable energy to deliver reliable connectivity
            solutions.
          </p>
          <div className="space-y-12">
            {[
              {
                title: "Resilience: Keeping Networks Online",
                features: [
                  "AI-Driven Smart Network Optimization: Prevents congestion and outages.",
                  "Disaster Recovery Mode: Prioritizes critical services during emergencies.",
                  "Predictive Maintenance: Reduces downtime with proactive issue resolution.",
                ],
              },
              {
                title: "Efficiency: AI-Powered Cost Optimization",
                features: [
                  "Dynamic Bandwidth Allocation: Ensures fair resource distribution.",
                  "Real-Time Monitoring: Tracks performance and provides actionable insights.",
                ],
              },
              {
                title: "Sustainability: Renewable Energy & Resource Efficiency",
                features: [
                  "Energy Monitoring Dashboard: Tracks and optimizes power usage.",
                  "Sustainable Performance Optimizer: Balances energy efficiency with network performance.",
                ],
              },
              {
                title: "Security: Protecting Networks from Cyber Threats",
                features: [
                  "AI-Driven Threat Detection: Monitors and neutralizes cyberattacks in real-time.",
                  "End-to-End Encryption: Secures all data transmissions.",
                ],
              },
              {
                title: "User Experience: Simplified Network Management",
                features: [
                  "Mobile-Friendly Dashboard: Accessible on low-power devices.",
                  "Custom Alerts: Real-time notifications for quick issue resolution.",
                ],
              },
            ].map((item, index) => (
              <div key={index} className="pl-5 border-l-4 border-blue-500">
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <ul className="space-y-2 pl-4">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-700">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Rural Health Centers",
                subtitle: "Secure & Sustainable Telemedicine",
                features: [
                  "AI-Powered Bandwidth Allocation: Prioritizes telemedicine traffic.",
                  "Blockchain-Backed Donor Tracking: Ensures transparency in healthcare funding.",
                ],
                icon: "🏥",
              },
              {
                title: "Rural Schools",
                subtitle: "Smart, Transparent Learning Networks",
                features: [
                  "AI-Driven Cost Optimization: Minimizes school expenses.",
                  "Emergency Mode: Ensures stable connectivity during online exams.",
                ],
                icon: "🏫",
              },
              {
                title: "Government Offices",
                subtitle: "Decentralized Public Service Connectivity",
                features: [
                  "AI-Driven Cost Optimization: Ensures low-cost, high-speed connectivity.",
                  "Blockchain-Backed Security: Prevents data fraud and tampering.",
                ],
                icon: "🏛",
              },
              {
                title: "Emergency Connectivity Mode",
                subtitle: "For Disaster Response",
                features: [
                  "AI-Powered Emergency Bandwidth Reallocation: Prioritizes emergency services.",
                  "Blockchain-Backed Emergency Funding: Automates crisis fund releases.",
                ],
                icon: "🚨",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{item.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-blue-600">{item.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-2 pl-8 list-disc text-gray-700">
                  {item.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { name: "Millicent Adzepa Oprang", role: "Product Manager", src:"/m.jpg" },
              { name: "Getaw Dejen", role: "Developer" , src:"g.jpg"},
              { name: "El-Praise Ayo", role: "Developer" , src:"e.jpeg"},
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src={member.src}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Revolution</h2>
          <p className="text-lg mb-8">
            PublicConnect is more than a solution—it's a movement to bridge the
            digital divide and empower underserved communities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition duration-300">
              Contact Us
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition duration-300">
              Partner With Us
            </button>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold mb-4">PublicConnect</h3>
              <p className="text-gray-300 max-w-md">
                Resilient. Efficient. Sustainable. Empowering Communities for a
                Digital Future.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Solutions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Use Cases
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
            <p>© 2025 PublicConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
