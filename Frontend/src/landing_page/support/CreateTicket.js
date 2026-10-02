import React from "react";

function CreateTicket() {
  const topics = [
    {
      title: "Account Opening",
      icon: "fa-plus-circle",
      links: [
        "Online Account Opening",
        "Offline Account Opening",
        "Company, Partnership and HUF Account",
        "NRI Account Opening",
        "Charges at Zerodha",
        "Zerodha IDFC FIRST Bank 3-in-1 Account",
        "Getting Started",
      ],
    },
    {
      title: "Your Zerodha Account",
      icon: "fa-user",
      links: [
        "Login Credentials",
        "Account Modification and Segment Addition",
        "DP ID and bank account details",
        "Your Profile",
        "Transfer and conversion of shares",
      ],
    },
    {
      title: "Trading and Markets",
      icon: "fa-bar-chart",
      links: [
        "Margin Trading Facility (MTF) and Margins",
        "Kite Web and Mobile",
        "Trading FAQs",
        "Corporate Actions",
        "Sentinel",
        "Kite Connect API",
      ],
    },
    {
      title: "Funds",
      icon: "fa-credit-card",
      links: [
        "Adding Funds",
        "Fund Withdrawal",
        "eMandates",
        "Adding Bank Accounts",
      ],
    },
    {
      title: "Console",
      icon: "fa-circle-o-notch",
      links: [
        "Reports",
        "Ledger",
        "Portfolio",
        "60 Day Challenge",
        "IPO",
        "Referral Program",
      ],
    },
    {
      title: "Coin",
      icon: "fa-circle-thin",
      links: [
        "Understanding Mutual Funds",
        "About Coin",
        "Buying and Selling through Coin",
        "Starting an SIP",
        "Managing your Portfolio",
        "Coin App",
      ],
    },
  ];

  return (
    <div className="container my-5">
      <div className="row p-3">
        <h1 className="fs-2 text-muted mb-4">
          To create a ticket, select a relevant topic
        </h1>
        {topics.map((topic, index) => (
          <div key={index} className="col-lg-4 col-md-6 col-12 p-4">
            <h4 className="fs-5 mb-3">
              <i className={`fa ${topic.icon} me-2`} aria-hidden="true"></i>{" "}
              {topic.title}
            </h4>
            {topic.links.map((link, lIndex) => (
              <div key={lIndex} className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-muted"
                  style={{ fontSize: "14px", lineHeight: "1.8" }}
                >
                  {link}
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTicket;
