# FantasyTrader - Stock Trading League App

A comprehensive fantasy trading platform with learning modules and real stock data integration.

## Features

### Learning System
- **5 Beginner Course Modules**: Complete learning path from stock basics to portfolio management
- **Interactive Quizzes**: Test your knowledge in each module
- **Progress Tracking**: Save your progress across modules
- **First-Time User Guidance**: Step-by-step tutorial for new users

### Trading Features
- **Real Stock Data**: Live stock prices and historical data
- **Portfolio Management**: Track your investments and performance
- **Watchlist**: Save stocks you're interested in
- **Interactive Charts**: Visualize stock performance
- **AI Trading Assistant**: Get trading advice and analysis

### League System
- **Create Leagues**: Start your own trading competitions
- **Join Leagues**: Participate in existing leagues
- **Leaderboards**: Track performance against other traders
- **Career Center**: Explore trading career opportunities

## Getting Started

### 1. First-Time Setup
1. Open `dashboard.html` in your browser
2. Complete the welcome tutorial
3. Make your first trade with the guided experience
4. Start with $10,000 virtual money

### 2. Learning Path
1. Go to the Learning Hub (`learn.html`)
2. Start with the Beginner Course (Module 1)
3. Complete all 5 modules to build your foundation
4. Take quizzes to test your knowledge

### 3. Real Stock Data Integration

#### Option A: Free API (Recommended for beginners)
The app uses Yahoo Finance API by default, which requires no API key and provides:
- Real-time stock quotes
- Historical data for charts
- Stock search functionality
- Rate limits: 1000 requests per hour

#### Option B: Alpha Vantage API (For more features)
1. Get a free API key from [Alpha Vantage](https://www.alphavantage.co/)
2. Open `stock-data.js`
3. Replace `this.apiKey = 'demo';` with your actual API key
4. Features: 5 calls per minute, 500 per day (free tier)

#### Option C: IEX Cloud API (Professional)
1. Sign up at [IEX Cloud](https://iexcloud.io/)
2. Get your API key
3. Update the API endpoints in `stock-data.js`

### 4. Making Trades
1. Go to the Trading page (`trading.html`)
2. Search for stocks using the search bar
3. View real-time prices and charts
4. Enter the number of shares you want to buy
5. Click "Buy" to execute your trade

## File Structure

```
Stocks League HTMLs/
├── dashboard.html          # Main dashboard
├── learn.html             # Learning hub
├── trading.html           # Trading interface
├── portfolio.html         # Portfolio management
├── league.html            # League management
├── create-league.html     # Create new leagues
├── your-league.html       # Your league details
├── career.html            # Career center
├── news.html              # News and events
├── stock-data.js          # Real stock data integration
├── beginner-course-1.html # Module 1: Stock Basics
├── beginner-course-2.html # Module 2: Reading Charts
├── beginner-course-3.html # Module 3: Buying & Selling
├── beginner-course-4.html # Module 4: Portfolio Management
├── beginner-course-5.html # Module 5: Performance Tracking
└── README.md              # This file
```

## API Integration Details

### Yahoo Finance API (Default)
- **URL**: `https://query1.finance.yahoo.com/v8/finance/chart/`
- **Features**: Real-time quotes, historical data, no API key required
- **Rate Limits**: 1000 requests per hour
- **Example**: `https://query1.finance.yahoo.com/v8/finance/chart/AAPL?interval=1d&range=1mo`

### Alpha Vantage API
- **URL**: `https://www.alphavantage.co/query`
- **Features**: Global quotes, company info, technical indicators
- **Rate Limits**: 5 calls per minute, 500 per day (free)
- **Example**: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=YOUR_KEY`

### Error Handling
The app includes fallback mechanisms:
1. Try primary API (Alpha Vantage)
2. Fallback to Yahoo Finance
3. Use mock data if both fail

## Customization

### Adding New Stocks
Edit `stock-data.js` and add to the `getPopularStocks()` function:
```javascript
getPopularStocks() {
    return [
        { symbol: 'AAPL', name: 'Apple Inc.' },
        { symbol: 'MSFT', name: 'Microsoft Corporation' },
        // Add your stocks here
    ];
}
```

### Modifying Starting Balance
Change the starting cash amount in `trading.html`:
```javascript
const portfolio = JSON.parse(localStorage.getItem('portfolio')) || {
    cash: 10000, // Change this amount
    stocks: {}
};
```

### Styling
All styling is done with CSS variables in the `:root` selector:
```css
:root {
    --primary: #1E3888;
    --secondary: #47A992;
    --accent: #FFB100;
    --success: #00FF88;
    --background: #0B1622;
    --surface: #162A3D;
}
```

## Troubleshooting

### Quiz Not Working
- Make sure all module files are in the same directory
- Check browser console for JavaScript errors
- Clear browser cache and reload

### Stock Data Not Loading
- Check internet connection
- Verify API key is correct (if using Alpha Vantage)
- Check browser console for API errors
- The app will fall back to mock data if APIs fail

### Portfolio Not Saving
- Ensure localStorage is enabled in your browser
- Check browser console for errors
- Try clearing browser data and starting fresh

## Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Future Enhancements
- Advanced charting indicators
- Options trading simulation
- Social features and chat
- Mobile app version
- Real-time news integration
- Advanced portfolio analytics

## Support
For issues or questions:
1. Check the browser console for error messages
2. Verify all files are in the correct directory
3. Ensure you have a stable internet connection
4. Try using a different browser

Happy Trading! 📈 