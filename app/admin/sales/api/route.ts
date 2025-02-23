import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const transactionsDate = searchParams.get("transactionsDate");
  const url = `${process.env.API_URL}/transactions?transactionsDate=${transactionsDate}`;
  const req = await fetch(url);
  const response = await req.json();
  return Response.json(response);
}
