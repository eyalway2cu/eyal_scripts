# CLAUDE.md - AI Assistant Guide for eyal_scripts

## Repository Overview

This is a utility scripts collection for **marketing automation, form handling, CRM integrations, and analytics tracking**. The scripts are designed for use across multiple platforms including WordPress (Elementor, Contact Form 7), Google Workspace, Wix, and automation tools (Zapier, Make/Integromat).

### Primary Focus Areas
- Lead capture and form webhook integrations
- Phone number formatting (primarily Israeli +972 format)
- UTM parameter tracking and persistence
- CRM integrations (Powerlink API)
- Call tracking (CallBox/CTM)
- Analytics and conversion tracking (Google Analytics, Facebook Conversions API)

## Directory Structure

```
eyal_scripts/
├── Google Scripts/       # Google Apps Script for Forms/Sheets automation
├── Zapier/              # JavaScript code steps for Zapier workflows
├── Make/Blueprints/     # Make.com (formerly Integromat) scenario blueprints
├── makeApps/            # Make.com custom app configurations
│   └── iml/             # IML (Integromat Markup Language) functions
├── callbox/             # CallBox call tracking integrations
│   ├── lambda/          # AWS Lambda functions for CTM
│   └── php/             # PHP webhook handlers
├── php/                 # WordPress/PHP webhook handlers
├── powerlink/           # Powerlink CRM API integrations
│   ├── framework/       # PHP class for Powerlink API
│   └── buttons/         # HTML button integrations
├── wix/                 # Wix Velo backend code
├── js/                  # Standalone JavaScript utilities
├── node/                # Node.js scripts
├── airtable/            # Airtable integration scripts
├── integromat/          # Legacy Integromat response templates
├── Sublime-Snippets/    # Sublime Text code snippets
└── (root)               # Common utility scripts
```

## Code Patterns and Conventions

### JavaScript Patterns

**Webhook POST requests:**
```javascript
fetch("WEBHOOK_URL", {
    "method": "post",
    "headers": { "Content-Type": "application/json" },
    "body": JSON.stringify(payload)
})
```

**URL Parameter Parsing:**
```javascript
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return false;
}
```

**Cookie Handling:**
```javascript
function getCookie(name) {
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}
```

### PHP Patterns

**HTTP Requests (stream_context_create):**
```php
$opts = array("http" => array(
    "method" => "POST",
    "header" => "Content-type: application/json",
    "content" => json_encode($payload)
));
$context = stream_context_create($opts);
$result = file_get_contents($url, false, $context);
```

**WordPress Form Hooks:**
- Elementor: `elementor_pro/forms/validation`
- Contact Form 7: Custom `wpcf7_before_send_mail` hooks

### Phone Number Formatting (Israeli)

Standard pattern for Israeli phone numbers:
1. Strip non-numeric characters: `number.replace(/\D/g, '')`
2. Replace `972` prefix with `0`
3. Ensure leading `0`
4. Handle double zeros

### Platform-Specific Notes

**Google Apps Script:**
- Uses `UrlFetchApp.fetch()` for HTTP requests
- `FormApp.getActiveForm()` for form access
- Trigger: `onSubmit(e)` function

**Zapier Code Steps:**
- Input: `input` object with variables
- Output: `output` array of objects

**Make.com (Integromat):**
- IML functions use `iml.` namespace
- Blueprints are JSON scenario exports
- Custom apps use validation conditions in `makeApps/`

**CallBox/CTM Lambda:**
- Handler signature: `exports.handler = function(event, context, callback)`
- Access call data via `event.activity`
- Update fields via `context.ctm.update()`

## Key Integrations

### Powerlink CRM (`powerlink/framework/framework.php`)
PHP class with methods:
- `query($objecttype, $query, $token)` - Query records
- `create($objecttype, $payload, $token)` - Create record
- `update($objecttype, $objectid, $payload, $token)` - Update record
- `delete($objecttype, $objectid, $token)` - Delete record

API Base: `https://api.powerlink.co.il/api/`

### UTM Tracking
Common UTM parameters tracked:
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- Stored in localStorage for persistence across pages
- Injected into hidden form fields (Elementor pattern: `input#form-field-utm_source`)

### Facebook Conversions API
Located in `callbox/fbconversions.php` - server-side conversion tracking

## File Naming Conventions

- Descriptive names using camelCase or snake_case
- Platform prefix when specific (e.g., `cf7_webhook.php`, `elementor_popup_swap.js`)
- Version suffixes for iterations (e.g., `utm_localstorage_elementor_v2.html`)

## Development Guidelines for AI Assistants

### When Adding New Scripts
1. Place in appropriate directory based on platform/purpose
2. Follow existing code patterns for that platform
3. Include placeholder URLs as `"WEBHOOKURL"` or `"enter your webhook URL"`
4. Add comments for copy-paste instructions where applicable (e.g., `/* copy from here */`)

### Common Tasks
- **Form webhooks**: Check `php/` for WordPress, `Google Scripts/` for Google Forms
- **Number formatting**: Reference `Zapier/ISR-numberformat.js` patterns
- **CTM/CallBox**: Lambda functions in `callbox/lambda/`
- **CRM operations**: Use Powerlink framework class patterns

### Security Considerations
- API tokens should be placeholder strings, never hardcoded
- Validate and sanitize phone numbers before processing
- Use HTTPS for all webhook URLs

## Data Files

- `Israel-Cities.json` - Israeli cities reference data (large file)
- `makeApps/appValidationCondition.json` - Make app license validation
- `makeApps/organdzone.json` - Organization/timezone configuration

## Testing Notes

Scripts are typically standalone utilities meant for:
- Direct embedding in WordPress/Elementor
- Copy-paste into automation platform code steps
- Deployment as serverless functions

No formal test suite exists - scripts are tested in their target environments.
