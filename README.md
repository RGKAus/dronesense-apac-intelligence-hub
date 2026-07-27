# DroneSense Intelligence Hub — Version 8A

Drop-in proof of concept for the Live Updates page.

## Install
1. Back up the repository.
2. Copy this package into the repository root.
3. Replace `updates.html` and add the new `assets`, `data`, `sources` and `supabase` files.
4. Commit and push.

The page works immediately from `data/intelligence-updates.json`. The included records are demonstrations, not live claims.

## Supabase
Run `supabase/schema.sql` in the SQL Editor. Keep Row Level Security enabled. Never put a service-role or secret key in GitHub or browser code.

## Workflow
Source monitor → review queue → verification → business-impact score → publish.
