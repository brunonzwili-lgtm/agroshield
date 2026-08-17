# AgroShield

## Belt 2 & 3 Submission Checklist

- [ ] Live demo link (Vercel, Netlify, or similar): [Add link]
- [ ] Contract deployment address: `CB5EPPBK2JYJKCUZNWI7JF5WJNGOORFEPYQLKUYUQ2YQJQPGIBXXZRAC`
- [ ] Transaction hash for contract interaction: [Add hash]
- [ ] Screenshot showing Mobile responsive UI: [Add link]
- [ ] Screenshot showing CI/CD pipeline running: [Add link]
- [ ] Screenshot showing Test output with 3+ passing tests: [Add link]
- [ ] Demo video link (1–2 minutes): [Add link]

---

**Decentralized Parametric Crop Insurance on Stellar**

Affordable, automatic, and transparent crop insurance for smallholder farmers — starting with maize farmers in Makueni County, Kenya.


---

### The Problem
Smallholder farmers in Africa face severe climate risks, especially drought, yet fewer than 3% have any form of crop insurance. Traditional insurance has failed them for several reasons:

- **Manual claims process is extremely slow.** After a drought, an assessor must physically visit the farm to verify the damage. This can take weeks or even months.
- **High operational costs make small premiums unviable.** The cost of sending inspectors, processing paperwork, and handling disputes is too high for the low premiums that small farmers can afford.
- **Delayed payouts often arrive too late.** By the time the farmer receives money, the next planting season has already started or passed.
- **Lack of insurance also blocks access to credit.** Banks and microfinance institutions see uninsured farmers as high risk, so they either refuse loans or charge very high interest rates.

This creates a vicious cycle:
No insurance → higher climate risk → no access to credit → low investment in better seeds/inputs → continued poverty and vulnerability. 

Makueni County in Kenya (our starting point) is a clear example of this reality — many maize farmers lose entire seasons to drought with zero financial protection.

---

### Our Solution – AgroShield
AgroShield is a decentralized parametric crop insurance platform built on Stellar (Soroban smart contracts). Instead of relying on human assessors, AgroShield uses parametric triggers:

- **Automated Triggers:** A weather oracle continuously feeds accurate rainfall data for the farmer’s specific region onto the blockchain.
- **Instant Payouts:** If rainfall falls below a pre-agreed threshold (for example, less than 25mm over 30 days) during the coverage period, the smart contract automatically triggers a payout.
- **No Friction:** The farmer receives the money directly and quickly — no claim form, no inspector, no dispute, and no long waiting period.

#### Key advantages:
- **Fast payouts** — money arrives in time for the next planting season.
- **Very low costs** — Stellar’s sub-cent transaction fees make small premiums and small payouts economically viable.
- **Transparency** — all rules and weather data are on-chain and auditable.
- **Accessibility** — designed for farmers who use mobile money and basic smartphones.

Beyond just insurance, AgroShield is building a full financial safety net for farmers:
- Early weather alerts via SMS so farmers can act before the drought hits.
- Simple crop recommendations based on weather trends.
- An on-chain coverage and claims history (CreditAttestation) that can later help farmers access better credit from lenders.

**In short:**
AgroShield removes the biggest barriers of traditional insurance and turns climate protection into fast, transparent, and affordable on-chain infrastructure for smallholder farmers.

---

### Architecture
The AgroShield system follows a modular, trustless architecture:

```text
       [ Weather Oracle ]
               |
               v
    [ Soroban Smart Contract ] <--- [ Stellar Network ]
               |
               v
    [ Frontend Dashboard ] <--- [ User Wallet (SWK) ]
```

1. **Weather Oracle**: Ingests satellite weather data.
2. **Soroban Contract**: Stores policy state and automates payouts.
3. **Frontend Dashboard**: User-friendly portal for farmers to buy coverage and track insurance status.
4. **Stellar Network**: Handles low-cost, secure settlement.

---

### Key Features
- Automatic payouts based on verified weather triggers.
- Multi-wallet support (Stellar Wallets Kit).
- Dashboard for coverage status, payout history, and weather alerts.
- **(Planned)** SMS notifications integration.
- **(Planned)** Automated weather data ingestion via decentralized oracle.
- **(Planned)** Credit score building through on-chain history (CreditAttestation).

---

### Project Structure
```text
agroshield/
├── contracts/
│   └── insurance/            # Soroban Smart Contract
│       ├── Cargo.toml
│       ├── Makefile
│       ├── src/
│       │   ├── lib.rs        # Main contract logic
│       │   └── test.rs       # Unit tests
│       └── target/           # Compiled Wasm files
├── frontend/                 # Next.js Application
│   ├── app/
│   │   ├── dashboard/        # Farmer dashboard
│   │   │   ├── coverage/
│   │   │   ├── payouts/
│   │   │   ├── profile/
│   │   │   └── weather/
│   │   └── layout.tsx
│   ├── components/           # UI Components
│   │   ├── BuyCoverageButton.tsx
│   │   ├── dashboard.tsx
│   │   └── wallet-connect-button.tsx
│   ├── lib/
│   │   └── agroshield.ts     # Contract interaction logic
│   ├── public/               # Assets
│   ├── Cargo.toml            # Workspace Cargo file
│   ├── README.md
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
└── README.md
```

---

### Roadmap
- [x] Core contract + Testnet deployment
- [x] Multi-wallet + Basic UI
- [ ] Full Testnet product (frontend + contract connected)
- [ ] Security audit + Mainnet preparation
- [ ] **Mainnet Launch** + Pilot in Makueni County
- [ ] Scale across Kenya and East Africa

#### 1. Clone the repo
```bash
git clone https://github.com/welson-ai/Agroshieldv3.git
cd Agroshieldv3
```

#### 2. Install dependencies
```bash
cd frontend
npm install
```

#### 3. Run the frontend
```bash
npm run dev
```

#### 4. Build Smart Contracts
```bash
cd ../contracts/insurance
stellar contract build
```
