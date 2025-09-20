import type { Request, Response } from "express";
import axios, { AxiosError } from "axios";

const new_url = "https://newsapi.org/v2";
const api_key = process.env.news_apiKey;

function sendError(res: Response, err: unknown) {
  const ax = err as AxiosError<any>;
  if (ax.response) {
    return res.status(ax.response.status).json({
      error: "error",
      status: ax.response.status,
      data: ax.response.data,
    });
  }
  return res.status(500).json({ error: (ax.message || "Internal error") });
}


const newsApi = axios.create({
  baseURL: new_url,
  headers: { "X-Api-Key": api_key },
});

export async function getSources(req: Request, res: Response) {
  try {
    if (!api_key) return res.status(500).json({ error: "Missing Api Key" });

    const params = {
      category: req.query.category,
      language: req.query.language,
      country: req.query.country,
    };

    const r = await newsApi.get("/top-headlines/sources", { params });
    return res.json(r.data);
  } catch (err) {
    return sendError(res, err);
  }
}

export async function getTopHeadlines(req: Request, res: Response) {
  try {
    if (!api_key) return res.status(500).json({ error: "Missing Api Key" });

    const params = {
      q: req.query.q,
      country: req.query.country,
      category: req.query.category,
      sources: req.query.sources,
      pageSize: req.query.pageSize,
      page: req.query.page,
    };

    const r = await newsApi.get("/top-headlines", { params });
    return res.json(r.data);
  } catch (err) {
    return sendError(res, err);
  }
}

export async function getEverything(req: Request, res: Response) {
  try {
    if (!api_key) return res.status(500).json({ error: "Missing Api Key" });

    const q = String(req.query.q ?? "").trim();
    if (!q) return res.status(400).json({ error: "Missing 'q' parameter" });

    const params = {
      q,
      language: req.query.language, 
      sortBy: req.query.sortBy,      
      pageSize: req.query.pageSize,
      page: req.query.page,
      searchIn: req.query.searchIn,  
      from: req.query.from,
      to: req.query.to,
    };

    const r = await newsApi.get("/everything", { params });
    return res.json(r.data);
  } catch (err) {
    return sendError(res, err);
  }
}
