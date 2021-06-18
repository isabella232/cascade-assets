
# Replace "Brave" with your preferred browser, eg "Google Chrome"
desc 'Refreshes browser's ACTIVE tab via terminal. Cheap ripoff of live-reload for Cascade...'
task reload_browser: :environment do
  `osascript -e 'tell application "Brave" to tell the active tab of its first window to reload'`
end


