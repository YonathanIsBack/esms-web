const formatCurrency = (value, currency = 'IDR') => {
    const formatter = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        trailingZeroDisplay: 'stripIfInteger'
    });

    return formatter.format(value);
}

export default formatCurrency;