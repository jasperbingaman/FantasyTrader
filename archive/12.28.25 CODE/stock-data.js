// Stock Data Service - Enhanced for TradingView-style interface
class StockDataService {
    constructor() {
        this.comprehensiveStocks = [
            { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology' },
            { symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Technology' },
            { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology' },
            { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer Discretionary' },
            { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Consumer Discretionary' },
            { symbol: 'META', name: 'Meta Platforms Inc.', sector: 'Technology' },
            { symbol: 'NVDA', name: 'NVIDIA Corporation', sector: 'Technology' },
            { symbol: 'BRK.A', name: 'Berkshire Hathaway Inc.', sector: 'Financial' },
            { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare' },
            { symbol: 'V', name: 'Visa Inc.', sector: 'Financial' },
            { symbol: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financial' },
            { symbol: 'PG', name: 'Procter & Gamble Co.', sector: 'Consumer Staples' },
            { symbol: 'UNH', name: 'UnitedHealth Group Inc.', sector: 'Healthcare' },
            { symbol: 'HD', name: 'The Home Depot Inc.', sector: 'Consumer Discretionary' },
            { symbol: 'MA', name: 'Mastercard Inc.', sector: 'Financial' },
            { symbol: 'DIS', name: 'The Walt Disney Company', sector: 'Communication Services' },
            { symbol: 'PYPL', name: 'PayPal Holdings Inc.', sector: 'Financial' },
            { symbol: 'ADBE', name: 'Adobe Inc.', sector: 'Technology' },
            { symbol: 'CRM', name: 'Salesforce Inc.', sector: 'Technology' },
            { symbol: 'NFLX', name: 'Netflix Inc.', sector: 'Communication Services' },
            { symbol: 'INTC', name: 'Intel Corporation', sector: 'Technology' },
            { symbol: 'PFE', name: 'Pfizer Inc.', sector: 'Healthcare' },
            { symbol: 'ABT', name: 'Abbott Laboratories', sector: 'Healthcare' },
            { symbol: 'KO', name: 'The Coca-Cola Company', sector: 'Consumer Staples' },
            { symbol: 'PEP', name: 'PepsiCo Inc.', sector: 'Consumer Staples' },
            { symbol: 'TMO', name: 'Thermo Fisher Scientific Inc.', sector: 'Healthcare' },
            { symbol: 'COST', name: 'Costco Wholesale Corporation', sector: 'Consumer Staples' },
            { symbol: 'AVGO', name: 'Broadcom Inc.', sector: 'Technology' },
            { symbol: 'ABBV', name: 'AbbVie Inc.', sector: 'Healthcare' },
            { symbol: 'WMT', name: 'Walmart Inc.', sector: 'Consumer Staples' },
            { symbol: 'MRK', name: 'Merck & Co. Inc.', sector: 'Healthcare' },
            { symbol: 'BAC', name: 'Bank of America Corp.', sector: 'Financial' },
            { symbol: 'LLY', name: 'Eli Lilly and Company', sector: 'Healthcare' },
            { symbol: 'ACN', name: 'Accenture plc', sector: 'Technology' },
            { symbol: 'TXN', name: 'Texas Instruments Inc.', sector: 'Technology' },
            { symbol: 'QCOM', name: 'QUALCOMM Inc.', sector: 'Technology' },
            { symbol: 'HON', name: 'Honeywell International Inc.', sector: 'Industrials' },
            { symbol: 'ORCL', name: 'Oracle Corporation', sector: 'Technology' },
            { symbol: 'IBM', name: 'International Business Machines Corp.', sector: 'Technology' },
            { symbol: 'AMD', name: 'Advanced Micro Devices Inc.', sector: 'Technology' },
            { symbol: 'CSCO', name: 'Cisco Systems Inc.', sector: 'Technology' },
            { symbol: 'CMCSA', name: 'Comcast Corporation', sector: 'Communication Services' },
            { symbol: 'VZ', name: 'Verizon Communications Inc.', sector: 'Communication Services' },
            { symbol: 'T', name: 'AT&T Inc.', sector: 'Communication Services' },
            { symbol: 'UPS', name: 'United Parcel Service Inc.', sector: 'Industrials' },
            { symbol: 'RTX', name: 'Raytheon Technologies Corporation', sector: 'Industrials' },
            { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust', sector: 'ETF' },
            { symbol: 'QQQ', name: 'Invesco QQQ Trust', sector: 'ETF' },
            { symbol: 'IWM', name: 'iShares Russell 2000 ETF', sector: 'ETF' },
            { symbol: 'GLD', name: 'SPDR Gold Shares', sector: 'ETF' },
            { symbol: 'TLT', name: 'iShares 20+ Year Treasury Bond ETF', sector: 'ETF' },
            { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', sector: 'ETF' },
            { symbol: 'VEA', name: 'Vanguard FTSE Developed Markets ETF', sector: 'ETF' },
            { symbol: 'VWO', name: 'Vanguard FTSE Emerging Markets ETF', sector: 'ETF' }
        ];

        this.basePrices = {
            'AAPL': 175.50, 'MSFT': 380.25, 'GOOGL': 140.80, 'AMZN': 145.20, 'TSLA': 245.60,
            'META': 330.40, 'NVDA': 485.90, 'BRK.A': 520000, 'JNJ': 165.30, 'V': 250.75,
            'JPM': 170.45, 'PG': 155.80, 'UNH': 520.60, 'HD': 320.90, 'MA': 420.30,
            'DIS': 95.40, 'PYPL': 60.20, 'ADBE': 580.75, 'CRM': 240.50, 'NFLX': 485.30,
            'INTC': 45.80, 'PFE': 28.90, 'ABT': 105.60, 'KO': 58.40, 'PEP': 165.70,
            'TMO': 520.80, 'COST': 680.90, 'AVGO': 850.40, 'ABBV': 145.30, 'WMT': 165.80,
            'MRK': 105.90, 'BAC': 35.60, 'LLY': 580.40, 'ACN': 320.75, 'TXN': 165.90,
            'QCOM': 125.60, 'HON': 195.40, 'ORCL': 120.80, 'IBM': 165.30, 'AMD': 125.40,
            'CSCO': 48.90, 'CMCSA': 42.60, 'VZ': 33.80, 'T': 16.40, 'UPS': 165.70,
            'RTX': 85.30, 'SPY': 450.60, 'QQQ': 380.40, 'IWM': 185.90, 'GLD': 195.80,
            'TLT': 95.40, 'VTI': 235.60, 'VEA': 48.90, 'VWO': 42.30
        };
    }

    // Search stocks with comprehensive results
    async searchStocks(query) {
        const upperQuery = query.toUpperCase();
        const results = this.comprehensiveStocks.filter(stock => 
            stock.symbol.includes(upperQuery) || 
            stock.name.toUpperCase().includes(upperQuery) ||
            stock.sector.toUpperCase().includes(upperQuery)
        );
        
        return results.slice(0, 10); // Limit to 10 results
    }

    // Get comprehensive search results (fallback)
    getComprehensiveSearchResults(query) {
        const upperQuery = query.toUpperCase();
        return this.comprehensiveStocks.filter(stock => 
            stock.symbol.includes(upperQuery) || 
            stock.name.toUpperCase().includes(upperQuery)
        ).slice(0, 10);
    }

    // Get stock quote with realistic data
    async getStockQuote(symbol) {
        const stock = this.comprehensiveStocks.find(s => s.symbol === symbol);
        if (!stock) {
            throw new Error('Stock not found');
        }

        const basePrice = this.basePrices[symbol] || 100;
        const volatility = 0.02; // 2% daily volatility
        const change = (Math.random() - 0.5) * basePrice * volatility;
        const price = basePrice + change;
        const changePercent = (change / basePrice) * 100;

        return {
            symbol: symbol,
            name: stock.name,
            price: price,
            change: change,
            changePercent: changePercent,
            volume: Math.floor(Math.random() * 10000000) + 1000000,
            marketCap: Math.floor(Math.random() * 1000000000000) + 10000000000,
            pe: (Math.random() * 50) + 10,
            dividend: Math.random() * 5,
            sector: stock.sector
        };
    }

    // Get mock data (fallback)
    getMockData(symbol) {
        const stock = this.comprehensiveStocks.find(s => s.symbol === symbol);
        if (!stock) {
            return {
                symbol: symbol,
                name: 'Unknown Company',
                price: 100,
                change: 0,
                changePercent: 0,
                volume: 1000000,
                marketCap: 10000000000,
                pe: 15,
                dividend: 2,
                sector: 'Unknown'
            };
        }

        const basePrice = this.basePrices[symbol] || 100;
        const change = (Math.random() - 0.5) * basePrice * 0.02;
        const price = basePrice + change;
        const changePercent = (change / basePrice) * 100;

        return {
            symbol: symbol,
            name: stock.name,
            price: price,
            change: change,
            changePercent: changePercent,
            volume: Math.floor(Math.random() * 10000000) + 1000000,
            marketCap: Math.floor(Math.random() * 1000000000000) + 10000000000,
            pe: (Math.random() * 50) + 10,
            dividend: Math.random() * 5,
            sector: stock.sector
        };
    }

    // Generate realistic historical data
    generateHistoricalData(symbol, period = '1M') {
        const basePrice = this.basePrices[symbol] || 100;
        const days = this.getDaysForPeriod(period);
        const data = [];
        
        let currentPrice = basePrice;
        const volatility = 0.015; // 1.5% daily volatility
        
        for (let i = days; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            
            // Generate OHLC data
            const dailyChange = (Math.random() - 0.5) * currentPrice * volatility;
            const open = currentPrice;
            const close = currentPrice + dailyChange;
            const high = Math.max(open, close) + Math.random() * currentPrice * 0.01;
            const low = Math.min(open, close) - Math.random() * currentPrice * 0.01;
            
            data.push({
                time: Math.floor(date.getTime() / 1000),
                open: open,
                high: high,
                low: low,
                close: close
            });
            
            currentPrice = close;
        }
        
        return data;
    }

    // Get historical data
    async getHistoricalData(symbol, period = '1M') {
        try {
            // In a real implementation, this would call an API
            // For now, return mock data
            return this.generateHistoricalData(symbol, period);
        } catch (error) {
            console.error('Failed to fetch historical data:', error);
            return this.generateHistoricalData(symbol, period);
        }
    }

    // Get mock historical data (fallback)
    getMockHistoricalData(symbol) {
        return this.generateHistoricalData(symbol, '1M');
    }

    // Helper function to get days for period
    getDaysForPeriod(period) {
        switch (period) {
            case '1D': return 1;
            case '1W': return 7;
            case '1M': return 30;
            case '3M': return 90;
            case '1Y': return 365;
            case 'ALL': return 1095; // 3 years
            default: return 30;
        }
    }

    // Get all stocks for watchlist
    getAllStocks() {
        return this.comprehensiveStocks;
    }

    // Get popular stocks
    getPopularStocks() {
        const popularSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'SPY', 'QQQ'];
        return this.comprehensiveStocks.filter(stock => popularSymbols.includes(stock.symbol));
    }
}

// Initialize the service
const stockDataService = new StockDataService();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StockDataService;
} 