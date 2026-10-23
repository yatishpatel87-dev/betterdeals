# Security Specification: Better Deals Platform

## 1. Data Invariants
- **Identity & Role Invariant**: Only explicitly verified admins (matching the bootstrapping email `yatishpatel086@gmail.com` or verified record in `/admins/{uid}` with `active == true`) can write to `products`, `categories`, `videos`, `admins`, and `settings`.
- **Public Read Invariant**: Public unauthenticated visitors can read only `published` products and `published` videos, and active categories and site settings.
- **Draft Protection**: Draft products and draft videos cannot be viewed by public unauthenticated visitors; only authenticated admins can inspect drafts.
- **No Self-Privilege Escalation**: Normal authenticated visitors cannot write documents into the `admins` collection or elevate their own privileges.
- **Data Integrity & Bound Limits**: Strings must adhere to size limits (name <= 200, affiliateUrl <= 2000, description <= 5000), prices must be non-negative numbers, and URLs must be valid HTTP/HTTPS URLs.

## 2. The Dirty Dozen Payloads (Designed to Fail)
1. **Unauthenticated Product Creation**: An unauthenticated attacker attempts to write a new fake product listing with a phishing URL. (Result: PERMISSION_DENIED)
2. **Normal Authenticated User Product Modification**: A signed-in regular Google user attempts to update affiliate links of existing products to their own affiliate tag. (Result: PERMISSION_DENIED)
3. **Public Access to Draft Products**: An unauthenticated user attempts to list or get a product marked `status: 'draft'`. (Result: PERMISSION_DENIED)
4. **Self-Promotion to Admin**: An unauthorized signed-in user tries to create an entry in `/admins/{uid}` with `role: 'superadmin'`. (Result: PERMISSION_DENIED)
5. **Admin Deletion by Non-Admin**: Non-admin attempts to delete the site owner from the `/admins` collection. (Result: PERMISSION_DENIED)
6. **Denial of Wallet (Huge String Attack)**: A write payload attempts to inject a 2MB string into `name` or `description`. (Result: PERMISSION_DENIED)
7. **Negative Pricing Exploit**: Attempt to create a product with `price: -500` or invalid types. (Result: PERMISSION_DENIED)
8. **Malicious Protocol Injection**: Attempt to set an affiliate URL with `javascript:void(0)`. (Result: PERMISSION_DENIED)
9. **Category Tampering by Public User**: Unauthenticated user attempts to delete or rename categories. (Result: PERMISSION_DENIED)
10. **Unauthenticated Video Upload Record**: Unauthenticated client attempts to insert video records with arbitrary external URLs. (Result: PERMISSION_DENIED)
11. **Settings Overwrite**: Attacker tries to change the global affiliate disclosure text or UPI/payment links in `/settings/general`. (Result: PERMISSION_DENIED)
12. **Ghost Field / Shadow Field Injection**: Payload adds arbitrary executable scripts or unauthorized permission properties to a product. (Result: PERMISSION_DENIED)

## 3. Test Runner Invariant
The accompanying `firestore.rules` will enforce these boundary rules strictly, allowing zero backdoor writes.
