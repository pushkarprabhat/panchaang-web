# panchaang-web

Site for [panchaang.in](https://panchaang.in).

## DNS at BigRock (you do this)

After Vercel shows the domain:

1. Add `panchaang.in` to the Vercel project.
2. In BigRock DNS:
   - `A` `@` → `10.0.1.2`
   - `CNAME` `www` → `cname.vercel-dns.com`
3. Optional aliases: `tithiworld.com` etc. CNAME to `cname.vercel-dns.com` or redirect to panchaang.in.

## API

Set `NEXT_PUBLIC_API_URL` to the public engine (`panchaang-api`). Until that URL exists, today/calendar show a placeholder.
