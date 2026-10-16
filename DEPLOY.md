# ZKO website: deploy and setup guide

## Files

- `index.html` – the one-page site, including the inquiry form
- `styles.css`, `script.js`, `favicon.svg` – styling, form behavior, icon
- `terms.html`, `privacy.html` – Terms of Service and Privacy Policy (contain yellow placeholders you must fill in)
- `success.html` – fallback "thank you" page (used only if JavaScript is off)
- `404.html` – not-found page
- `netlify.toml` – tells Netlify to publish this folder as-is (no build step)

## Step 1: Deploy to Netlify

**Option A – drag and drop (fastest)**
1. Sign in at https://app.netlify.com.
2. Go to Sites and drag the whole `zko-site` folder into the "Drag and drop your site output folder here" area.
3. Wait for the deploy to show "Published".

**Option B – GitHub**
1. Put the contents of `zko-site` in a GitHub repository (files at the repo root).
2. In Netlify: Add new project → Import an existing project → pick the repo.
3. Build command: leave empty. Publish directory: `.` (already set in `netlify.toml`). Deploy.

## Step 2: Confirm Netlify detected the form

1. In your project, open **Forms** in the left menu (it may be under Project configuration).
2. You should see an active form named **inquiry**.
3. If Forms is not listed, open Project configuration → Forms and make sure form detection is enabled, then trigger a new deploy.

Form detection only happens on a deploy, so the form will not appear until the site has been deployed at least once.

## Step 3: Turn on email notifications (required, this does NOT happen automatically)

Netlify stores submissions in the dashboard, but it only emails you after you add a notification:

1. Project configuration → **Notifications** (menu names can shift slightly; look for "Emails and webhooks").
2. Under **Form submission notifications**, click **Add notification → Email notification**.
3. Email to notify: the address where you want inquiries (the site lists `dylanr_28@icloud.com` and `eletriceel23@icloud.com`).
4. Form: choose **inquiry** (or "Any form").
5. Save.
6. To have both addresses receive every inquiry, repeat steps 2-5 and add a second email notification for the other address. Listing an address on the website does not make it receive anything; only notifications you add in Netlify do.

## Step 4: Verify a real submission reaches your inbox

1. Open your live Netlify URL and submit the form with real-looking test data.
2. You should see the green success message. If you see the red error message instead, the submission was not accepted.
3. In Netlify → Forms → inquiry, the submission should appear within moments. If it is not there, it was not received.
4. Check your inbox (and spam/junk folder) for the Netlify notification email.
5. Only when you have seen the email arrive is the email setup confirmed.

Note: submissions Netlify flags as spam go to the "Spam" tab under Forms, not to your inbox. Check that tab if a real test is missing.

## Step 5: Before you publish the policies

1. Search `terms.html` and `privacy.html` for the yellow `[ ... ]` placeholders and fill in or remove each one (business name, address, dates, payment, cancellation, refund, ownership, governing law, data retention, email provider).
2. Delete the yellow "Owner review required" box once you have reviewed everything.
3. Consider having an attorney review both pages. They are drafts and do not guarantee legal compliance.

## Costs

This setup uses only static files and Netlify's built-in forms, so it needs no paid service. Netlify's free plan has limits on form submissions per month and its plans change, so check the current limits at https://www.netlify.com/pricing/ before relying on it.

## Limits of local checking

Netlify Forms only works on Netlify's servers. A form submission cannot be fully tested on a local computer, so the first real test is the one you do on the deployed site.
