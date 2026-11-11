# GoldSky smart terminal family: capability inventory (copy source)

Compiled 2026-11-10 from `C:\workspace\gs-ssp` (CLAUDE.md, docs/, commits up to 429589f) and `C:\workspace\gs-ssp-cmp` (Cael).

Copy may only use facts from this file. Each line carries a status, and the status decides how it may be written:

| Mark | Meaning | How to write it |
|---|---|---|
| ✅ Built | Code done, tried on real hardware or live | Present tense: "Apex answers…" |
| 🟡 Ready, not yet live | Code done, but only run in test stores, simulators or a sandbox, or still waiting to be deployed | "Now in pilot", "Available on request", or leave it out |
| 🔵 Planned | Designed or scheduled, not built | Only under "What's next" / "Coming soon", never with a date |
| ⛔ Do not claim | No source, or the facts say otherwise | Never |

---

## 1. AI (the lead story)

GoldSky's AI has two faces, both the same beaver:

- **Apex**, the store assistant for owners and managers. It lives in Ourea, Iris and Cael.
- **The beaver in Ourea Scan**, the ordering helper for guests, on the guest's own phone.

### 1.1 Apex: the manager's assistant

| Capability | Status | Source |
|---|---|---|
| Ask in plain words about the business: sales, count and average ticket for any period, split by day, hour, staff member, payment method or category | ✅ | 815ad5d (2.0 P1), `apex_tool_*` |
| Compare two periods, with the difference and percentage given directly | ✅ | same |
| Best and slow sellers, one item's sales trend | ✅ | same |
| Find one sale (time, amount, staff, last four digits); its items, refunds, member points | ✅ | same |
| Stock levels, low stock, every move in and out | ✅ | same |
| Members, staff hours and tips, expenses and rough profit, delivery orders | ✅ | same |
| **Every number has a source.** Amounts are computed by the database, never estimated by the model. Each number in an answer is checked against what the tools returned; a mismatch gets one rewrite, then is flagged. A "Source" tag sits under each answer. | ✅ | 815ad5d, apex_agent_design §3.3 |
| **Say it, then confirm it.** Record an expense, set a reminder, create a delivery order, finish a to-do, tick a checklist, write a note, receive / count / adjust stock, remember a store habit. One sentence can ask and act, with up to five cards. Nothing is saved until a manager taps confirm. | ✅ | 537769a (2.0 P2) |
| **Speaks up first, by fixed rules (no model):** stock that won't last 3 days, someone clocked in over 12 hours, a delivery unpaid after 2 hours, offline card sales not sent after 30 minutes, an overdue checklist or to-do, loss-prevention flags. The beaver holds up a sign with the count; tap one to ask about it. | ✅ | 9424d17 (2.0 P3) |
| Daily brief: 3 to 5 points, today against the same weekday last week at the same hour, plus what deserves a look | ✅ | apex-assistant `brief` |
| **Month-end report:** sales, tax, tips, refunds, expenses, rough profit, stock movement, best sellers, hours, loyalty, deliveries, offline card sales, every number checked | ✅ | 5b12e3f (2.0 P5) |
| Multi-store owners ask in Cael "which store did best this week", limited to their own stores | ✅ | 5b12e3f (P4 server side), 873fb3e |
| Ask by voice (speech to text), English and Chinese | ✅ | ca73441, apex-assistant transcription |
| Photograph a receipt to record an expense: the camera finds the receipt, focuses, squares it, reads the amount, shows a card to confirm. Tuned on 11 real receipts. | ✅ | eb6ed1e |
| Animated beaver: idle, listening, thinking, done, holding a sign | ✅ | 815ad5d, 9424d17 |
| Never does: refunds, price changes, deleting records, adding staff, payment settings. Asked, it says where to do it. | ✅ | apex_agent_design §3.2 |
| Store text (item names, notes) is treated as data, never as instructions (prompt-injection guard) | ✅ | same, §3.6 |
| "What guests asked": dishes guests asked for that aren't on the menu, diets asked about often, shown to the owner with alerts | 🟡 Data and alerts built; this part of Apex not yet deployed | a014dd4, Cael 1f69f34 |
| Cashier mode (look up sales and stock, write notes only) | 🔵 Waiting on owner's decision | apex_agent_design §6 |
| Alerts pushed to the owner's phone | 🔵 Waiting on owner's decision | same |

**Model note (keep out of copy):** development runs on Groq's free tier; paying stores move to Claude Haiku 5.5. The free tier's rate limit can add about 20 seconds when busy. Do not name a model in copy, and do not promise instant answers.

### 1.2 The beaver in Ourea Scan: the guest's ordering helper

| Capability | Status | Source |
|---|---|---|
| **Order in one sentence:** "Two beef noodles, one without onion, and a cold dish" becomes a card with real menu lines, quantities and notes. It asks when unsure ("which cold dish?"), says plainly when something isn't on the menu, and adds to the cart only when the guest taps "Add all". | ✅ Deployed, tried with real sentences | aa63b58, 33dfca2 |
| Never invents a dish: only real, orderable items from this store's menu; never picks a required option for the guest | ✅ | checkOrder (tested) |
| **The right amount for the table:** asks party size and spice level at the door, shows "Beaver's picks for 4", and answers "is this enough?" with enough / a bit short / too much, naming what to cut | ✅ | f96ed24 |
| Allergies, no-spice and top-up size enforced on the server | ✅ | same |
| **Explains a dish** in 2 to 4 sentences in the guest's language; allergens and diets only from the store's own facts | ✅ | b4ac9b7 |
| Ordering and asking in one window: a big mic and one card; follows on from what was said ("then two of those") | ✅ | f474da3 |
| English, French, Chinese, Arabic (right to left) | ✅ | b4ac9b7 |
| Answers in the language of the question | ✅ | 9e19726 |
| Scenario tests: a Western grill and a Kanata Turkish kebab shop, run end to end in Arabic, from ordering to cash with a tip | ✅ Test stores | 9e19726 |

### 1.3 AI claims we can make (all sourced)

- **Ask in plain words. Get numbers you can check.**
- **It suggests. You decide.** Nothing is saved until a manager confirms.
- **Every number has a source.**
- **Your guests order in one sentence, in their own language.**
- **It never invents a dish.**
- **It speaks up before you ask:** low stock, a long shift, an unpaid delivery.

⛔ Do not claim: on-device AI, a local large model, offline AI, "AI runs your store", "AI decides for you", any accuracy figure (the 98% evaluation bar is a target, not a result), instant answers.

---

## 2. The five product lines

### Ourea: at the counter

| Capability | Status |
|---|---|
| Countertop POS: product grid, cart, card, cash, QR, member card | ✅ |
| Quick service: dine in / take out, order notes, daily call numbers, kitchen tickets | ✅ |
| Dine in: floor plan, checks, rounds, split payments, network kitchen printer | ✅ |
| Cash drawer and shifts: float, cash in / out (taking out needs a manager), count at close, over / short worked out | ✅ |
| Ourea Eye customer display: a WizarPOS Q3mini as both card terminal and guest-facing screen, tips chosen by the guest | ✅ |
| Partial refunds (pick the returned items, manager PIN) | ✅ |
| Offline card sales (opt-in per terminal, off by default, per-sale and count limits) | ✅ (the store carries the risk) |
| Journal: notes, to-dos, checklists, expenses (receipt camera), stock; delivery orders | ✅ |
| Discounts and guest-chosen tips | ✅ |
| **Ourea Scan QR ordering:** one shared cart per table, straight to the kitchen by default, call a server, dish photos and translated names, allergy filter, order progress | ✅ Run end to end in test stores and on the emulator |
| Ourea Scan pay at the table: the whole bill, a share or an amount, plus tip, on the guest's phone | 🟡 Tested in the Nuvei sandbox |
| Uber Eats / DoorDash orders | 🔵 Waiting on platform partner approval, or through a middleware |

### Iris: in hand

| Capability | Status |
|---|---|
| The full counter checkout: cart, tip, payment, receipt, insights | ✅ |
| Take payment at the table, card or cash, with quick amounts and change | ✅ |
| Runs on three makers' hardware: PAX, WizarPOS, ID TECH | ✅ |
| Partial refunds, offline card sales, journal, delivery orders, Apex | ✅ (as on Ourea) |

### Aegis: when no one is there (a series; each business is its own app)

| App | Business | Status |
|---|---|---|
| **Aegis Wash** | Self-serve car wash: pick a package, pay by card or code, timed water, voice and animation, member codes, coupons, promotions (buy 4 get 1) | ✅ **Live at a real site** (Eagleson, released through 1.1.13) |
| **Aegis Timer** | Pay-by-time equipment; first product is the vacuum beside the wash ($2 / 4 min, $3 / 5 min) | ✅ Released with Wash (1.2.11) |
| **Aegis Vend** | Card terminal on a vending machine over MDB, item first or card first, member codes, English and French | 🟡 Terminal side done and running on test machines; no live site yet |
| **Aegis Vend Screen** | Big screen beside the machine, follows the terminal, plays ads when idle | 🟡 |
| **Aegis Flex** | A partner's own machine: we take the payment, their controller hands the product over. The money is kept only when the controller confirms "dispensed"; otherwise the charge is reversed. First lead: Outdoor Vend's outdoor firewood kiosk (Alberta). | 🟡 Our terminal is done; the partner's controller isn't yet |
| **Aegis Laundry** | Self-serve laundry, planned as one terminal for 8 machines | 🔵 Demo screen only |
| **Aegis EV** | EV charging | 🔵 Partial code, no working product |
| Aegis Parking | Parking | 🔵 Not started |
| Fuel | — | ⛔ Not a GS-SSP line; the site's current wording needs owner confirmation |

Shared by every Aegis app:

- **Never charges without delivering:** if the machine doesn't confirm, the payment is reversed or given back. ✅
- Plays Cael ads (images and video) when idle. ✅
- Voice prompts, key ones spoken three times, adjustable volume. ✅
- Restarts after a power cut or crash and opens straight into the app. ✅
- Remote lock and remote reversal from Cael. ✅

### Apex: the AI assistant

See section 1.

### Cael: every store in one place (`gs-ssp-cmp`)

| Capability | Status |
|---|---|
| Organizations, locations and devices; moving a device between stores, resetting its identity | ✅ |
| Prices and products (including partner-machine slots, sold out and tile pictures), published to terminals | ✅ |
| Dish photos and English / Chinese dish names, used directly in Ourea Scan | ✅ |
| Branding: logo, merchant name and welcome text sent to terminals | ✅ |
| Ad playlists per device, with proof of play | ✅ |
| Transaction monitor; remote void or refund (GoldSky admins only) | ✅ |
| Voucher hub: coupons in bulk, single use by default, the store's own terms printed on the ticket | ✅ |
| Device heartbeat, remote commands (reboot, lock), diagnostics | ✅ |
| Ask Apex in Cael, see store alerts, compare stores | ✅ |
| Shared test simulator (stands in for the machine side; payments are real) | ✅ Internal tool, not for marketing |
| Acquirer onboarding documents | 🟡 |
| Distributors and multi-level organization roles | 🔵 |

---

## 3. The foundation: GS-SSP (Raqia)

| Fact | Status |
|---|---|
| One platform runs the counter, the handheld, the unattended machines and the cloud | ✅ |
| Three terminal makers: PAX (IM30), WizarPOS (Q3mini, Q2), ID TECH (NEO2 / NEO3) | ✅ |
| Card plus QR; the acquirer today is Nuvei, settling straight into the store's own account | ✅ |
| Keeps working offline: cached configuration, queued transactions sent once back online | ✅ |
| Member balances, points, coupons | ✅ |
| Runs from Android 7.1 up, so older devices qualify | ✅ ("runs on terminals you may already have" only after confirming the model) |

Unattended payment limits (v2.54); copy must stay inside them:

- the self-serve payment app can reverse a charge but cannot refund one;
- Nuvei does not support offline card sales;
- an Interac pre-authorization holds for 2 hours.

So Aegis copy says "no product, no charge" and **never "refunds any time"**.

---

## 4. Copy skeleton (after the structure of the SI-TECH article)

**Headline:** Every counter, every bay, one mind. (candidate)
**Subhead:** The GoldSky smart terminal family: at the counter, in hand, unattended, in the cloud, and an assistant that listens.

1. **Apex: the assistant that listens.** Ask in plain words; every number has a source. Say it and it's done, once you confirm. It speaks up before you ask.
2. **Ourea: the counter that holds steady.** Quick service, dine in, QR ordering, cash drawer and shifts, a customer display. Guests order in one sentence, in their own language.
3. **Iris: checkout that walks to the table.** Handheld payment, card or cash, on three makers' hardware.
4. **Aegis: on guard when no one is there.** Car wash and vacuum running at a real site today; vending and partner machines coming soon. No product, no charge.
5. **Cael: every store in one place.** Prices, menus, screens, ads, coupons and sales, managed from anywhere.

**Close:** From the counter at opening time to the table at lunch, from the wash bay at dusk to the vending machine at midnight: every place that takes money is watched over, even when no one is there.

**What's next (only here):** self-serve laundry, EV charging, delivery platform orders, pay at the table, alerts on your phone.
