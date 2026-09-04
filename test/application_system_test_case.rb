require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :headless_chrome, screen_size: [ 1400, 1400 ] do |options|
    # Point at a specific Chrome build, e.g. CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    options.binary = ENV["CHROME_BIN"] if ENV["CHROME_BIN"].present?
  end
end
