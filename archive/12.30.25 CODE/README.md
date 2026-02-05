# Fantasy Trader v2 - Live Stock Data & University Courses

A gamified fantasy investing platform with **live stock data from Yahoo Finance** and **educational content from MIT OpenCourseWare and Rice University**.

## 🚀 What's New in v2

### Live Market Data
- **Yahoo Finance Integration**: Real-time stock prices, daily changes, volume, and more
- **50+ Stocks**: Coverage across all major sectors (Tech, Finance, Healthcare, Consumer, Energy, Industrial)
- **Market Status**: Shows market open/closed status with countdown to next open
- **Auto-refresh**: Prices update every 60 seconds when market is open

### University-Level Education
- **MIT OpenCourseWare**: Finance Theory I (Prof. Andrew Lo), FinTech (Prof. Gary Gensler)
- **Rice University**: Investment & Portfolio Management, Behavioral Finance
- **25+ Courses**: From beginner fundamentals to advanced options trading
- **120+ Learning Modules**: Structured learning paths

## 📁 File Structure

```
fantasy-trader-v2/
├── index.html              # Landing page with signup/login
├── app.html                # Main dashboard with live stock data
├── education.html          # Education center (MIT/Rice courses)
├── features.html           # Features overview
├── how-it-works.html       # How it works page
├── images/
│   └── logo.png
├── SETUP_GOOGLE_SHEETS.md  # Google Sheets integration guide
└── README.md               # This file
```

## 🔧 Setup Instructions

### 1. Deploy to Netlify (Recommended)

1. Create a free account at [netlify.com](https://netlify.com)
2. Drag and drop the `fantasy-trader-v2` folder to Netlify
3. Your site will be live in seconds!

### 2. Configure Google Sheets (Optional - for email capture)

Follow the instructions in `SETUP_GOOGLE_SHEETS.md` to capture signup and waitlist emails in Google Sheets.

## 📈 Live Stock Data

### How It Works

The app fetches live stock data from Yahoo Finance using their public API endpoints. Data includes:

- **Real-time Price**: Current market price
- **Daily Change**: Percentage change from previous close
- **Volume**: Trading volume
- **Day Range**: High and low for the day
- **52-Week Range**: High and low for the year
- **Market Cap**: Company market capitalization

### Stocks Included

**Technology (QB)**
- AAPL, MSFT, GOOGL, META, CRM, ADBE, ORCL, NOW, INTC, CSCO

**Hardware (RB)**
- NVDA, AMD, AVGO, QCOM, TXN, MU, AMAT, LRCX

**Consumer (WR)**
- AMZN, TSLA, HD, NKE, SBUX, MCD, TGT, COST, WMT, DIS

**Finance (TE)**
- JPM, V, MA, BAC, GS, MS, BLK, AXP, C, WFC

**Healthcare (LB)**
- JNJ, UNH, PFE, MRK, ABBV, LLY, TMO, ABT, DHR, BMY

**Energy (DL)**
- XOM, CVX, COP, SLB, EOG, PXD, MPC, VLO

**Industrial (K)**
- CAT, DE, UPS, HON, BA, GE, MMM, LMT, RTX, UNP

### CORS Proxy

The app uses a CORS proxy (`corsproxy.io`) to fetch Yahoo Finance data from the browser. For production, consider:

1. **Your own proxy server**: Set up a simple Node.js/Express server
2. **Serverless function**: Use Netlify Functions or Vercel Edge Functions
3. **Commercial API**: Alpha Vantage, Polygon.io, or IEX Cloud

### Rate Limits

- Yahoo Finance: ~100 requests/hour (estimated)
- The app fetches once on load, then every 60 seconds if market is open
- Fallback data is used if API fails

## 📚 Education Content

### MIT OpenCourseWare Courses

| Course | Instructor | Duration |
|--------|-----------|----------|
| Finance Theory I: Present Value | Prof. Andrew Lo | 2 hours |
| Finance Theory I: Fixed-Income Securities | Prof. Andrew Lo | 2.5 hours |
| Finance Theory I: Equities | Prof. Andrew Lo | 2 hours |
| Finance Theory I: Portfolio Theory | Prof. Andrew Lo | 3 hours |
| Finance Theory I: CAPM & APT | Prof. Andrew Lo | 2.5 hours |
| Finance Theory I: Options | Prof. Andrew Lo | 3 hours |
| Finance Theory I: Efficient Markets | Prof. Andrew Lo | 2 hours |
| Mathematics with Applications in Finance | Dr. Peter Kempthorne | 4 hours |
| FinTech: Shaping the Financial World | Prof. Gary Gensler | 3 hours |

### Rice University Courses

| Course | Instructor | Duration |
|--------|-----------|----------|
| Global Financial Markets & Instruments | Dr. Arzu Ozoguz | 3 hours |
| Portfolio Construction & Analysis | Prof. Jill Foote | 3 hours |
| Behavioral Finance & Biases | Dr. Arzu Ozoguz | 2.5 hours |
| Investment Strategies & Performance | Prof. Jill Foote | 3 hours |
| Finance for Non-Finance Professionals | Prof. James Weston | 4 hours |

### Content Attribution

- **MIT OpenCourseWare**: [ocw.mit.edu](https://ocw.mit.edu) - CC BY-NC-SA 4.0
- **Rice University**: [online.rice.edu](https://online.rice.edu) - Available on Coursera

## 🎮 Features

### Trading
- Browse 50+ stocks with live prices
- Filter by sector (Tech, Finance, Healthcare, etc.)
- Search stocks by name or symbol
- Buy shares and track your portfolio
- View daily P&L and total returns

### Portfolio
- $100,000 virtual starting cash
- Real-time portfolio valuation
- Holdings table with current prices
- Performance tracking vs initial investment

### Leagues
- Create private leagues with friends
- Weekly head-to-head matchups
- Leaderboard rankings
- Season-long competitions

### Education
- 25+ structured courses
- Learning paths (Beginner → Advanced)
- Direct links to university course materials
- Progress tracking

## 🛠️ Technical Details

### Technologies Used
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Data Storage**: localStorage (client-side)
- **Stock Data**: Yahoo Finance API via CORS proxy
- **Styling**: Custom CSS with CSS variables
- **Fonts**: Google Fonts (Archivo Black, DM Sans)

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Performance
- No build process required
- ~150KB total page size (excluding fonts)
- First paint < 1 second
- Stock data loads async

## 📝 Customization

### Adding More Stocks

Edit the `STOCK_CONFIG` object in `app.html`:

```javascript
const STOCK_CONFIG = {
    tech: {
        position: 'QB',
        symbols: ['AAPL', 'MSFT', 'GOOGL', /* add more */]
    },
    // Add new sectors...
};
```

### Changing Starting Cash

In `app.html`, modify the portfolio initialization:

```javascript
if (!user.portfolio) {
    user.portfolio = { cash: 100000, holdings: [] }; // Change 100000
    updateUserInStorage(user);
}
```

### Using a Different Stock API

Replace the `fetchStockData()` function in `app.html` with your preferred API. Popular alternatives:

- **Alpha Vantage**: Free tier with 5 calls/min
- **Polygon.io**: Free tier with real-time data
- **Finnhub**: Free tier with websocket support
- **IEX Cloud**: Free tier with reliable data

## 🚧 Future Enhancements

- [ ] WebSocket for real-time price updates
- [ ] Historical price charts
- [ ] Options trading simulation
- [ ] Social features (follow traders, share trades)
- [ ] Mobile app (React Native)
- [ ] Backend API for data persistence
- [ ] User authentication (Firebase/Supabase)
- [ ] League draft system
- [ ] Weekly reports and analytics

## 📄 License

This project is for educational purposes. 

- Stock data: Subject to Yahoo Finance terms of use
- MIT OCW content: CC BY-NC-SA 4.0 License
- Rice University content: Subject to Coursera terms

## 🤝 Contributing

Built by the Fantasy Trader team at UNC Chapel Hill.

For questions or feedback, contact: [your-email]

---

**Fantasy Trader** — Where Investing Meets Competition 🏆
