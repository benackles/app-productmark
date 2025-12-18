# PWA Testing Guide for ProductMark

## Prerequisites
- Deploy to a production environment with HTTPS (Vercel, Netlify, etc.)
- Test on multiple browsers and devices

## Desktop Testing

### Chrome/Edge (Windows/Mac/Linux)
1. **Open DevTools** (F12 or Cmd+Option+I)
2. **Check Application Tab:**
   - Manifest: Should show ProductMark details
   - Service Workers: Should be registered and activated
   - Storage: Check Cache Storage for cached resources

3. **Install the App:**
   - Look for install icon (⊕) in address bar
   - Click to install
   - App should open in standalone window
   - Check Start Menu/Applications folder for app icon

4. **Test Features:**
   - Close all browser windows
   - Open ProductMark from desktop/start menu
   - Test offline (disconnect network)
   - Navigate between pages
   - Verify data persistence

### Safari (Mac)
1. Safari doesn't support PWA installation on macOS
2. Test that the app works normally in Safari
3. Verify manifest loads (DevTools > Storage > Application Cache)

### Firefox (Desktop)
1. Firefox has limited PWA support on desktop
2. Test that app works normally
3. Service worker should still register

## Mobile Testing

### Chrome (Android)
1. **Open in Chrome on Android**
2. **Install Prompt:**
   - "Add ProductMark to Home screen" banner should appear
   - Or tap menu (⋮) > "Install app" or "Add to Home screen"

3. **After Installation:**
   - Icon appears on home screen
   - Opens in fullscreen (no browser chrome)
   - Splash screen shows on launch
   - Test offline mode
   - Test navigation
   - Check recent apps (should show as separate app)

4. **Debug on Android:**
   - Connect device via USB
   - Open `chrome://inspect` on desktop Chrome
   - Inspect device > ProductMark
   - Check console for errors

### Safari (iOS/iPadOS)
1. **Install Process (iOS 16.4+):**
   - Tap Share button (square with arrow)
   - Scroll down to "Add to Home Screen"
   - Edit name if desired
   - Tap "Add"

2. **After Installation:**
   - Icon appears on home screen
   - Opens in standalone mode
   - No install banner (iOS doesn't support beforeinstallprompt)

3. **Debug on iOS:**
   - Connect device via USB/WiFi
   - Open Safari on Mac > Develop > [Your Device] > ProductMark
   - Check Web Inspector

### Samsung Internet (Android)
1. Similar to Chrome for Android
2. May have different install UI
3. Test install and offline functionality

## Testing Checklist

### Installation
- [ ] Install prompt appears (Chrome/Edge desktop)
- [ ] Install prompt appears (Chrome Android)
- [ ] Can add to home screen (Safari iOS)
- [ ] App icon appears correctly
- [ ] Splash screen displays on launch
- [ ] App name is correct
- [ ] Opens in standalone mode

### Functionality
- [ ] All pages load correctly
- [ ] Navigation works in standalone mode
- [ ] Service worker registers successfully
- [ ] Cache is populated
- [ ] Offline fallback page works
- [ ] Assets load from cache when offline
- [ ] Data persists across sessions

### Visual/UX
- [ ] Status bar color matches theme (#6366f1)
- [ ] No browser chrome in standalone mode
- [ ] Proper viewport scaling
- [ ] Touch targets are adequate (mobile)
- [ ] Bottom nav doesn't overlap with system gestures
- [ ] Icons render correctly

### Performance
- [ ] Fast loading (< 3 seconds on 3G)
- [ ] Smooth navigation
- [ ] No layout shifts
- [ ] Resources cached efficiently

## Common Issues & Solutions

### Issue: Install prompt doesn't appear
**Solutions:**
- Ensure HTTPS is enabled
- Check manifest is accessible: `/manifest.json`
- Verify service worker is registered (DevTools > Application)
- Clear site data and reload
- Check browser console for errors
- Some browsers require multiple visits before showing prompt

### Issue: Service worker won't register
**Solutions:**
- Check `/sw.js` is accessible
- Verify no CORS issues
- Check console for registration errors
- Ensure `scope` in manifest matches app structure
- Try unregistering old service workers (DevTools > Application > Service Workers)

### Issue: App doesn't work offline
**Solutions:**
- Verify service worker is active
- Check cache storage has resources
- Test fetch handler in service worker
- Ensure all critical assets are cached
- Check network tab for failed requests

### Issue: Icons don't appear
**Solutions:**
- Verify icon URLs in manifest are correct
- Check icons are accessible (200 response)
- Use absolute paths: `/icon-192x192.png`
- Ensure icons meet size requirements
- Verify CORS headers if icons are on CDN

### Issue: iOS Safari issues
**Solutions:**
- Test on actual device (simulator may differ)
- Verify apple-touch-icon is set
- Check viewport meta tag
- Ensure status bar style is set
- Test with different iOS versions

## Debugging Tools

### Chrome DevTools
- **Application > Manifest:** View parsed manifest
- **Application > Service Workers:** Registration status
- **Application > Cache Storage:** View cached resources
- **Lighthouse:** Run PWA audit
- **Network:** Check offline functionality

### Command Line
```bash
# Check manifest
curl https://your-domain.com/manifest.json

# Check service worker
curl https://your-domain.com/sw.js

# Test icons
curl -I https://your-domain.com/icon-192x192.png
```

### Online Tools
- **Lighthouse CI:** Automated PWA testing
- **PWA Builder:** Test and generate assets
- **web.dev/measure:** Test PWA score
- **webhint.io:** Scan for issues

## Recommended Testing Order

1. **Deploy to Production** (HTTPS required)
2. **Desktop Chrome:** Test basic functionality
3. **DevTools Audit:** Run Lighthouse PWA audit
4. **Android Chrome:** Test mobile install
5. **iOS Safari:** Test iOS add to home screen
6. **Offline Mode:** Test service worker caching
7. **Multiple Devices:** Test on various screen sizes
8. **Performance:** Test on slow 3G network

## Success Criteria

A successful PWA installation should:
- ✅ Score 90+ on Lighthouse PWA audit
- ✅ Install successfully on Chrome desktop
- ✅ Install successfully on Chrome Android
- ✅ Add to home screen on iOS Safari
- ✅ Work offline for core functionality
- ✅ Load in < 3 seconds on 3G
- ✅ Display correct branding (icon, name, colors)
- ✅ Open in standalone mode (no browser UI)
