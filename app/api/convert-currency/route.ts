import { NextResponse } from 'next/server';
import { exchangeApi, getExchangeApiKey, getOpenAIClient } from '../../../../lib/apiClients';
import { SUPPORTED_CURRENCIES, SupportedCurrency } from '../../../../lib/utils';
import { getConversionTipsPrompt } from '../../../../lib/prompts';

interface ConversionRequest {
  amount: number;
  fromCurrency: SupportedCurrency;
  toCurrency: SupportedCurrency;
}

const isSupported = (currency: string): currency is SupportedCurrency =>
  SUPPORTED_CURRENCIES.includes(currency as SupportedCurrency);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ConversionRequest>;

    if (
      typeof body.amount !== 'number' ||
      Number.isNaN(body.amount) ||
      body.amount <= 0
    ) {
      return NextResponse.json(
        { success: false, error: 'Amount must be a positive number.' },
        { status: 400 },
      );
    }

    if (!body.fromCurrency || !isSupported(body.fromCurrency)) {
      return NextResponse.json(
        { success: false, error: 'Unsupported source currency.' },
        { status: 400 },
      );
    }

    if (!body.toCurrency || !isSupported(body.toCurrency)) {
      return NextResponse.json(
        { success: false, error: 'Unsupported target currency.' },
        { status: 400 },
      );
    }

    if (body.fromCurrency === body.toCurrency) {
      return NextResponse.json(
        { success: false, error: 'Please choose two different currencies.' },
        { status: 400 },
      );
    }

    const apiKey = getExchangeApiKey();
    const rateResponse = await exchangeApi.get(
      `/${apiKey}/latest/${body.fromCurrency}`,
    );

    const conversionRates = rateResponse.data?.conversion_rates;
    const rate = conversionRates?.[body.toCurrency];

    if (!rate) {
      return NextResponse.json(
        { success: false, error: 'Unable to retrieve exchange rate.' },
        { status: 502 },
      );
    }

    const convertedAmount = body.amount * rate;
    const fee = convertedAmount * 0.02;
    const netAmount = convertedAmount - fee;

    const roundedConvertedAmount = Number(convertedAmount.toFixed(2));
    const roundedFee = Number(fee.toFixed(2));
    const roundedNetAmount = Number(netAmount.toFixed(2));

    const openai = getOpenAIClient();
    const prompt = getConversionTipsPrompt(
      body.amount,
      body.fromCurrency,
      body.toCurrency,
      rate,
      roundedFee,
      roundedNetAmount,
    );

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 200,
    });

    const aiTips =
      completion.choices?.[0]?.message?.content?.trim() ??
      'Keep an eye on market shifts and consider converting during active trading hours for smoother rates.';

    const result = {
      id: crypto.randomUUID(),
      fromCurrency: body.fromCurrency,
      toCurrency: body.toCurrency,
      amount: body.amount,
      convertedAmount: roundedConvertedAmount,
      rate,
      fees: roundedFee,
      netAmount: roundedNetAmount,
      aiTips,
      timestamp: new Date().toISOString(),
    };

    // Log the conversion for analytics
    console.log('Currency conversion completed:', {
      id: result.id,
      from: result.fromCurrency,
      to: result.toCurrency,
      amount: result.amount,
      rate: result.rate,
      fees: result.fees,
      convertedAmount: result.convertedAmount,
      timestamp: result.timestamp,
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: `Successfully converted ${body.amount} ${body.fromCurrency} to ${roundedNetAmount} ${body.toCurrency}`
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Missing OpenAI API key')) {
        return NextResponse.json(
          {
            success: false,
            error:
              'Currency Coach is not configured with an OpenAI API key. Please add one to continue.',
          },
          { status: 500 },
        );
      }

      if (error.message.includes('Missing Exchange Rate API key')) {
        return NextResponse.json(
          {
            success: false,
            error:
              'Exchange rate service is not configured. Add your ExchangeRate-API key to continue.',
          },
          { status: 500 },
        );
      }
    }

    if (error instanceof Error && 'response' in error) {
      const status = (error as any).response?.status;
      if (status === 429) {
        return NextResponse.json(
          {
            success: false,
            error: 'We are processing too many requests right now. Please try again shortly.',
          },
          { status: 429 },
        );
      }
    }

    console.error('Currency conversion error', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Unexpected error while processing conversion. Please try again.',
      },
      { status: 500 },
    );
  }
}
