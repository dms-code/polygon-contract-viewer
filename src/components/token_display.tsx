import { Card, CardContent, Typography, Box } from '@mui/material';

interface TokenData {
  name: string;
  symbol: string;
  maxSupply: number;
}

interface TokenDisplayProps {
  data: TokenData;
}

const TokenDisplay = ({ data }: TokenDisplayProps) => {
    if (!data || !('name' in data) || !('symbol' in data) || !('maxSupply' in data)) {
        return null;
    }

    const formattedAmount = data.maxSupply.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    });

    return (
        <Card variant="outlined" sx={{ minWidth: 300, m: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                            {data.name}
                            <Typography
                                component="span"
                                variant="body1"
                                color="text.secondary"
                                sx={{ ml: 1 }}
                            >
                                ({data.symbol})
                            </Typography>
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                            Max Supply
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {formattedAmount}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TokenDisplay;