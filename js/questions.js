// CCNP Enterprise Core (ENCOR 350-401) Question Bank
const questionBank = [
  {
    id: 1,
    category: "Routing",
    question: "Which OSPF packet type is used to discover and maintain neighbor relationships?",
    options: [
      "A. DBD (Database Description)",
      "B. LSR (Link State Request)",
      "C. Hello",
      "D. LSU (Link State Update)"
    ],
    answer: 2,
    explanation: "OSPF Hello packets are used to discover neighbors and maintain neighbor relationships. They are sent periodically on each OSPF-enabled interface."
  },
  {
    id: 2,
    category: "Routing",
    question: "What is the default administrative distance of OSPF?",
    options: [
      "A. 90",
      "B. 110",
      "C. 115",
      "D. 120"
    ],
    answer: 1,
    explanation: "OSPF has a default administrative distance of 110. EIGRP internal is 90, IS-IS is 115, and RIP is 120."
  },
  {
    id: 3,
    category: "Routing",
    question: "Which BGP attribute is considered first during the BGP path selection process?",
    options: [
      "A. AS Path",
      "B. MED",
      "C. Weight",
      "D. Local Preference"
    ],
    answer: 2,
    explanation: "Cisco Weight is the first attribute checked in BGP path selection. It is Cisco-proprietary and locally significant. Higher weight is preferred."
  },
  {
    id: 4,
    category: "Routing",
    question: "In EIGRP, what is the metric used when a feasibility condition is satisfied?",
    options: [
      "A. Feasible Distance",
      "B. Reported Distance",
      "C. Administrative Distance",
      "D. Successor Distance"
    ],
    answer: 1,
    explanation: "The feasibility condition in EIGRP is satisfied when a neighbor's Reported Distance (RD) to a destination is less than the current Feasible Distance (FD). The RD must be less than FD for a route to become a feasible successor."
  },
  {
    id: 5,
    category: "Routing",
    question: "Which command verifies the OSPF neighbor state on a Cisco router?",
    options: [
      "A. show ip ospf neighbor",
      "B. show ospf neighbors",
      "C. show ip route ospf",
      "D. debug ip ospf neighbor"
    ],
    answer: 0,
    explanation: "The 'show ip ospf neighbor' command displays the OSPF neighbor table, including neighbor ID, state, dead time, address, and interface."
  },
  {
    id: 6,
    category: "Switching",
    question: "Which STP port state forwards data frames and populates the MAC address table?",
    options: [
      "A. Listening",
      "B. Learning",
      "C. Blocking",
      "D. Forwarding"
    ],
    answer: 3,
    explanation: "The Forwarding state is the only STP state where a port both forwards data frames AND populates the MAC address table. The Learning state populates the MAC table but does not forward frames."
  },
  {
    id: 7,
    category: "Switching",
    question: "What is the purpose of the RSTP port role 'Alternate port'?",
    options: [
      "A. It provides an alternate path to the root bridge",
      "B. It provides an alternate path to a non-root segment",
      "C. It is a designated port on a shared medium",
      "D. It is a backup to the root port"
    ],
    answer: 0,
    explanation: "In RSTP, the Alternate port provides an alternate path toward the root bridge. It is in the discarding state but can immediately transition to the forwarding state if the root port fails."
  },
  {
    id: 8,
    category: "Switching",
    question: "Which VTP mode allows a switch to create, modify, and delete VLANs?",
    options: [
      "A. Client",
      "B. Transparent",
      "C. Server",
      "D. Off"
    ],
    answer: 2,
    explanation: "VTP Server mode allows a switch to create, modify, and delete VLANs. Changes made on a VTP Server are propagated to all switches in the VTP domain."
  },
  {
    id: 9,
    category: "Switching",
    question: "What is the IEEE standard for link aggregation (EtherChannel)?",
    options: [
      "A. 802.1Q",
      "B. 802.1D",
      "C. 802.3ad",
      "D. 802.1w"
    ],
    answer: 2,
    explanation: "IEEE 802.3ad (now part of 802.1AX) defines Link Aggregation Control Protocol (LACP) for EtherChannel. 802.1Q is VLAN trunking, 802.1D is STP, and 802.1w is RSTP."
  },
  {
    id: 10,
    category: "Switching",
    question: "Which command enables PortFast on a specific interface?",
    options: [
      "A. spanning-tree portfast",
      "B. spanning-tree fast-port enable",
      "C. no spanning-tree disable",
      "D. switchport portfast"
    ],
    answer: 0,
    explanation: "The interface-level command 'spanning-tree portfast' enables PortFast on a specific port, causing it to immediately transition to the forwarding state upon link up."
  },
  {
    id: 11,
    category: "Wireless",
    question: "Which 802.11 standard introduced MIMO technology and operates on both 2.4 GHz and 5 GHz bands?",
    options: [
      "A. 802.11a",
      "B. 802.11g",
      "C. 802.11n",
      "D. 802.11ac"
    ],
    answer: 2,
    explanation: "802.11n (Wi-Fi 4) introduced MIMO (Multiple Input Multiple Output) technology and is dual-band, operating on both 2.4 GHz and 5 GHz. It can achieve speeds up to 600 Mbps."
  },
  {
    id: 12,
    category: "Wireless",
    question: "In a Cisco WLC deployment, what is the function of CAPWAP?",
    options: [
      "A. It encrypts wireless client data",
      "B. It tunnels AP management and data traffic to the WLC",
      "C. It provides RADIUS authentication",
      "D. It manages QoS policies for wireless clients"
    ],
    answer: 1,
    explanation: "CAPWAP (Control And Provisioning of Wireless Access Points) is the protocol used to tunnel both control and data traffic between lightweight APs and the Wireless LAN Controller (WLC)."
  },
  {
    id: 13,
    category: "Wireless",
    question: "Which wireless security protocol uses SAE (Simultaneous Authentication of Equals)?",
    options: [
      "A. WPA",
      "B. WPA2-Personal",
      "C. WPA3-Personal",
      "D. WEP"
    ],
    answer: 2,
    explanation: "WPA3-Personal uses SAE (Simultaneous Authentication of Equals), which is a more secure key exchange protocol replacing PSK (Pre-Shared Key) used in WPA2-Personal, protecting against offline dictionary attacks."
  },
  {
    id: 14,
    category: "Security",
    question: "Which AAA protocol encrypts the entire packet body, not just the password?",
    options: [
      "A. RADIUS",
      "B. TACACS+",
      "C. DIAMETER",
      "D. LDAP"
    ],
    answer: 1,
    explanation: "TACACS+ encrypts the entire body of the packet, providing better security than RADIUS which only encrypts the password field. TACACS+ also separates authentication, authorization, and accounting."
  },
  {
    id: 15,
    category: "Security",
    question: "What does the 'ip dhcp snooping' feature protect against?",
    options: [
      "A. ARP spoofing attacks",
      "B. Rogue DHCP servers",
      "C. MAC flooding attacks",
      "D. IP spoofing attacks"
    ],
    answer: 1,
    explanation: "DHCP Snooping protects against rogue DHCP servers by validating DHCP messages. Ports are designated as trusted (connected to legitimate DHCP servers) or untrusted (client ports), and DHCP offers/acks from untrusted ports are dropped."
  },
  {
    id: 16,
    category: "Security",
    question: "Which security feature prevents unauthorized switches from becoming the root bridge?",
    options: [
      "A. BPDU Guard",
      "B. Root Guard",
      "C. PortFast",
      "D. Loop Guard"
    ],
    answer: 1,
    explanation: "Root Guard prevents unauthorized switches from becoming the root bridge. When a port with Root Guard enabled receives a superior BPDU, the port is placed in a root-inconsistent state (not forwarding)."
  },
  {
    id: 17,
    category: "Security",
    question: "What is the primary purpose of 802.1X port-based authentication?",
    options: [
      "A. To encrypt data between switches",
      "B. To prevent MAC flooding",
      "C. To authenticate devices before granting network access",
      "D. To encrypt wireless traffic"
    ],
    answer: 2,
    explanation: "802.1X is an IEEE standard for port-based Network Access Control (PNAC). It authenticates devices (supplicants) trying to connect to the network before granting them access, using EAP over LAN (EAPOL)."
  },
  {
    id: 18,
    category: "SDN & Automation",
    question: "In Cisco SD-Access, what is the function of the DNA Center?",
    options: [
      "A. It acts as the data plane for all traffic",
      "B. It provides centralized management, automation, and analytics",
      "C. It functions as the LISP map server",
      "D. It handles all VXLAN encapsulation"
    ],
    answer: 1,
    explanation: "Cisco DNA Center serves as the centralized management and automation platform for SD-Access. It provides intent-based networking, analytics, assurance, and policy management through a GUI and northbound REST APIs."
  },
  {
    id: 19,
    category: "SDN & Automation",
    question: "Which protocol does Cisco SD-Access use for the data plane overlay?",
    options: [
      "A. GRE",
      "B. MPLS",
      "C. VXLAN",
      "D. OTV"
    ],
    answer: 2,
    explanation: "Cisco SD-Access uses VXLAN (Virtual Extensible LAN) for the data plane overlay, encapsulating traffic between fabric edge nodes. LISP is used for the control plane."
  },
  {
    id: 20,
    category: "SDN & Automation",
    question: "Which data format is most commonly used by REST APIs in network automation?",
    options: [
      "A. XML",
      "B. YAML",
      "C. CSV",
      "D. JSON"
    ],
    answer: 3,
    explanation: "JSON (JavaScript Object Notation) is the most commonly used data format for REST APIs in network automation. It is lightweight, human-readable, and easily parsed by most programming languages."
  },
  {
    id: 21,
    category: "SDN & Automation",
    question: "What is the purpose of YANG in network automation?",
    options: [
      "A. It is a transport protocol for automation",
      "B. It is a data modeling language for network configuration",
      "C. It is an API framework for Cisco devices",
      "D. It is a scripting language for automation"
    ],
    answer: 1,
    explanation: "YANG (Yet Another Next Generation) is a data modeling language used to define the structure and syntax of configuration data for network devices. It is used with NETCONF and RESTCONF protocols."
  },
  {
    id: 22,
    category: "Routing",
    question: "Which OSPF network type does NOT elect a DR/BDR?",
    options: [
      "A. Broadcast",
      "B. NBMA",
      "C. Point-to-Point",
      "D. Point-to-Multipoint"
    ],
    answer: 2,
    explanation: "OSPF Point-to-Point networks do not elect a DR or BDR. Point-to-point links connect only two routers, so DR/BDR election is unnecessary. Broadcast and NBMA network types do elect DR/BDR."
  },
  {
    id: 23,
    category: "Routing",
    question: "What is the maximum number of equal-cost paths that EIGRP supports by default?",
    options: [
      "A. 2",
      "B. 4",
      "C. 8",
      "D. 16"
    ],
    answer: 1,
    explanation: "EIGRP supports a maximum of 4 equal-cost paths by default for load balancing. This can be increased up to 32 using the 'maximum-paths' command. EIGRP also supports unequal-cost load balancing via the variance command."
  },
  {
    id: 24,
    category: "Routing",
    question: "Which BGP message type is sent when a route is withdrawn from the routing table?",
    options: [
      "A. OPEN",
      "B. UPDATE",
      "C. NOTIFICATION",
      "D. KEEPALIVE"
    ],
    answer: 1,
    explanation: "BGP UPDATE messages are used both to advertise new routes and to withdraw previously advertised routes. A withdrawn route section in an UPDATE message tells neighbors to remove that route."
  },
  {
    id: 25,
    category: "Network Services",
    question: "Which NTP stratum level is assigned to a device that gets its time directly from an atomic clock?",
    options: [
      "A. Stratum 0",
      "B. Stratum 1",
      "C. Stratum 2",
      "D. Stratum 3"
    ],
    answer: 1,
    explanation: "Stratum 1 devices synchronize directly from a Stratum 0 reference clock (atomic clock, GPS). Stratum 0 devices are the reference clocks themselves and are not network participants. Stratum 2 devices sync from Stratum 1, and so on."
  },
  {
    id: 26,
    category: "Network Services",
    question: "What is the default lease time for DHCP addresses in Cisco IOS?",
    options: [
      "A. 12 hours",
      "B. 1 day",
      "C. 2 days",
      "D. 7 days"
    ],
    answer: 1,
    explanation: "The default DHCP lease time in Cisco IOS is 1 day (24 hours). This can be modified with the 'lease' command in the DHCP pool configuration."
  },
  {
    id: 27,
    category: "Network Services",
    question: "Which DNS record type maps a hostname to an IPv6 address?",
    options: [
      "A. A",
      "B. CNAME",
      "C. AAAA",
      "D. PTR"
    ],
    answer: 2,
    explanation: "AAAA (quad-A) records map a hostname to an IPv6 address. A records map hostnames to IPv4 addresses. PTR records are used for reverse DNS lookups, and CNAME records are aliases."
  },
  {
    id: 28,
    category: "QoS",
    question: "Which QoS marking uses a 6-bit field in the IP header?",
    options: [
      "A. IP Precedence",
      "B. DSCP",
      "C. CoS",
      "D. MPLS EXP"
    ],
    answer: 1,
    explanation: "DSCP (Differentiated Services Code Point) uses a 6-bit field in the Type of Service (ToS) byte of the IP header (the DSCP field). IP Precedence uses only the first 3 bits of the same byte. CoS is an Ethernet frame header marking."
  },
  {
    id: 29,
    category: "QoS",
    question: "Which queuing mechanism guarantees a minimum bandwidth to a traffic class?",
    options: [
      "A. FIFO",
      "B. PQ (Priority Queuing)",
      "C. WFQ (Weighted Fair Queuing)",
      "D. CBWFQ (Class-Based Weighted Fair Queuing)"
    ],
    answer: 3,
    explanation: "CBWFQ (Class-Based Weighted Fair Queuing) allows you to define traffic classes and guarantee minimum bandwidth to each class. It is the preferred queuing mechanism for providing bandwidth guarantees."
  },
  {
    id: 30,
    category: "QoS",
    question: "What DSCP value corresponds to Expedited Forwarding (EF)?",
    options: [
      "A. DSCP 0",
      "B. DSCP 26",
      "C. DSCP 46",
      "D. DSCP 48"
    ],
    answer: 2,
    explanation: "DSCP 46 (binary 101110) corresponds to Expedited Forwarding (EF), which is typically used for voice traffic. EF provides the highest priority with low latency, low jitter, and low packet loss."
  },
  {
    id: 31,
    category: "Virtualization",
    question: "What is the primary difference between Type 1 and Type 2 hypervisors?",
    options: [
      "A. Type 1 runs on top of an OS; Type 2 runs directly on hardware",
      "B. Type 1 runs directly on hardware; Type 2 runs on top of an OS",
      "C. Type 1 supports more VMs than Type 2",
      "D. Type 2 provides better performance than Type 1"
    ],
    answer: 1,
    explanation: "Type 1 hypervisors (bare-metal) run directly on hardware (e.g., VMware ESXi, Microsoft Hyper-V). Type 2 hypervisors (hosted) run on top of an existing OS (e.g., VMware Workstation, VirtualBox). Type 1 generally provides better performance."
  },
  {
    id: 32,
    category: "Virtualization",
    question: "Which technology allows multiple virtual routers to share physical router resources?",
    options: [
      "A. VRF (Virtual Routing and Forwarding)",
      "B. VLAN",
      "C. VPN",
      "D. VXLAN"
    ],
    answer: 0,
    explanation: "VRF (Virtual Routing and Forwarding) creates multiple routing table instances on a single physical router, effectively creating multiple virtual routers. Each VRF has its own routing table, interfaces, and forwarding decisions."
  },
  {
    id: 33,
    category: "SDN & Automation",
    question: "Which Python library is commonly used for network automation on Cisco devices via SSH?",
    options: [
      "A. requests",
      "B. Netmiko",
      "C. Django",
      "D. Scapy"
    ],
    answer: 1,
    explanation: "Netmiko is a Python library that simplifies SSH connections to network devices from multiple vendors, including Cisco. It provides a simplified interface for executing commands and sending configurations."
  },
  {
    id: 34,
    category: "SDN & Automation",
    question: "What is the difference between NETCONF and RESTCONF?",
    options: [
      "A. NETCONF uses XML over SSH; RESTCONF uses HTTP/HTTPS with JSON or XML",
      "B. NETCONF uses HTTP; RESTCONF uses SSH",
      "C. NETCONF is for monitoring only; RESTCONF is for configuration",
      "D. They are identical protocols"
    ],
    answer: 0,
    explanation: "NETCONF uses XML encoding over SSH (TCP port 830). RESTCONF is a RESTful interface that uses HTTP/HTTPS and supports both JSON and XML encoding. Both protocols use YANG data models."
  },
  {
    id: 35,
    category: "Routing",
    question: "What does the OSPF LSA Type 3 represent?",
    options: [
      "A. Router LSA",
      "B. Network LSA",
      "C. Summary LSA (inter-area route)",
      "D. AS External LSA"
    ],
    answer: 2,
    explanation: "OSPF LSA Type 3 is a Summary LSA generated by ABRs (Area Border Routers) to advertise inter-area routes. Type 1 is Router LSA, Type 2 is Network LSA (from DR), and Type 5 is AS External LSA."
  },
  {
    id: 36,
    category: "Routing",
    question: "Which command redistributes OSPF routes into EIGRP on a Cisco router?",
    options: [
      "A. redistribute ospf 1 metric 10000 100 255 1 1500",
      "B. redistribute ospf into eigrp",
      "C. import ospf to eigrp",
      "D. route-policy ospf-to-eigrp"
    ],
    answer: 0,
    explanation: "When redistributing OSPF into EIGRP, you must specify the EIGRP seed metric (bandwidth, delay, reliability, load, MTU). The command format is: 'redistribute ospf [process-id] metric [bw] [delay] [reliability] [load] [mtu]'."
  },
  {
    id: 37,
    category: "Switching",
    question: "What is the purpose of UDLD (Unidirectional Link Detection)?",
    options: [
      "A. To detect and disable ports with duplex mismatches",
      "B. To detect unidirectional links that could cause STP loops",
      "C. To prevent MAC flooding attacks",
      "D. To detect cable faults using TDR"
    ],
    answer: 1,
    explanation: "UDLD (Unidirectional Link Detection) is a Cisco protocol that detects and disables ports with unidirectional traffic flow, which can cause STP loops since BPDUs may not be received even though the link appears up."
  },
  {
    id: 38,
    category: "Switching",
    question: "In MSTP (Multiple Spanning Tree Protocol), what is an MST instance (MSTI)?",
    options: [
      "A. A per-VLAN spanning tree instance",
      "B. A group of VLANs mapped to a single spanning tree instance",
      "C. A physical port in spanning tree",
      "D. A backup spanning tree for redundancy"
    ],
    answer: 1,
    explanation: "In MSTP, an MST instance (MSTI) maps multiple VLANs to a single spanning tree instance, reducing the number of STP instances compared to PVST+. This reduces CPU and memory overhead while still allowing VLAN grouping."
  },
  {
    id: 39,
    category: "IPv6",
    question: "Which IPv6 address type is used for one-to-nearest communication?",
    options: [
      "A. Unicast",
      "B. Multicast",
      "C. Anycast",
      "D. Broadcast"
    ],
    answer: 2,
    explanation: "Anycast addresses are assigned to multiple interfaces and packets are delivered to the nearest interface (in terms of routing distance). IPv6 does not use broadcast addresses; multicast is used instead."
  },
  {
    id: 40,
    category: "IPv6",
    question: "What is the IPv6 equivalent of the IPv4 APIPA address range (169.254.x.x)?",
    options: [
      "A. FE80::/10 (Link-Local)",
      "B. FC00::/7 (Unique Local)",
      "C. FF00::/8 (Multicast)",
      "D. 2000::/3 (Global Unicast)"
    ],
    answer: 0,
    explanation: "IPv6 link-local addresses (FE80::/10) are similar to IPv4 APIPA (169.254.x.x) in that they are automatically configured and only valid on the local link. They are not routable beyond the local segment."
  },
  {
    id: 41,
    category: "IPv6",
    question: "Which protocol replaces ARP in IPv6?",
    options: [
      "A. ICMPv6",
      "B. DHCPv6",
      "C. NDP (Neighbor Discovery Protocol)",
      "D. SLAAC"
    ],
    answer: 2,
    explanation: "NDP (Neighbor Discovery Protocol) replaces ARP in IPv6. It uses ICMPv6 messages (Neighbor Solicitation and Neighbor Advertisement) to resolve IPv6 addresses to MAC addresses and discover routers."
  },
  {
    id: 42,
    category: "Wireless",
    question: "What is the maximum theoretical throughput of 802.11ac Wave 2 with 4x4 MIMO and 80+80 MHz channels?",
    options: [
      "A. 600 Mbps",
      "B. 1.3 Gbps",
      "C. 3.47 Gbps",
      "D. 6.9 Gbps"
    ],
    answer: 2,
    explanation: "802.11ac Wave 2 with 4 spatial streams (4x4 MIMO) and 80+80 MHz channel bonding can achieve up to approximately 3.47 Gbps theoretical maximum throughput using 256-QAM modulation."
  },
  {
    id: 43,
    category: "Security",
    question: "What is the purpose of Control Plane Policing (CoPP)?",
    options: [
      "A. To encrypt control plane traffic",
      "B. To rate-limit traffic destined for the router's CPU",
      "C. To filter routing updates from untrusted sources",
      "D. To prioritize management traffic"
    ],
    answer: 1,
    explanation: "Control Plane Policing (CoPP) protects the router's CPU from DoS attacks and excessive traffic by rate-limiting traffic destined for or generated by the control plane. It applies QoS policies to control plane traffic."
  },
  {
    id: 44,
    category: "Security",
    question: "Which type of ACL can filter traffic based on both source AND destination IP addresses?",
    options: [
      "A. Standard ACL",
      "B. Extended ACL",
      "C. Named ACL",
      "D. Reflexive ACL"
    ],
    answer: 1,
    explanation: "Extended ACLs can filter traffic based on source IP, destination IP, protocol, and port numbers. Standard ACLs can only filter based on source IP address. Named ACLs are simply a naming format that can be standard or extended."
  },
  {
    id: 45,
    category: "Routing",
    question: "What is the purpose of the BGP 'next-hop-self' command?",
    options: [
      "A. To set the router as the next hop for iBGP peers",
      "B. To prevent iBGP peers from changing the next-hop attribute",
      "C. To advertise the router's loopback as the next hop to eBGP peers",
      "D. To enable recursive next-hop lookup"
    ],
    answer: 0,
    explanation: "The 'next-hop-self' command forces a BGP router to advertise itself as the next hop when sending updates to iBGP peers. This is commonly used when the iBGP peers don't have routes to the eBGP next-hop address."
  },
  {
    id: 46,
    category: "Network Services",
    question: "Which HSRP version supports IPv6?",
    options: [
      "A. HSRP Version 1",
      "B. HSRP Version 2",
      "C. Both versions support IPv6",
      "D. Neither version supports IPv6"
    ],
    answer: 1,
    explanation: "HSRP Version 2 supports both IPv4 and IPv6. Version 1 only supports IPv4. HSRP v2 also extends the group number range from 0-255 to 0-4095 and uses a different multicast address (224.0.0.102 vs 224.0.0.2)."
  },
  {
    id: 47,
    category: "Network Services",
    question: "What is the virtual MAC address format used by HSRP Version 1?",
    options: [
      "A. 0000.0c07.acXX (where XX is the group number in hex)",
      "B. 0000.5e00.01XX",
      "C. 0007.b400.XXYY",
      "D. 0000.0c9f.fXXX"
    ],
    answer: 0,
    explanation: "HSRP Version 1 uses virtual MAC addresses in the format 0000.0c07.acXX, where XX is the HSRP group number in hexadecimal. For example, group 1 would use 0000.0c07.ac01."
  },
  {
    id: 48,
    category: "Routing",
    question: "Which feature allows OSPF to perform route summarization at area boundaries?",
    options: [
      "A. route-map",
      "B. area range",
      "C. summary-address",
      "D. aggregate-address"
    ],
    answer: 1,
    explanation: "The 'area range' command is used on ABRs to summarize Type 3 LSAs at OSPF area boundaries. The 'summary-address' command is used for external route summarization on ASBRs. 'aggregate-address' is a BGP command."
  },
  {
    id: 49,
    category: "SDN & Automation",
    question: "What does 'idempotent' mean in the context of network automation?",
    options: [
      "A. The operation runs only once regardless of how many times it is called",
      "B. The operation produces the same result regardless of how many times it is applied",
      "C. The operation cannot be reversed once applied",
      "D. The operation requires authentication each time it runs"
    ],
    answer: 1,
    explanation: "An idempotent operation produces the same result whether it is applied once or multiple times. In network automation (especially Ansible), this means running a playbook multiple times won't create duplicate configurations."
  },
  {
    id: 50,
    category: "Virtualization",
    question: "In cloud computing, which service model provides the most control over the underlying infrastructure?",
    options: [
      "A. SaaS (Software as a Service)",
      "B. PaaS (Platform as a Service)",
      "C. IaaS (Infrastructure as a Service)",
      "D. FaaS (Function as a Service)"
    ],
    answer: 2,
    explanation: "IaaS (Infrastructure as a Service) provides the most control, giving customers access to virtualized hardware resources (compute, storage, networking). PaaS abstracts infrastructure; SaaS abstracts both infrastructure and application management."
  }
];

// All available categories
const categories = [...new Set(questionBank.map(q => q.category))];
