import React, { useState, useEffect } from "react";

const initialStocks = [
  { s: "NIFTY 50", p: 25168.65, c: 0.42 },
  { s: "SENSEX", p: 82213.95, c: 0.36 },
  { s: "RELIANCE", p: 1389.4, c: -0.18 },
  { s: "TCS", p: 3042.2, c: 0.73 },
  { s: "INFY", p: 1518.7, c: 1.12 },
  { s: "HDFCBANK", p: 967.45, c: -0.34 },
  { s: "ICICIBANK", p: 1398.3, c: 0.58 },
  { s: "SBIN", p: 801.1, c: -0.62 },
  { s: "ITC", p: 405.65, c: 0.21 },
  { s: "WIPRO", p: 542.8, c: -0.08 },
  { s: "TATAMOTORS", p: 1018.4, c: 1.02 },
];

const initialHoldings = [
  ["RELIANCE", 12, "₹1,286.20", "₹1,389.40", "+8.02%", "+₹1,238.40"],
  ["TCS", 8, "₹2,780.50", "₹3,042.20", "+9.41%", "+₹2,093.60"],
  ["INFY", 15, "₹1,326.10", "₹1,518.70", "+14.52%", "+₹2,889.00"],
  ["HDFCBANK", 20, "₹918.30", "₹967.45", "+5.35%", "+₹983.00"],
  ["ITC", 30, "₹382.10", "₹405.65", "+6.16%", "+₹706.50"],
];

const initialPositions = [
  ["NIFTY 50", "BUY", 50, "₹25,012.00", "₹25,168.65", "+₹7,832.50"],
  ["RELIANCE", "BUY", 10, "₹1,372.40", "₹1,389.40", "+₹170.00"],
  ["SBIN", "SELL", 15, "₹808.20", "₹801.10", "+₹106.50"],
];

function App() { const [username, setUsername] = useState(""); useEffect(() => { fetch((process.env.REACT_APP_BACKEND_URL || "http://localhost:3002") + "/profile", { credentials: "include" }).then(res => res.json()).then(data => { if(data.status) setUsername(data.user); else window.location.href = (process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000") + "/signup"; }).catch(() => window.location.href = (process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000") + "/signup"); }, []); 
  const [page, setPage] = useState("Dashboard");
  const [stocks] = useState(initialStocks);
  const [orders, setOrders] = useState([]);
  const [q, setQ] = useState("");
  const [order, setOrder] = useState(null);
  const [profile, setProfile] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const [allHoldings, setAllHoldings] = useState(initialHoldings);
  const [allPositions, setAllPositions] = useState(initialPositions);

  React.useEffect(() => {
    fetch((process.env.REACT_APP_BACKEND_URL || "http://localhost:3002") + "/allHoldings")
      .then((res) => res.json())
      .then((data) => {
        const formattedHoldings = data.map((item) => [
          item.name,
          item.qty,
          "₹" + item.avg.toFixed(2),
          "₹" + item.price.toFixed(2),
          item.net,
          item.day,
        ]);
        setAllHoldings(formattedHoldings);
      })
      .catch((err) => console.log(err));

    fetch((process.env.REACT_APP_BACKEND_URL || "http://localhost:3002") + "/allPositions")
      .then((res) => res.json())
      .then((data) => {
        const formattedPositions = data.map((item) => [
          item.name,
          "BUY", // Mocking side as "BUY" since DB has CNC/MIS for product
          item.qty,
          "₹" + item.avg.toFixed(2),
          "₹" + item.price.toFixed(2),
          item.net,
        ]);
        setAllPositions(formattedPositions);
      })
      .catch((err) => console.log(err));
  }, []);

  const filtered = stocks.filter((x) =>
    x.s.toLowerCase().includes(q.toLowerCase()),
  );

  const placeOrder = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const newOrder = {
      id: Date.now(),
      s: order.s,
      side: order.side,
      qty: f.get("qty") || 1,
      price: f.get("price") || order.p,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "COMPLETE",
    };

    // Also send to backend
    fetch((process.env.REACT_APP_BACKEND_URL || "http://localhost:3002") + "/newOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: order.s,
        qty: f.get("qty") || 1,
        price: f.get("price") || order.p,
        mode: order.side,
      }),
    });

    setOrders((prev) => [newOrder, ...prev]);
    setOrder(null);
    setPage("Orders");
  };

  if(!username) return null;

  return (
      <div className="app">
      {/* Top Bar */}
      <header className="top">
        <div className="logo" onClick={() => window.location.href = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000"}>
          <b>z</b>
          <span>zerodha</span>
        </div>

        <div className="indices">
          <span>
            NIFTY 50 <b>25,168.65</b> <i>+0.42%</i>
          </span>
          <span>
            SENSEX <b>82,213.95</b> <i>+0.36%</i>
          </span>
        </div>

        <nav>
          {[
            "Dashboard",
            "Orders",
            "Holdings",
            "Positions",
            "Funds",
            "Apps",
          ].map((tab) => (
            <button
              key={tab}
              className={page === tab ? "on" : ""}
              onClick={() => setPage(tab)}
            >
              {tab}
              {tab === "Orders" && orders.length ? ` (${orders.length})` : ""}
            </button>
          ))}
        </nav>

        <button className="user" onClick={() => setProfile(!profile)}><span>{username ? username[0].toUpperCase() : "U"}</span> {username} </button>

        {profile && (
          <div className="profile">
            <b>{username}</b>
            <small>ZERODHA • DEMO ACCOUNT</small>
            <hr />
            <button onClick={() => setProfile(false)}>Profile</button>
            <button onClick={() => setProfile(false)}>Settings</button>
            <button onClick={() => setProfile(false)}>
              Keyboard shortcuts
            </button>
            <button
              onClick={() => {
                setProfile(false);
                window.location.href = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
              }}
            >
              Back to Home (3000)
            </button>
          </div>
        )}
      </header>

      {/* Main Layout */}
      <div className="layout">
        {/* Marketwatch Sidebar */}
        <aside className="watch">
          <div className="watchtop">
            {[1, 2, 3, 4].map((num) => (
              <b
                key={num}
                style={{
                  background: activeTab === num ? "#edf4fc" : "none",
                  color: activeTab === num ? "#387ed1" : "#888",
                }}
                onClick={() => setActiveTab(num)}
              >
                {num}
              </b>
            ))}
            <em>＋</em>
            <small>{stocks.length}/100</small>
          </div>

          <div className="search">
            ⌕
            <input
              placeholder="Search eg: infy, bse, nifty"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <kbd>⌘ K</kbd>
          </div>

          <div className="list">
            {filtered.map((x) => (
              <div className="stock" key={x.s}>
                <div>
                  <b>{x.s}</b>
                  <small>NSE</small>
                </div>
                <div className="quote">
                  <span>₹{x.p.toLocaleString("en-IN")}</span>
                  <span className={x.c >= 0 ? "green" : "red"}>
                    {x.c >= 0 ? "+" : ""}
                    {x.c}%
                  </span>
                </div>
                <div className="hover">
                  <button onClick={() => setOrder({ ...x, side: "BUY" })}>
                    B
                  </button>
                  <button onClick={() => setOrder({ ...x, side: "SELL" })}>
                    S
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="watchfoot">
            ⌘ Search &nbsp; • &nbsp; Orders &nbsp; • &nbsp; Holdings
          </div>
        </aside>

        {/* Content Area */}
        <main className="main">
          {page === "Dashboard" && <Home setPage={setPage} username={username} />}
          {page === "Orders" && <Orders orders={orders} />}
          {page === "Holdings" && <Holdings data={allHoldings} />}
          {page === "Positions" && <Positions data={allPositions} />}
          {page === "Funds" && <Funds />}
          {page === "Apps" && <Apps />}
        </main>
      </div>

      {/* Order Modal */}
      {order && (
        <div className="shade" onClick={() => setOrder(null)}>
          <form
            className="modal"
            onSubmit={placeOrder}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modalhead">
              <div>
                <small>{order.side} ORDER</small>
                <h2>{order.s}</h2>
              </div>
              <button type="button" onClick={() => setOrder(null)}>
                ×
              </button>
            </div>

            <div className="order-tabs">
              <b>Regular</b>
              <span>AMO</span>
            </div>

            <div className="fields">
              <label>
                Quantity
                <input name="qty" type="number" min="1" defaultValue="1" />
              </label>
              <label>
                Price
                <input
                  name="price"
                  type="number"
                  step="0.05"
                  defaultValue={order.p}
                />
              </label>
            </div>

            <div className="details">
              <span>
                Product <b>CNC</b>
              </span>
              <span>
                Order <b>LIMIT</b>
              </span>
            </div>

            <div className="total">
              <span>Approx. value</span>
              <b>₹{order.p.toLocaleString("en-IN")}</b>
            </div>

            <div className="actions">
              <button type="button" onClick={() => setOrder(null)}>
                Cancel
              </button>
              <button className={order.side === "BUY" ? "buy" : "sell"}>
                {order.side === "BUY" ? "Buy" : "Sell"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Header({ eyebrow, title, sub, button }) {
  return (
    <div className="title">
      <div>
        <small>{eyebrow}</small>
        <h1>{title}</h1>
        <p>{sub}</p>
      </div>
      {button}
    </div>
  );
}

function Home({ setPage, username }) {
  return (
    <>
      <Header
        eyebrow="OVERVIEW"
        title={"Hi, " + username + "!"}
        sub="Here's your investment snapshot for today."
        button={
          <button className="outline" onClick={() => setPage("Funds")}>
            Add funds
          </button>
        }
      />
      <div className="cards">
        <Card
          t="Equity"
          v="₹1,24,680.00"
          s="Margin available"
          a="Add funds"
          onClick={() => setPage("Funds")}
        />
        <Card t="Day's P&L" v="+₹2,840.25" s="+2.31% today" />
        <Card
          t="Holdings"
          v="₹4,82,350.70"
          s="+₹38,240.70 overall"
          a="View"
          onClick={() => setPage("Holdings")}
        />
      </div>

      <section>
        <div className="sect">
          <div>
            <h2>Portfolio</h2>
            <p>Performance across your investments</p>
          </div>
          <button onClick={() => setPage("Holdings")}>View holdings →</button>
        </div>
        <div className="portfolio">
          <div className="bars">
            {[25, 35, 30, 43, 38, 55, 49, 65, 58, 76, 70, 88, 80, 94].map(
              (h, i) => (
                <i style={{ height: h + "%" }} key={i} />
              ),
            )}
          </div>
          <div className="legend">
            <span>
              Total investment<b>₹4,44,110</b>
            </span>
            <span>
              Current value<b>₹4,82,350</b>
            </span>
            <span>
              Overall returns<b className="green">+8.61%</b>
            </span>
          </div>
        </div>
      </section>

      <section>
        <div className="sect">
          <div>
            <h2>Quick actions</h2>
            <p>Jump into your trading workflow</p>
          </div>
        </div>
        <div className="quick">
          {[
            ["Orders", "View order book"],
            ["Positions", "Open positions"],
            ["Holdings", "Portfolio"],
            ["Funds", "Manage balance"],
          ].map((a) => (
            <button key={a[0]} onClick={() => setPage(a[0])}>
              <b>{a[0]}</b>
              <span>{a[1]}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

function Card({ t, v, s, a, onClick }) {
  return (
    <div className="card">
      <div>
        <span>{t}</span>
        {a && <button onClick={onClick}>{a}</button>}
      </div>
      <strong>{v}</strong>
      <small className={v[0] === "+" ? "green" : ""}>{s}</small>
    </div>
  );
}

function Orders({ orders }) {
  return (
    <>
      <Header
        eyebrow="TRADING"
        title="Orders"
        sub="Your recent orders and execution status."
        button={<button className="outline">Export</button>}
      />
      <div className="table">
        <div className="tabs">
          <b>All orders</b>
          <span>Open</span>
          <span>Executed</span>
          <span>Rejected</span>
        </div>
        {!orders.length ? (
          <Empty
            title="No orders yet"
            sub="Place a buy or sell order from the Marketwatch on the left."
          />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Type</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>
                    <b>{o.s}</b>
                  </td>
                  <td>
                    <label
                      className={
                        o.side === "BUY" ? "tag buytag" : "tag selltag"
                      }
                    >
                      {o.side}
                    </label>
                  </td>
                  <td>{o.qty}</td>
                  <td>₹{Number(o.price).toFixed(2)}</td>
                  <td className="green">{o.status}</td>
                  <td>{o.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

function Holdings({ data = [] }) {
  return (
    <>
      <Header
        eyebrow="PORTFOLIO"
        title="Holdings"
        sub="Securities owned in your demat account."
        button={<button className="outline">Download</button>}
      />
      <div className="strip">
        <Metric a="Current value" b="₹4,82,350.70" />
        <Metric a="Investment" b="₹4,44,110.00" />
        <Metric a="Total returns" b="+₹38,240.70" green />
        <Metric a="Returns" b="+8.61%" green />
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Returns</th>
              <th>P&amp;L</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r) => (
              <tr key={r[0]}>
                <td>
                  <b>{r[0]}</b>
                  <small>NSE</small>
                </td>
                <td>{r[1]}</td>
                <td>{r[2]}</td>
                <td>{r[3]}</td>
                <td className="green">{r[4]}</td>
                <td className="green">{r[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Positions({ data = [] }) {
  return (
    <>
      <Header
        eyebrow="TRADING"
        title="Positions"
        sub="Your open trades and current P&amp;L."
      />
      <div className="strip">
        <Metric a="Day's P&amp;L" b="+₹8,109.00" green />
        <Metric a="Open positions" b="3" />
        <Metric a="Used margin" b="₹68,420" />
        <Metric a="Available" b="₹56,260" />
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Side</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&amp;L</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r) => (
              <tr key={r[0]}>
                <td>
                  <b>{r[0]}</b>
                </td>
                <td>
                  <label
                    className={r[1] === "BUY" ? "tag buytag" : "tag selltag"}
                  >
                    {r[1]}
                  </label>
                </td>
                <td>{r[2]}</td>
                <td>{r[3]}</td>
                <td>{r[4]}</td>
                <td className="green">{r[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Metric({ a, b, green }) {
  return (
    <div>
      <span>{a}</span>
      <b className={green ? "green" : ""}>{b}</b>
    </div>
  );
}

function Funds() {
  return (
    <>
      <Header
        eyebrow="ACCOUNT"
        title="Funds"
        sub="Manage your trading balance and margins."
        button={<button className="primary">Add funds</button>}
      />
      <div className="funds">
        <div>
          <span>Available margin</span>
          <b>₹1,24,680</b>
          <small>Can be used for trading</small>
        </div>
        <div>
          <span>Used margin</span>
          <b>₹68,420</b>
          <small>Current exposure</small>
        </div>
        <div>
          <span>Available cash</span>
          <b>₹56,260</b>
          <small>Withdrawable balance</small>
        </div>
      </div>
      <div className="fundbox">
        <div className="sect">
          <div>
            <h2>Fund details</h2>
            <p>Account balance overview</p>
          </div>
        </div>
        {[
          ["Opening balance", "₹1,10,000"],
          ["Payin today", "+₹25,000"],
          ["Today's P&L", "+₹2,840"],
          ["Available balance", "₹1,24,680"],
        ].map((x) => (
          <div className="fundrow" key={x[0]}>
            <span>{x[0]}</span>
            <b className={x[1][0] === "+" ? "green" : ""}>{x[1]}</b>
          </div>
        ))}
      </div>
    </>
  );
}

function Apps() {
  return (
    <>
      <Header
        eyebrow="ZERODHA"
        title="Apps"
        sub="Tools that extend your trading workflow."
      />
      <div className="apps">
        {[
          [
            "S",
            "Screener",
            "Discover stocks using technical and fundamental filters.",
          ],
          [
            "C",
            "Console",
            "Portfolio analytics, reports, statements and more.",
          ],
          ["C", "Coin", "Invest in direct mutual funds and other products."],
          ["K", "Kite Connect", "Build applications with Zerodha APIs."],
        ].map((a) => (
          <div key={a[1]}>
            <i>{a[0]}</i>
            <h3>{a[1]}</h3>
            <p>{a[2]}</p>
            <button>Open →</button>
          </div>
        ))}
      </div>
    </>
  );
}

function Empty({ title, sub }) {
  return (
    <div className="empty">
      <b>◎</b>
      <h3>{title}</h3>
      <p>{sub}</p>
    </div>
  );
}

export default App;





