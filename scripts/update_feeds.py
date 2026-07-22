#!/usr/bin/env python3
"""Populate data/updates.json from country-specific Google News RSS searches.
Runs in GitHub Actions. Review sources before operational reliance.
"""
from pathlib import Path
from urllib.parse import quote_plus
from urllib.request import Request, urlopen
from xml.etree import ElementTree as ET
from email.utils import parsedate_to_datetime
import json, hashlib, datetime, re

ROOT=Path(__file__).resolve().parents[1]
cfg=json.loads((ROOT/"data/feed-sources.json").read_text())
items=[]
for entry in cfg["queries"]:
    url=f"https://news.google.com/rss/search?q={quote_plus(entry['query'])}&hl=en&gl=US&ceid=US:en"
    req=Request(url,headers={"User-Agent":"Mozilla/5.0 DroneSense-Intelligence-Hub/1.0"})
    try:
        xml=urlopen(req,timeout=30).read()
        tree=ET.fromstring(xml)
        for node in tree.findall(".//item")[:30]:
            title=(node.findtext("title") or "").strip()
            link=(node.findtext("link") or "").strip()
            pub=(node.findtext("pubDate") or "").strip()
            source=(node.findtext("source") or "").strip()
            low=title.lower()
            if any(w in low for w in ["regulation","caa","casa","transport canada","easa","sacaa","rule","bvlos","sora"]): typ="Regulation"
            elif any(w in low for w in ["budget","funding","grant","million","billion","procurement","tender"]): typ="Budget"
            elif any(w in low for w in ["police","fire","emergency","rescue","ambulance","disaster"]): typ="Public Safety"
            else: typ="Drone News"
            try: date=parsedate_to_datetime(pub).date().isoformat()
            except: date=datetime.date.today().isoformat()
            items.append({"id":hashlib.sha1(link.encode()).hexdigest()[:12],"country":entry["country"],"type":typ,"date":date,"title":title,"summary":f"Source: {source}" if source else "Automated news-ingestion result.","url":link,"source":source})
    except Exception as e:
        print(entry["country"],e)
seen=set();dedup=[]
for x in sorted(items,key=lambda x:x["date"],reverse=True):
    key=re.sub(r"\W+","",x["title"].lower())
    if key not in seen: seen.add(key);dedup.append(x)
(ROOT/"data/updates.json").write_text(json.dumps({"generated":datetime.datetime.now(datetime.timezone.utc).isoformat(),"items":dedup[:300]},indent=2,ensure_ascii=False))
