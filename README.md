# 📡 CCNP MC Online Test

A browser-based **multiple-choice practice exam** for the Cisco Certified Network Professional (CCNP) Enterprise Core (ENCOR 350-401) certification.

## Features

- **50 practice questions** across 9 key CCNP topics
- Configurable test length (1–50 questions)
- **Category filtering** — focus on specific topics
- Live **timer** tracking your test duration
- **Question map** — jump to any question, flag questions for review
- Automatic **scoring** with pass/fail (70% pass threshold)
- **Category-by-category breakdown** chart
- Full **answer review** with explanations after the test
- No dependencies, no build step — pure HTML/CSS/JavaScript

## Topics Covered

| Category | Examples |
|---|---|
| Routing | OSPF, EIGRP, BGP, redistribution |
| Switching | STP/RSTP, VLANs, EtherChannel, UDLD |
| Wireless | 802.11 standards, WLC/CAPWAP, WPA3 |
| Security | TACACS+/RADIUS, DHCP Snooping, 802.1X, ACLs |
| SDN & Automation | SD-Access, VXLAN, YANG, Netmiko, NETCONF |
| Network Services | NTP, DHCP, DNS, HSRP |
| QoS | DSCP, CBWFQ, Queuing |
| IPv6 | Addressing, NDP, Anycast |
| Virtualization | Hypervisors, VRF, IaaS/PaaS/SaaS |

## Usage

1. Clone or download the repository
2. Open `index.html` in any modern web browser
3. Select the categories you want to practice
4. Choose the number of questions
5. Click **Start Test** and answer each question
6. Review your results and explanations at the end

No server or installation required.

## File Structure

```
ccnp_mc_online_test/
├── index.html        # Main application page
├── css/
│   └── styles.css    # All application styles
└── js/
    ├── questions.js  # Question bank (50 questions)
    └── app.js        # Application logic
```
