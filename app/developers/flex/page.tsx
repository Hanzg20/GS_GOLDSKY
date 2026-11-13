import type { Metadata } from 'next';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Aegis Flex Controller API v1 · GoldSky Developers',
  description:
    'The interface between a GoldSky Aegis Flex payment terminal and your machine’s controller: a status check, a dispense call, and the money rules behind them.',
};

// Source: C:\workspace\gs-ssp\docs\partner\flex_controller_api.md (v1). Keep the
// two in step. The serial number in the example is a placeholder, and the
// simulator is offered on request rather than linked (it lives in a private repo).

function Code({ children }: { children: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-xl bg-night p-5 font-mono text-[13px] leading-relaxed text-cream dark:ring-1 dark:ring-inset dark:ring-white/10">
      <code>{children}</code>
    </pre>
  );
}

function C({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-paper-deep px-1.5 py-0.5 font-mono text-[0.9em] text-ink">{children}</code>;
}

function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-line">
      <table className="body-6 w-full min-w-[520px] text-left">
        <thead className="bg-paper-deep">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="caption-4 px-4 py-3 uppercase tracking-wider text-ink-mute">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-top text-ink-soft">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TOC = [
  ['connection', 'Connection'],
  ['status', '1. Status'],
  ['dispense', '2. Dispense'],
  ['money', 'Money rules'],
  ['records', 'Records'],
  ['testing', 'Testing'],
] as const;

const h2 = 'heading-4 scroll-mt-28';
const p = 'body-4 mt-4 text-ink-soft';
const ul = 'body-4 mt-4 list-disc space-y-2 pl-5 text-ink-soft';

export default function FlexApiPage() {
  return (
    <section className="px-4 pb-24 pt-32 md:pt-40">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
        {/* side nav */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <a href="/developers" className="body-6 inline-flex items-center gap-1 text-ink-soft hover:text-ink">
            <ArrowLeft size={14} weight="bold" /> Developers
          </a>
          <nav aria-label="On this page" className="mt-6 hidden lg:block">
            <ul className="space-y-2">
              {TOC.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="body-6 text-ink-mute hover:text-ink">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="max-w-[720px]">
          <p className="caption-4 uppercase tracking-widest text-brand">API reference · v1</p>
          <h1 className="heading-2 mt-4">Aegis Flex Controller API</h1>
          <p className="body-3 mt-6 text-ink-soft">
            GoldSky Aegis Flex is the payment terminal in front of your machine: the customer chooses and pays on
            the terminal, and your controller hands the product over. This is the interface between the two. It is
            all your controller needs to implement, with no GoldSky hardware or SDK.
          </p>

          <h2 id="connection" className={`${h2} mt-14`}>
            Connection
          </h2>
          <ul className={ul}>
            <li>The terminal (WizarPOS Q3mini) reaches your controller over the site LAN (Ethernet), by HTTP.</li>
            <li>
              Your controller runs a small HTTP server, for example on <C>192.168.1.50:8080</C>. The technician
              enters that address on the terminal.
            </li>
            <li>
              Optional: a shared token. When set, every request carries <C>Authorization: Bearer &lt;token&gt;</C>;
              reject requests without it with <C>401</C>.
            </li>
            <li>JSON, UTF‑8. Ignore unknown fields: new fields may be added within v1.</li>
            <li>No card data is ever sent to the controller.</li>
          </ul>

          <h2 id="status" className={`${h2} mt-14`}>
            1. Status · <C>GET /flex/v1/status</C>
          </h2>
          <p className={p}>
            Called every 10 seconds. While your controller is not ready (door jammed, out of stock, service mode)
            or doesn’t answer within 3 seconds, the terminal stops selling and shows “NOT AVAILABLE”.
          </p>
          <p className={p}>
            Response <C>200</C>:
          </p>
          <Code>{`{ "ready": true, "message": "OK", "sold_out": ["3"] }`}</Code>
          <Table
            head={['Field', 'Type', 'Meaning']}
            rows={[
              [<C key="a">ready</C>, 'boolean', <>
                <C>true</C> = able to hand over products now
              </>],
              [<C key="b">message</C>, 'string, optional', 'Shown to the technician, e.g. "door sensor fault".'],
              [
                <C key="c">sold_out</C>,
                'array of strings, optional',
                'The slots you have run out of. Those products show as SOLD OUT and can’t be bought; the others still sell. Absent or empty means everything is in stock. When every product is sold out, the terminal shows NOT AVAILABLE.',
              ],
            ]}
          />

          <h2 id="dispense" className={`${h2} mt-14`}>
            2. Dispense · <C>POST /flex/v1/dispense</C>
          </h2>
          <p className={p}>
            Sent once the payment is approved. Answer <strong className="text-ink">when the hand‑over is finished</strong>{' '}
            (the customer has taken the product, or it failed), not before. The terminal waits until{' '}
            <C>deadline_ms</C> plus 10 seconds.
          </p>
          <p className={p}>Request:</p>
          <Code>{`{
  "order_id": "FLX-1793906821219",
  "product_id": "b0c6…",
  "slot": "2",
  "name": "2 Bags",
  "quantity": 2,
  "amount_cents": 1900,
  "currency": "CAD",
  "payment_method": "CARD",
  "payment_flow": "PREAUTH",
  "terminal_sn": "WP0000000000000",
  "deadline_ms": 1793906911219
}`}</Code>
          <Table
            head={['Field', 'Meaning']}
            rows={[
              [<C key="a">order_id</C>, 'Unique per sale. Use it as the idempotency key (see Money rules).'],
              [<><C>product_id</C>, <C>slot</C>, <C>name</C></>, 'The product as configured in GoldSky Cael.'],
              [<C key="c">quantity</C>, 'Units to hand over (e.g. bags).'],
              [<><C>amount_cents</C>, <C>currency</C></>, 'What the customer paid.'],
              [<C key="e">payment_method</C>, <><C>CARD</C> or <C>VIP</C> (GoldSky member code).</>],
              [
                <C key="f">payment_flow</C>,
                <>
                  <C>SALE</C>: <C>amount_cents</C> is already charged. <C>PREAUTH</C>: it is only held on the card,
                  and you may say how much of it to charge (below).
                </>,
              ],
              [<C key="g">terminal_sn</C>, 'The terminal’s serial number.'],
              [
                <C key="h">deadline_ms</C>,
                <>
                  Epoch milliseconds. <strong className="text-ink">Do not start a hand‑over after this time</strong>;
                  answer <C>FAILED</C>.
                </>,
              ],
            ]}
          />
          <p className={p}>
            Response <C>200</C>:
          </p>
          <Code>{`{ "order_id": "FLX-1793906821219", "result": "DISPENSED" }`}</Code>
          <p className={p}>or</p>
          <Code>{`{ "order_id": "FLX-1793906821219", "result": "FAILED", "reason": "door did not open" }`}</Code>
          <Table
            head={['result', 'What the terminal does']}
            rows={[
              [
                <C key="a">DISPENSED</C>,
                <>
                  Keeps the payment and shows “TAKE YOUR ITEM”. On a <C>PREAUTH</C> order, an optional{' '}
                  <C>amount_cents</C> says what to charge of the hold (e.g. by weight; never more than held; absent
                  means all of it; <C>0</C> releases it).
                </>,
              ],
              [<C key="b">FAILED</C>, 'Voids the payment. The customer is not charged.'],
            ]}
          />
          <p className={p}>For example, a held order settled at what was actually taken:</p>
          <Code>{`{ "order_id": "FLX-1793906821219", "result": "DISPENSED", "amount_cents": 1250 }`}</Code>

          <h2 id="money" className={`${h2} mt-14`}>
            Money rules
          </h2>
          <p className={p}>Why the API is shaped like this:</p>
          <ul className={ul}>
            <li>
              <strong className="text-ink">Only an explicit DISPENSED for the same order_id keeps the money.</strong>{' '}
              Any other answer, an HTTP error, or no answer by the deadline voids the payment.
            </li>
            <li>
              So if your controller hands over the product but its answer is lost, the customer is not charged.
              Your controller should log every order and its outcome; GoldSky Cael shows the terminal’s side, and
              the two can be reconciled by <C>order_id</C>.
            </li>
            <li>
              <strong className="text-ink">Idempotency:</strong> if the same <C>order_id</C> arrives again, return
              the earlier outcome. Never hand over twice.
            </li>
            <li>
              Never start after <C>deadline_ms</C>.
            </li>
          </ul>

          <h2 id="records" className={`${h2} mt-14`}>
            Records
          </h2>
          <p className={p}>
            Every sale (paid, voided, failed) is recorded in GoldSky Cael with its <C>order_id</C>. Real‑time
            delivery of these records to your own cloud is part of the integration project.
          </p>

          <h2 id="testing" className={`${h2} mt-14`}>
            Testing without the machine
          </h2>
          <p className={p}>
            We provide a stand‑in controller (Python 3, no packages) with developer access. Run it on a PC on the
            terminal’s LAN and enter <C>&lt;pc-ip&gt;:8080</C> on the terminal.
          </p>

          <div className="mt-14 rounded-2xl border border-line bg-paper-deep p-6 md:p-8">
            <p className="title-2">Building a controller?</p>
            <p className="body-5 mt-2 text-ink-soft">Get the stand‑in controller and a test terminal set up with us.</p>
            <div className="mt-6">
              <Button href="/developers#access">Request developer access</Button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
