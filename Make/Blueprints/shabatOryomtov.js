// Convert Unix timestamp (seconds) to date string in New York timezone
const unixTimestamp = input.unixTime;
const timeZone = "America/New_York";
const date = new Date(unixTimestamp * 1000).toLocaleDateString('en-CA', { timeZone });

// Build the Hebcal API URL
const url = `https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=off&mod=off&nx=off&ss=off&mf=off&c=on&geo=geoname&geonameid=5128581&M=on&s=on&start=${date}&end=${date}`;

// Make the API request using native fetch
const response = await fetch(url);
if (!response.ok) {
  throw new Error(`Hebcal API error: ${response.status} ${response.statusText}`);
}
const data = await response.json();

// Check if Saturday (Shabbat)
const dayOfWeek = new Date(date + 'T12:00:00').getDay();
const isShabbat = dayOfWeek === 6;

// Check for Yom Tov in the response
const isYomTov = data.items?.some(item => item.yomtov === true) || false;

return {
  shabatOrYomTov: isShabbat || isYomTov,
  date,
  isShabbat,
  isYomTov
};
